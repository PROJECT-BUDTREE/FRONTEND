"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./selfcheck_style.module.css";
import Header from "../components/Header";
import apiRequest from "../util/reissue";

const questions = [
  "일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지 못함",
  "기분이 가라앉거나, 우울하거나, 희망이 없음",
  "잠이 들거나 계속 잠을 자는 것이 어려움 또는 잠을 너무 많이 잠",
  "피곤하다고 느끼거나 기운이 거의 없음",
  "입맛이 없거나 과식을 함",
  "자신을 부정적으로 봄 혹은 자신이 실패자라고 느끼거나 자신 또는 가족을 실망시킴",
  "신문을 읽거나 텔레비전 보는 것과 같은 일에 집중하는 것이 어려움",
  "움직임이나 말이 평소보다 눈에 띄게 느려지거나 과하게 빨라짐",
  "자신이 죽는 것이 더 낫다고 생각하거나 어떤 식으로든 자신을 해칠 것이라고 생각함",
];

const options = [
  "전혀 방해 받지 않았다",
  "며칠 동안 방해 받았다",
  "7일 이상 방해 받았다",
  "거의 매일 방해 받았다",
];

export default function Page() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  

  const handleSelect = (value: number) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (answers[current] === -1) return;
    setIsLoading(true);
    
    // request body 생성
    const requestBody: { [key: string]: number } = {};
    answers.forEach((score, index) => {
      requestBody[`part${index + 1}`] = score;
    });

    try {
      const response = await apiRequest.post("/survey/save", requestBody);

      const data = response.data as {
        status: number
        message: { surveyId: number };
      };

      const surveyId = data.message.surveyId;
      
      // 결과 저장
      const tempResults = questions.map((question, index) => ({ question, score: answers[index] }));
      const resultsByOneIndex: Record<number, { question: string; score: number }> = {};
      tempResults.forEach((item, index) => {
        resultsByOneIndex[index + 1] = item;
      });      
      const totalScore = Object.values(resultsByOneIndex).reduce((sum, r) => sum + r.score, 0);
      
      sessionStorage.setItem("selfcheckResults", JSON.stringify(resultsByOneIndex));

      router.push(`/selfcheck/result?score=${totalScore}&surveyId=${surveyId}`);
    } catch (error) {
      console.error("자가진단 제출 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <Header title="자가진단" showBack />

      <section className={styles.progressSection}>
        <span className={styles.progressText}>{current + 1}/{questions.length}</span>
        <div className={styles.progressBarWrapper}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className={styles.progressText}>{Math.round(((current + 1) / questions.length) * 100)}%</span>
      </section>

      <section className={styles.questionBox}>
        <p className={styles.questionText}>
          Q. 지난 2주일 동안 {questions[current]}
        </p>
      </section>

      <section className={styles.optionsBox}>
        <ul className={styles.options}>
          {options.map((opt, idx) => (
            <li key={idx}>
              <label>
                <input
                  type="radio"
                  name={`q${current}`}
                  value={idx}
                  checked={answers[current] === idx}
                  onChange={() => handleSelect(idx)}
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.buttonSection}>
        <button
          className={styles.prevButton}
          onClick={handlePrev}
          disabled={current === 0}
        >
          ← 이전
        </button>
        {current === questions.length - 1 ? (
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={answers[current] === -1 || isLoading}
          >
            {isLoading ? "제출 중..." : "제출"}
          </button>
        ) : (
          <button
            className={styles.nextButton}
            onClick={() => answers[current] !== -1 && setCurrent((prev) => prev + 1)}
            disabled={answers[current] === -1}
          >
            다음 →
          </button>
        )}
      </section>
    </main>
  );
}