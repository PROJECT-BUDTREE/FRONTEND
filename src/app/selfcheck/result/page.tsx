"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import styles from "./result.module.css";
import { useState } from "react";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get(`score`) || `0`);
  const surveyId = searchParams.get('surveyId');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <main className={styles.container}>
      <Header title="자가진단 결과" showBack />
      <div
        className={`${styles.resultScore} ${
          score <= 4
            ? styles["level-normal"]
            : score <= 9
            ? styles["level-mild"]
            : score <= 14
            ? styles["level-moderate"]
            : score <= 19
            ? styles["level-moderately-severe"]
            : styles["level-severe"]
        }`}
      >
        {score}점
      </div>

      {(() => {
        if (score <= 4) {
          return (
            <section className={`${styles.resultDescriptionBoxtop}`}>
              <p>
                <strong className={`${styles["level-normal"]}`}>정상</strong>
                <span> (총점 0~4점)</span>
              </p>
              <p>
                적응상의 지장을 초래할만한 우울 관련 증상을 거의 보고하지
                않았습니다.
              </p>
            </section>
          );
        } else if (score <= 9) {
          return (
            <section className={`${styles.resultDescriptionBoxtop}`}>
              <p>
                <strong className={`${styles["level-mild"]}`}>
                  경미한 수준
                </strong>
                <span> (총점 5~9점)</span>
              </p>
              <p>
                경미한 수준의 우울감이 있으나 일상생활에 지장을 줄 정도는
                아닙니다.
              </p>
            </section>
          );
        } else if (score <= 14) {
          return (
            <section className={`${styles.resultDescriptionBoxtop}`}>
              <p>
                <strong className={`${styles["level-moderate"]}`}>
                  중간 수준
                </strong>
                <span> (총점 10~14점)</span>
              </p>
              <p>
                중간 수준의 우울감을 비교적 자주 경험하는 것으로 보고하였습니다.
                직업적·사회적 적응에 일부 영향을 미칠 수 있어 주의 깊은 관찰과
                관심이 필요합니다.
              </p>
            </section>
          );
        } else if (score <= 19) {
          return (
            <section className={`${styles.resultDescriptionBoxtop}`}>
              <p>
                <strong className={`${styles["level-moderately-severe"]}`}>
                  약간 심한 수준
                </strong>
                <span> (총점 15~19점)</span>
              </p>
              <p>
                약간 심한 수준의 우울감을 자주 경험하는 것으로 보고하였습니다.
                직업적·사회적 적응에 일부 영향을 미칠 경우, 정신건강 전문가의
                도움을 받아 보시기를 권해 드립니다.
              </p>
            </section>
          );
        } else {
          return (
            <section className={`${styles.resultDescriptionBoxtop}`}>
              <p>
                <strong className={`${styles["level-severe"]}`}>
                  심한 수준
                </strong>
                <span> (총점 20~27점)</span>
              </p>
              <p>
                광범위한 우울 증상을 매우 자주·심한 수준에서 경험하는 것으로
                보고하였습니다. 일상생활의 다양한 영역에서 어려움이 초래될 경우,
                추가적인 평가나 정신건강 전문가의 도움을 받아 보시기를 권해
                드립니다.
              </p>
            </section>
          );
        }
      })()}

      <hr style={{ margin: "40px 16px", borderColor: "#ddd" }} />
      <section className={`${styles.resultDescriptionBox}`}>
        <div className={`${styles.resultBottom}`}>
          <p>
            <strong className={`${styles["level-normal"]}`}>정상</strong>
            <span> (총점 0~4점)</span>
          </p>
          <p>
            적응상의 지장을 초래할만한 우울 관련 증상을 거의 보고하지
            않았습니다.
          </p>
        </div>
        <div className={`${styles.resultBottom}`}>
          <p>
            <strong className={`${styles["level-mild"]}`}>경미한 수준</strong>
            <span> (총점 5~9점)</span>
          </p>
          <p>
            경미한 수준의 우울감이 있으나 일상생활에 지장을 줄 정도는 아닙니다.
          </p>
        </div>
        <div className={`${styles.resultBottom}`}>
          <p>
            <strong className={`${styles["level-moderate"]}`}>중간 수준</strong>
            <span> (총점 10~14점)</span>
          </p>
          <p>
            중간 수준의 우울감을 비교적 자주 경험하는 것으로 보고하였습니다.
            직업적·사회적 적응에 일부 영향을 미칠 수 있어 주의 깊은 관찰과
            관심이 필요합니다.
          </p>
        </div>
        <div className={`${styles.resultBottom}`}>
          <p>
            <strong className={`${styles["level-moderately-severe"]}`}>
              약간 심한 수준
            </strong>
            <span> (총점 15~19점)</span>
          </p>
          <p>
            약간 심한 수준의 우울감을 자주 경험하는 것으로 보고하였습니다.
            직업적·사회적 적응에 일부 영향을 미칠 경우, 정신건강 전문가의 도움을
            받아 보시기를 권해 드립니다.
          </p>
        </div>
        <div className={`${styles.resultBottom}`}>
          <p>
            <strong className={`${styles["level-severe"]}`}>심한 수준</strong>
            <span> (총점 20~27점)</span>
          </p>
          <p>
            광범위한 우울 증상을 매우 자주·심한 수준에서 경험하는 것으로
            보고하였습니다. 일상생활의 다양한 영역에서 어려움이 초래될 경우,
            추가적인 평가나 정신건강 전문가의 도움을 받아 보시기를 권해
            드립니다.
          </p>
        </div>
      </section>

      <div className={styles.fixedFooter}>
        <button
          className={styles.nextButton}
          onClick={() => setShowModal(true)}
        >
          다음
        </button>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p className={styles.modalTitle}>버디에게 상담 받으시겠습니까?</p>
            <p className={styles.modalText}>
              자가진단 결과를 바탕으로 <br />
              버디에게 상담을 받을 수 있습니다.
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setShowModal(false);
                  router.push("/mainPage");
                }}
              >
                취소
              </button>
              <button
                className={styles.confirmButton}
                onClick={() => router.push(`/chatbot?surveyId=${surveyId}`)}
                disabled={loading}
              >
                {loading ? "처리중..." : "확인"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
