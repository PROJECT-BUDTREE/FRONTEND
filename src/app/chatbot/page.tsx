"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import apiRequest from "../util/reissue";
import styles from "./chatbot_style.module.css";

type Message = { role: "MEMBER" | "BUDDY"; content: string };
type SurveyResult = { question: string; score: number };

export default function ChatPage() {
  const router = useRouter();
  const handleBackToHome = () => router.push("/mainPage");

//  const [값, 값을바꿔줄함수] = useState<타입>(초기값);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [results, setResults] = useState<SurveyResult[]>([]);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [selectedSelection, setSelectedSelection] = useState<SurveyResult | null>(null);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [surveyId, setSurveyId] = useState<string | null>(null);

  const [roomId, setRoomId] = useState<number | null>(null);
  const [nickname, setNickname] = useState<string>("");

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);

  const scoreLabels = [
    "전혀 방해 받지 않았다",
    "며칠 동안 방해 받았다",
    "7일 이상 방해 받았다",
    "거의 매일 방해 받았다",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedName = localStorage.getItem("userName");
    if (storedName) setNickname(storedName);

    const params = new URLSearchParams(window.location.search);
    setSurveyId(params.get("surveyId"));

    const stored = sessionStorage.getItem("selfcheckResults");
    if (stored) {
      try {
        const obj = JSON.parse(stored) as Record<string, SurveyResult>;
        const arr = Object.keys(obj)
          .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
          .map((key) => obj[key]);
        setResults(arr);
      } catch (error) {
        console.error("자가진단 결과 파싱 오류:", error);
      }
    }
  }, []);

  // 채팅방 생성 통신 로직 
  const createChatRoom = async (): Promise<number> => {

    const response = await apiRequest.post("/chatroom/create");

    const data = response.data as {
      status : number, 
      message : { 
        roomId : number
      };
    };

    const roomId  = data.message.roomId;
    setRoomId(roomId);
    return roomId;

  };

  // 일반 요청을 보낼 때 통신 로직
  const sendMessageToBot = async (query: string): Promise<string> => {

    const id = roomId ?? (await createChatRoom()); 
    const response = await apiRequest.post(`/chatroom/chat/${id}`, { query });

    const data = response.data as {
      status : number,
      message : {
        answer : string
      };
    };

    return data.message.answer;

  };

  // 자가 진단 항목(part)과 선택안(choose) 기반 요청 통신 로직
  const sendSurveyToBot = async (part: number, choose: number): Promise<string> => {
    
    const id = roomId ?? (await createChatRoom());
    const response = await apiRequest.post(`/chatroom/chat/survey/${id}`, { part, choose });

    const data = response.data as {
      status : number,
      message : {
        answer : string
      };
    };

    return data.message.answer;
    
  };

  const handleSend = async () => {
    if (isLoading || !input.trim()) return;

    const userMsg: Message = { role: "MEMBER", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const answer = await sendMessageToBot(input);
      setMessages((prev) => [...prev, { role: "BUDDY", content: answer }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "BUDDY", content: "서버 연결에 실패했습니다." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedSelection) return;

    const { question, score } = selectedSelection;
    const part = results.findIndex((r) => r.question === question) + 1;
    const choose = score + 1;

    setMessages((prev) => [
      ...prev,
      { role: "MEMBER", content: `${question}에서 ${scoreLabels[score]}를 선택했어.` },
    ]);
    setSelectedSelection(null);
    setIsLoading(true);

    sendSurveyToBot(part, choose)
      .then((answer) => {
        setMessages((prev) => [...prev, { role: "BUDDY", content: answer }]);
      })
      .catch((err) => {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          { role: "BUDDY", content: "서버 연결에 실패했습니다." },
        ]);
      })
      .finally(() => setIsLoading(false));
  }, [selectedSelection]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getNicknameSuffix = (name: string): string => {
    if (!name) return "";
    const last = name[name.length - 1];
    const code = last.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) return "아!";
    return code % 28 === 0 ? "야!" : "아!";
  };

  return (
    <main className={styles.container}>
      <Header
        title="BUDDY"
        showBack
        showExitButton
        onBack={handleBackToHome}
        onExit={() => router.push("/chatbot/endModal")}
      />

      <div className={styles.dateDivider}>
        {new Date().toLocaleDateString("ko-KR", {
          month: "long",
          day: "numeric",
          weekday: "long",
        })}
      </div>

      <div className={styles.botMessageBox}>
        <div className={styles.Profile}>
          <img src="/chat.png" alt="buddy" />
        </div>
        <div className={styles.botMessageText}>
          <p className={styles.botMessageName}>버디</p>
          <p className={styles.botMessage}>
            안녕, {nickname}{getNicknameSuffix(nickname)} <br />
            {surveyId
              ? "아래는 자가진단 검사 항목별 점수를 정리한 거야. 나와 이야기 하고 싶은 항목을 선택해봐! 또, 항목들의 내용을 알고 싶다면 + 버튼을 눌러봐!"
              : "편안하게 대화를 시작해봐! 요즘 고민이 있거나 힘든 게 있으면 이야기해줘."}
          </p>
        </div>
      </div>

      {surveyId && (
        <div className={styles.scoreButtons}>
          {[0, 1, 2, 3].map((score) => {
            const matched = results
              .map((r, idx) => (r.score === score ? `Q${idx + 1}` : null))
              .filter(Boolean)
              .join(", ");
            return (
              <button
                key={score}
                className={styles.scoreButton}
                onClick={() => setSelectedScore(score)}
              >
                <strong>{scoreLabels[score]}</strong>
                {matched && <><br />{matched}</>}
              </button>
            );
          })}
        </div>
      )}

      {surveyId && selectedScore !== null && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (questionRef.current && !questionRef.current.contains(e.target as Node)) {
              setSelectedScore(null);
            }
          }}
        >
          <div ref={questionRef} className={styles.questionList}>
            {results
              .filter((q) => q.score === selectedScore)
              .map((q, i) => (
                <p
                  key={i}
                  className={styles.questionItem}
                  onClick={() => setSelectedSelection(q)}
                >
                  Q{i + 1}. {q.question}
                </p>
              ))}
          </div>
        </div>
      )}

      {surveyId && showAllQuestions && (
        <div className={styles.overlay} onClick={() => setShowAllQuestions(false)}>
          <div className={styles.questionList} onClick={(e) => e.stopPropagation()}>
            {results.map((q, i) => (
              <p
                key={i}
                className={styles.questionItem}
                onClick={() => setSelectedSelection(q)}
              >
                Q{i + 1}. {q.question}
              </p>
            ))}
          </div>
        </div>
      )}

      <section className={styles.chatWindow}>
        {messages.map((msg, i) =>
          msg.role === "MEMBER" ? (
            <div key={i} className={styles.userMessage}>
              {msg.content}
            </div>
          ) : (
            <div key={i} className={styles.botMessageBox}>
              <div className={styles.Profile}>
                <img src="/chat.png" alt="buddy" />
              </div>
              <div className={styles.botMessageText}>
                <p className={styles.botMessageName}>버디</p>
                <p className={styles.botMessage}>{msg.content}</p>
              </div>
            </div>
          )
        )}
        {isLoading && (
          <div className={styles.botMessageBox}>
            <div className={styles.Profile}>
              <img src="/chat.png" alt="buddy" />
            </div>
            <div className={styles.botMessageText}>
              <p className={styles.botMessageName}>버디</p>
              <p className={styles.botLoading}>...</p>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </section>

      <section className={styles.inputSection}>
        {surveyId && (
          <button
            className={`${styles.profileBtn} ${showAllQuestions ? styles.rotated : ""}`}
            onClick={() => setShowAllQuestions((prev) => !prev)}
          >
            <span>+</span>
          </button>
        )}
        <input
          type="text"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="버디에게 이야기해보세요"
          onKeyUp={(e) => {
            if (e.key === "Enter" && !e.repeat) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button className={styles.sendBtn} onClick={handleSend}>
          ⬆
        </button>
      </section>
    </main>
  );
}
