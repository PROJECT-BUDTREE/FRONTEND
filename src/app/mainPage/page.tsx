"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Image from "next/image"; // Image 컴포넌트 import
import { useSearchParams } from "next/navigation";

export default function MainPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // 여기서 name 받아오기
  const [userName, setUserName] = useState("");

  // 쿼리 파라미터에서 name 가져오고 localStorage에도 저장
  useEffect(() => {
    const name = searchParams.get("name");
    if (name) {
      setUserName(name);
      localStorage.setItem("userName", name);
    }
  }, [searchParams]);

  console.log(name);

  return (
    <div className={styles.container}>
      {/* header*/}
      <div className={styles.header}>
        <Image
          className={styles.image}
          src="/title.png"
          alt="title"
          width={100}
          height={58}
        />
        <div className={styles.headerContent}>
          <span className={styles.name}>
            {userName ? `${userName}님, 반가워요` : "반가워요"}
          </span>
          <span className={styles.daily}>오늘 어떤 하루를 보내셨나요?</span>
        </div>
      </div>

      <div className={styles.selfCheckDiv}>
        <div className={styles.firstSelfCheck}>
          <div className={styles.btn}>
            <Image
              className={styles.SelfImage}
              src="/selfCheckButton.png"
              alt="selfcheck"
              width={100}
              height={100}
            />
            <button className={styles.btn2}>
              <span className={styles.font}>← 자가진단</span>
            </button>
          </div>
          <div className={styles.firstExplanation}>
            <span>우울증 기반 자가진단을</span>
            <span>원하시거나, 검사 결과를</span>
            <span>바탕으로 이야기하고 싶다면</span>
            <span>자가진단 버튼을 눌러주세요</span>
          </div>
        </div>
        {/* 두 번째 섹션 (설명 왼쪽, 버튼 오른쪽으로 위치 변경) */}
        <div className={styles.secondSelfCheck}>
          <div className={styles.secondExplanation}>
            <span>버디에게 편하게</span>
            <span>이야기를 들려주세요.</span>
            <span>버디가 함께 고민을</span>
            <span>나누고 해결해드릴께요.</span>
          </div>
          <div className={styles.btn}>
            <Image
              className={styles.SelfImage}
              src="/message.png"
              alt="selfcheck"
              width={100}
              height={100}
            />
            <button className={styles.btn2}>
              <span className={styles.font}>with BUDDY →</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottomImage}>
        <Image
          className={styles.realImage}
          src="/selfcheck.png"
          alt="selfcheck"
          width={270}
          height={270}
        />
      </div>
    </div>
  );
}
