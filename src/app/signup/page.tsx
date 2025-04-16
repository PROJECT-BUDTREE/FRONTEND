"use client";

import Header from "../components/Header";
import styles from "./style.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

// 1. 아이디를 입력하면 중복확인
// 2. 아이디,닉네임 비밀번호, 비밀번호 확인에서 하나라도 빠질시 인풋창 밑에 경고문 출력해주기
// 3. 비밀번호와 비밀번호 확인 동일한지 check
// 4. 비밀번호 조건문 채우기
// 5. 비밀번호 (8자 이상, 문자/숫자/기호 사용)
// 6. 반응형 check

export default function Signup() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleDuplicateCheck = () => {
    // Here you would implement the actual duplicate check logic
    alert(`'${id}' 아이디 중복 확인 중`);
  };

  const buttonClick = () => {
    // Validation could be added here
    router.push("./tree");
  };

  return (
    <div className={styles.container}>
      <Header title="회원가입" showBack />
      <div className={styles.inputArea}>
        <div className={styles.inputId}>
          <div className={styles.newId}>아이디</div>
          <div className={styles.idInputContainer}>
            <input
              type="email"
              placeholder="아이디를 입력해주세요."
              className={styles.inputid__}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button
              className={styles.duplicateCheckBtn}
              onClick={handleDuplicateCheck}
            >
              중복확인
            </button>
          </div>
        </div>

        <div className={styles.inputPassword}>
          <div className={styles.newpwd}>닉네임</div>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            className={styles.inputpwd}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className={styles.inputPassword}>
          <div className={styles.newpwd}>비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호 (8자 이상, 문자/숫자/기호 사용)"
            className={styles.inputpwd}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputPassword}>
          <div className={styles.newpwd}>비밀번호 확인</div>
          <input
            type="password"
            placeholder="비밀번호 확인"
            className={styles.inputpwd}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={buttonClick}>
          완료
        </button>
      </div>
    </div>
  );
}
