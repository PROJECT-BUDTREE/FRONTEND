"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import styles from "./diary.module.css";

export default function DiaryPage() {
  const [text, setText] = useState("");
  const router = useRouter();

  const isDisabled = text.trim().length === 0;

  function handleSubmit() {
    const encoded = encodeURIComponent(text.trim());
    router.push(`/emotion-select?content=${encoded}`);
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