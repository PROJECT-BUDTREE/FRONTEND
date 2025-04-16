"use client";

import styles from "./style.module.css";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

export default function nickChange() {
  const router = useRouter();
  const nicknameComplete = () => {
    router.push("./mainPage");
  };

  return (
    <div className={styles.container}>
      <Header title={"닉네임변경"} showBack />
      <br></br>
      <br></br>

      <div className={styles.inputNickName}>
        <div className={styles.inputnick}>새로운 닉네임을 입력하세요.</div>
        <input className={styles.nickSetting} placeholder="닉네임" />
      </div>

      <button className={styles.completeButton} onClick={nicknameComplete}>
        완료
      </button>
    </div>
  );
}
