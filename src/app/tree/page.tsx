"use client";

import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import styles from "./tree.module.css"; // CSS 모듈 추가
import { useState, useEffect } from "react";

export default function Page() {
  const dummyDiaries = [
    {
      postId: "1",
      emotion: "1",
      date: "3월 31일 월요일",
      content:
        "오늘 바람이 너무 강해 내가 먹고 있던 아이스크림이 떨어졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다. 친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.친구가 다시 사줘서 기분이 좋아졌다.",
    },
    {
      postId: "2",
      emotion: "2",
      date: "4월 2일 화요일",
      content: "오늘은 날씨가 흐렸지만 기분은 괜찮았다.",
    },
    {
      postId: "3",
      emotion: "3",
      date: "4월 3일 화요일",
      content: "오늘은 날씨가 좋았지만 기분은 걍 그럼.",
    },
    {
      postId: "4",
      emotion: "4",
      date: "4월 4일 화요일",
      content: "오늘은 날씨가 흐리고 기분도 흐림.",
    },
    {
      postId: "5",
      emotion: "5",
      date: "4월 5일 화요일",
      content: "오늘은 날씨가 흐렸고 기분은 안좋음.",
    },
    {
      postId: "6",
      emotion: "1",
      date: "4월 6일 화요일",
      content: "오늘은 날씨도 좋고 기분도 좋음.",
    },
  ];

  // const [diaries, setDiaries] = useState([]);
  const [diaries, setDiaries] = useState(dummyDiaries); // Using dummy data for style testing
  const searchParams = useSearchParams();
  const selectedEmoji = searchParams.get("emoji");

  // 예시: 클라이언트 컴포넌트에서 fetch API
  useEffect(() => {
    async function fetchLatestDiaries() {
      try {
        const res = await fetch("https://api.budtree.store/post/all");
        const data = await res.json(); // [ { postId, content, emotion, ... }, ... ]

        // 최신순 정렬 (백엔드가 이미 정렬해준다 해도 혹시 몰라서)
        // const sorted = data.sort(
        //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        // );

        // 최대 6개만 잘라서 상태에 저장
        // setDiaries(sorted.slice(0, 6));
      } catch (error) {
        console.error("일기 목록 가져오기 실패:", error);
      }
    }

    fetchLatestDiaries();
  }, []);

  const [selectedDiary, setSelectedDiary] = useState<null | {
    date: string;
    content: string;
    emotion: string;
  }>(null);

  const dummyEmojis = ["1", "2", "3", "4", "5", "6"];

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
      {diaries.map((diary, index) => {
        const emotionId = diary.emotion; // 예: '1', '2', ...
        const positionClass = `emotionIcon${index + 1}`;
        return (
          <img
            key={diary.postId}
            src={`/${emotionId}.png`}
            alt={`emotion-${emotionId}`}
            className={`${styles.emotionIcon} ${styles[`emotion${index + 1}`]}`}
            onClick={() => setSelectedDiary(diary)}
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
              <span>{selectedDiary.date}</span>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedDiary(null)}
              >
                ✕
              </button>
            </div>
            <img
              src={`/${selectedDiary.emotion}.png`}
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
