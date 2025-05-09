// "use client";

// import React from "react";
// import { useRouter, useParams } from "next/navigation";
// import Image from "next/image";
// import Header from "../../components/Header";
// import styles from "./style.module.css";

// export default function ChatDetailPage() {
//   const router = useRouter();
//   const { date } = useParams();
//   const rawDate = Array.isArray(date) ? date[0] : date ?? "";
//   const [year, month, day] = rawDate.split("-");
//   const displayDate = `${Number(month)}월 ${Number(day)}일`;

//   const mockMessages = [
//     {
//       from: "bot",
//       text: "안녕? 내 이름은 버드야. 너의 이야기를 들려줄래?",
//       avatar: "/chat.png",
//     },
//     { from: "user", text: "오늘 일이 잘 안 풀려서 조금 우울했어..." },
//     {
//       from: "bot",
//       text: "어떤 일이 있었는지 조금 더 자세하게 말해줄래?",
//       avatar: "/chat.png",
//     },
//     {
//       from: "user",
//       text: "붕어빵을 사서 집으로 돌아가는 길에 다 떨어뜨려서 하나도 못 먹었어ㅠㅠ",
//     },
//     {
//       from: "bot",
//       text: "어떤 일이 있었는지 조금 더 자세하게 말해줄래?",
//       avatar: "/chat.png",
//     },
//     {
//       from: "user",
//       text: "붕어빵을 사서 집으로 돌아가는 길에 다 떨어뜨려서 하나도 못 먹었어ㅠㅠ",
//     },
//   ];

//   return (
//     <div className={styles.container}>
//       <Header
//         title="대화 내역"
//         showBack
//         onBack={() => router.push("/chat-history")}
//       />

//       <div className={styles.dateSection}>
//         <p className={styles.dateText}>{displayDate}</p>
//         <Image
//           src="/4.png"
//           alt="나쁨"
//           width={80}
//           height={80}
//           className={styles.moodIcon}
//         />
//         <p className={styles.moodText}>나쁨</p>
//       </div>

//       <div className={styles.messages}>
//         {mockMessages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={
//               msg.from === "user"
//                 ? styles.userMessageRow
//                 : styles.buddyMessageRow
//             }
//           >
//             {msg.avatar && (
//               <Image
//                 src={msg.avatar}
//                 alt="avatar"
//                 width={40}
//                 height={40}
//                 className={styles.avatar}
//               />
//             )}
//             <div
//               className={`${styles.messageBubble} ${
//                 msg.from === "user" ? styles.userBubble : styles.buddyBubble
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import React from "react";
// import { useRouter, useParams } from "next/navigation";
// import Image from "next/image";
// import Header from "../../components/Header";
// import styles from "./style.module.css";

// export default function ChatDetailPage() {
//   const router = useRouter();
//   const { date } = useParams();
//   const rawDate = Array.isArray(date) ? date[0] : date ?? "";
//   const [year, month, day] = rawDate.split("-");

//   // 날짜와 요일 계산
//   const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
//   const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
//   const weekday = weekdays[dateObj.getDay()];
//   const displayDate = `${Number(month)}월 ${Number(day)}일 ${weekday}요일`;

//   const mockMessages = [
//     { from: "bot", text: "안녕? 내 이름은 버드야. 너의 이야기를 들려줄래?", avatar: "/chat.png" },
//     { from: "user", text: "오늘 일이 잘 안 풀려서 조금 우울했어..." },
//     { from: "bot", text: "어떤 일이 있었는지 조금 더 자세하게 말해줄래?", avatar: "/chat.png" },
//     { from: "user", text: "붕어빵을 사서 집에 가다 떨어뜨려서 하나도 못 먹었어ㅠㅠ" },
//     { from: "bot", text: "그럴 때 정말 속상하지. 다른 이야기도 해줄래?", avatar: "/chat.png" },
//     { from: "user", text: "응, 오늘 친구랑 만나기로 했는데 약속이 취소됐어..." },
//     { from: "bot", text: "약속이 취소되면 허전하고 아쉽지?", avatar: "/chat.png" },
//     { from: "user", text: "맞아, 요즘 이런 일들이 계속돼서 기분이 안 좋았어." },
//     { from: "bot", text: "요즘 스트레스가 많아 보이네. 스트레스 해소법을 공유해볼까?", avatar: "/chat.png" },
//     { from: "user", text: "음... 음악을 듣거나 산책하는 게 도움이 돼." },
//     { from: "bot", text: "좋은 방법이야! 너에게 어울리는 활동을 찾아가는 것도 중요해.", avatar: "/chat.png" },
//     { from: "user", text: "고마워, 버드야. 이야기하면서 좀 나아진 것 같아." }
//   ];

//   return (
//     <div className={styles.container}>
//       <Header
//         title="BUDDY"
//         showBack
//         onBack={() => router.push("/chat-history")}
//       />

//       <div className={styles.messages}>
//         <div className={styles.dateRow}>
//           <span className={styles.dateText}>{displayDate}</span>
//         </div>

//         {mockMessages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={
//               msg.from === "user" ? styles.userMessageRow : styles.buddyMessageRow
//             }
//           >
//             {msg.from === "bot" && (
//               <Image
//                 src={msg.avatar!}
//                 alt="avatar"
//                 width={40}
//                 height={40}
//                 className={styles.avatar}
//               />
//             )}
//             <div
//               className={`${styles.messageBubble} ${
//                 msg.from === "user" ? styles.userBubble : styles.buddyBubble
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../components/Header";
import apiRequest from "../../util/reissue";
import styles from "./style.module.css";

interface ChatMessage {
  sender: "BUDDY" | "MEMBER";
  content: string;
  createdDate: string;
}

interface ChatResponse {
  status: number;
  message: ChatMessage[];
}

export default function ChatDetailPage() {
  const router = useRouter();
  const { roomId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const firstDate = messages[0]?.createdDate;
  const displayDate = firstDate
    ? (() => {
        const d = new Date(firstDate);
        const week = ["일", "월", "화", "수", "목", "금", "토"];
        return `${d.getMonth() + 1}월 ${d.getDate()}일 ${week[d.getDay()]}요일`;
      })()
    : "";

    useEffect(() => {
      if (!roomId) return;
    
      const fetchMessages = async () => {
        try {
          const response = await apiRequest.get<ChatResponse>(`/chatroom/${roomId}`);
          if (response.status === 200 && Array.isArray(response.data.message)) {
            setMessages(response.data.message);
            setError(null);
          } else {
            setMessages([]);
          }
        } catch (err: any) {
          const message = err?.response?.data?.message;
          setMessages([]);
          setError(message || "대화 조회 중 오류가 발생했습니다.");
          console.error("채팅 조회 실패:", err);
        }
      };
    
      fetchMessages();
    }, [roomId]);
  return (
    <div className={styles.container}>
      <Header
        title="BUDDY"
        showBack
        onBack={() => router.push("/chat-history")}
      />

      <div className={styles.messages}>
        <div className={styles.dateRow}>
          <span className={styles.dateText}>{displayDate}</span>
        </div>

        {error && <p className={styles.dateText}>{error}</p>}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.sender === "MEMBER"
                ? styles.userMessageRow
                : styles.buddyMessageRow
            }
          >
            {msg.sender === "BUDDY" && (
              <div className={styles.buddyProfile}>
                <Image
                  src="/chat.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
                <div className={styles.buddyName}>BUDDY</div>
              </div>
            )}
            <div
              className={`${styles.messageBubble} ${
                msg.sender === "MEMBER" ? styles.userBubble : styles.buddyBubble
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

