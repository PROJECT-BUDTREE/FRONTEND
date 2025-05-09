"use client";

import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import styles from "./tree.module.css"; // CSS 모듈 추가
import { useState, useEffect } from "react";
import apiRequest from "../util/reissue";

export default function Page() {
  const emotionMap: Record<string, string> = {
    EXCELLENT: "1",
    GOOD: "2",
    SOSO: "3",
    BAD: "4",
    TERRIBLE: "5",
  };

  // const [diaries, setDiaries] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const searchParams = useSearchParams();
  const selectedEmoji = searchParams.get("emoji");

  useEffect(() => {
    async function fetchEmotions() {
      try {
        const res = await apiRequest.get("/post/find-emotion");
        console.log("감정 API 응답:", res.data);
        const data = (
          res.data as { message: { postId: number; emotion: string }[] }
        ).message;
        setDiaries(data);
      } catch (error) {
        console.error("감정 이모지 불러오기 실패:", error);
      }
    }

    fetchEmotions();
  }, []);

  const [selectedDiary, setSelectedDiary] = useState<null | {
    createdDate: string;
    content: string;
    emotion: string;
  }>(null);

  return (
    <div className={styles.container}>
      <Header title="하루나무" showBack />
      <img src="/treeimg.png" alt="tree" className={styles.treeImage} />
      {/* {dummyEmojis.map((emoji, index) => (
        <img
          key={index}
          src={`/${emoji}.png`}
          alt={`emotion-${index}`}
          className={`${styles.emotionIcon} ${styles["emotion" + (index + 1)]}`}
          onClick={() => {
            const matched = dummyDiaries.find((d) => d.emotion === emoji);
            if (matched) setSelectedDiary(matched);
          }}
        />
      ))} */}
      {Array.isArray(diaries) &&
        diaries.map((diary, index) => {
          const emotionId = emotionMap[diary.emotion] ?? "1";
          return (
            <img
              key={diary.postId}
              src={`/${emotionId}.png`}
              alt={`emotion-${emotionId}`}
              className={`${styles.emotionIcon} ${
                styles[`emotion${index + 1}`]
              }`}
              onClick={async () => {
                try {
                  const res = await apiRequest.get(
                    `/post/find-post/${diary.postId}`
                  );
                  const data = (
                    res.data as {
                      message: {
                        createdDate: string;
                        content: string;
                        emotion: string;
                      };
                    }
                  ).message;
                  setSelectedDiary(data);
                } catch (e) {
                  console.error("일기 조회 실패", e);
                }
              }}
            />
          );
        })}

      <div className={styles.buddyContainer}>
        <div className={styles.buddyImageWrapper}>
          <img
            src="/bud.png"
            alt="buddy"
            className={styles.buddyImage}
            onClick={() => (window.location.href = "/diary")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={styles.buddySpeechBubble}>
          <p>
            오늘의 이야기를 작성하여 <br />
            나무를 꾸며보아요! <br />
            일기를 작성하고 싶다면 <br />
            저를 눌러주세요 (•ᴗ•)
          </p>
        </div>
      </div>

      {selectedDiary && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              {(() => {
                console.log("선택된 일기:", selectedDiary);
                return null;
              })()}
              <span>
                {new Date(selectedDiary.createdDate).toLocaleDateString(
                  "ko-KR",
                  {
                    // year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  }
                )}
              </span>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedDiary(null)}
              >
                ✕
              </button>
            </div>
            <img
              src={`/${emotionMap[selectedDiary.emotion] ?? "1"}.png`}
              alt={`emotion-${selectedDiary.emotion}`}
              className={styles.modalEmoji}
            />
            <div className={styles.modalScrollArea}>
              <p>{selectedDiary.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
