"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import Header from "src/app/components/Header";
import apiRequest from "../../../util/reissue";

const EMOTIONS = [
  { id: "EXCELLENT", label: "완전 좋음", src: "/1.png" },
  { id: "GOOD", label: "좋음", src: "/2.png" },
  { id: "SOSO", label: "그럭저럭", src: "/3.png" },
  { id: "BAD", label: "나쁨", src: "/4.png" },
  { id: "TERRIBLE", label: "완전 나쁨", src: "/5.png" },
];

interface DiaryResponse {
  message: {
    content: string;
    emotion: string;
    createdDate: string;
  };
}

interface UpdateResponse {
  message: string;
}

interface DeleteResponse {
  message: string;
}

export default function DiaryEditPage() {
  const { postId } = useParams();
  const router = useRouter();

  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("");
  const [showEmotionModal, setShowEmotionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await apiRequest.get<DiaryResponse>(`/post/find-post/${postId}`);
        const { content, emotion, createdDate } = response.data.message;

        setContent(content);
        setEmotion(emotion);

        const formattedDate = new Date(createdDate).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setDate(formattedDate);
      } catch (err) {
        console.error("일기 불러오기 실패:", err);
        setError("일기를 불러오지 못했습니다.");
      }
    };
    fetchDiary();
  }, [postId]);

  const handleSave = async () => {
    try {
      const response = await apiRequest.patch<UpdateResponse>(`/post/update/${postId}`, {
        content,
        emotion,
      });

      if (response.status === 200) {
        console.log("수정 성공:", response.data.message);
        router.push("/diary-history");
      } else {
        console.error("응답 오류:", response.data.message);
        setError("일기 수정에 실패했습니다.");
      }
    } catch (err) {
      console.error("Axios 오류:", err);
      setError("일기 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiRequest.delete<DeleteResponse>(`/post/delete/${postId}`);
      if (response.status === 200) {
        console.log("삭제 성공:", response.data.message);
        router.push("/diary-history");
      } else {
        console.error("응답 오류:", response.data.message);
        setError("일기 삭제에 실패했습니다.");
      }
    } catch (err) {
      console.error("삭제 오류:", err);
      setError("일기 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <Header
        title="일기 수정"
        showBack={true}
        onBack={() => router.back()}
        showDeleteButton={true}
        onDelete={() => setShowDeleteModal(true)}
      />

      <main className={styles.main}>
        <img
          src={EMOTIONS.find((e) => e.id === emotion)?.src ?? undefined}
          alt="emotion"
          className={styles.emojiPreview}
          onClick={() => setShowEmotionModal(true)}
        />
        <p className={styles.header}>
          {EMOTIONS.find((e) => e.id === emotion)?.label}
        </p>

        <div className={styles.dateBox}>
          <strong className={styles.date}>{date}</strong>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={() => router.back()} className={styles.cancelButton}>
            취소
          </button>
          <button onClick={handleSave} className={styles.confirmButton}>
            수정 완료
          </button>
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </main>

      {showEmotionModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.emotionGrid}>
              <div className={styles.emotionRow}>
                {EMOTIONS.slice(0, 3).map((e) => (
                  <div
                    key={e.id}
                    className={`${styles.emotionItem} ${emotion === e.id ? styles.selected : ""}`}
                    onClick={() => setEmotion(e.id)}
                  >
                    <img
                      src={e.src}
                      alt={e.label}
                      className={`${styles.emotionimg} ${emotion === e.id ? styles.selected : ""}`}
                    />
                    <span>{e.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.emotionRow}>
                {EMOTIONS.slice(3).map((e) => (
                  <div
                    key={e.id}
                    className={`${styles.emotionItem} ${emotion === e.id ? styles.selected : ""}`}
                    onClick={() => setEmotion(e.id)}
                  >
                    <img
                      src={e.src}
                      alt={e.label}
                      className={`${styles.emotionimg} ${emotion === e.id ? styles.selected : ""}`}
                    />
                    <span className={styles.emotiontext}>{e.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modalButtons}>
              <button onClick={() => setShowEmotionModal(false)} className={styles.modalCancel}>
                취소
              </button>
              <button onClick={() => setShowEmotionModal(false)} className={styles.modalConfirm}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer}>
            <p className={styles.title}>일기를 삭제하시겠습니까?</p>
            <p>일기를 삭제하면 복구할 수 없습니다.</p>
            <div className={styles.modalButtons}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.modalCancel}
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className={`${styles.modalRemove} ${styles.modalButton}`}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
