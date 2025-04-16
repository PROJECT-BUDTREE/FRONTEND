"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./selfcheck_style.module.css";
import Header from "../components/Header";

const questions = [
  "일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지 못함",
  "기분이 가라앉거나, 우울하거나, 희망이 없음",
  "잠이 들거나 계속 잠을 자는 것이 어려움. 또는 잠을 너무 많이 잠",
  "피곤하다고 느끼거나 기운이 거의 없음",
  "입맛이 없거나 과식을 함",
  "자신을 부정적으로 봄 – 혹은 자신이 실패자라고 느끼거나 자신 또는 가족을 실망시킴",
  "신문을 읽거나 텔레비전 보는 것과 같은 일에 집중하는 것이 어려움",
  "다른 사람들이 주목할 정도로 너무 느리게 움직이거나 말을 함 또는 반대로 평상시보다 많이 움직여서, 너무 안절부절 못하거나 들떠 있음",
  "자신이 죽는 것이 더 낫다고 생각하거나 어떤 식으로든 자신을 해칠 것이라고 생각함",
];

const options = [
  "전혀 방해받지 않았다",
  "며칠동안 방해받았다",
  "7일 이상 방해받았다",
  "거의 매일 방해받았다",
];

export default function Page() {
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(-1));
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const handleSelect = (value: number) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const totalScore = answers.reduce(
    (acc, val) => acc + (val >= 0 ? val : 0),
    0
  );

  return (
    <main className={styles.container}>
      <Header title="자가진단" showBack />

      <>
        <section className={styles.progressSection}>
          <span className={styles.progressText}>{current + 1}/9</span>
          <div className={styles.progressBarWrapper}>
            <div
              className={styles.progressBarFill}
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <span className={styles.progressText}>
            {Math.round(((current + 1) / questions.length) * 100)}%
          </span>
        </section>
        <section className={styles.questionBox}>
          <p className={styles.questionText}>
            Q. 지난 2주일 동안 {questions[current]} 얼마나 있었나요?
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
              onClick={() => {
                const results = questions.map((question, index) => ({
                  question,
                  score: answers[index],
                }));
                const totalScore = results.reduce((sum, r) => sum + r.score, 0);

                sessionStorage.setItem(
                  "selfcheckResults",
                  JSON.stringify(results)
                );
                sessionStorage.setItem(
                  "selfcheckTotalScore",
                  totalScore.toString()
                );

                router.push(`/selfcheck/result?score=${totalScore}`);
              }}
              disabled={answers[current] === -1}
            >
              제출
            </button>
          ) : (
            <button
              className={styles.nextButton}
              onClick={() => {
                setCurrent((prev) => prev + 1);
              }}
              disabled={answers[current] === -1}
            >
              다음 →
            </button>
          )}
        </section>
      </>
    </main>
  );
}
