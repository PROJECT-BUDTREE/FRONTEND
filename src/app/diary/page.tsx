"use client"; // Next.js 13+ 클라이언트 컴포넌트에서 필요

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import styles from "./diary.module.css";

export default function DiaryPage() {
  const [text, setText] = useState("");
  const router = useRouter();

  // 텍스트가 공백이 아닌 경우만 버튼 활성화
  const isDisabled = text.trim().length === 0;

  function handleSubmit() {
    // 이동할 페이지(감정 선택 페이지) 경로 지정
    router.push("/emotion-select");
  }

  return (
    <main className={styles["diary-container"]}>
      <Header title="일기 작성" showBack />
      <div>
        <p className={styles["diary-date"]}>
          {new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </p>
      </div>

      <textarea
        className={styles["diary-textarea"]}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="오늘 있었던 일을 기록해보세요."
      />

      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className={styles["submit-button"]}
      >
        완료
      </button>
    </main>
  );
}