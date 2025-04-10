"use client";

import styles from "./style.module.css";
import Header from "../components/Header";

export default function nickChange() {
  return (
    <div className={styles.container}>
      <Header title={"닉네임변경"} showBack />
      <br></br>
      <br></br>

      <div className={styles.inputNickName}>
        <div className={styles.inputnick}>새로운 닉네임을 입력하세요.</div>
        <input className={styles.nickSetting} placeholder="닉네임" />
      </div>

      <button className={styles.completeButton}>완료</button>
    </div>
  );
}
