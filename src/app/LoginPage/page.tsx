"use client";
import styles from "./style.module.css";
import { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idError, setIdError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const serverURL = process.env.NEXT_PUBLIC_API_SERVER_URL;
  const [passwordType1, setPasswordType1] = useState({
    type: "password",
    visible: false,
  });

  const goToHome = () => {
    // 로그인 페이지에서 이전 페이지로 이동할 시 무조건 시작화면으로 고정
    router.push("/");
  };

  const handlePassword = () => {
    setPasswordType1((before) => ({
      type: before.visible ? "password" : "text", // 1. 처음에 visible이 false이므로 눈 모양 클릭 했으니 text를 보여줌
      visible: !before.visible, // 2. 그 다음을 위해 visible = true 지정 => 1, 2 과정 반복
    }));
  };

  // 로그인 전 필수 입력 체크
  const validateFields = () => {
    let valid = true;
    if (id.trim() === "") {
      setIdError("아이디를 입력해주세요.");
      valid = false;
    } else {
      setIdError("");
    }
    if (password.trim() === "") {
      setPwdError("비밀번호를 입력해주세요.");
      valid = false;
    } else {
      setPwdError("");
    }
    return valid;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${serverURL}/member/login`,
        { username: id, password: password },
        {
          headers: { "Content-Type": "application/json" },

          withCredentials: true
        }
      );

      // Access Token 추출
      const authHeader = response.headers["authorization"];
      const token = authHeader?.split(" ")[1]; // ? : authHeader가 null이면 .split(" ")을 아예 시도하지 않고 undefined를 반환 => 즉, 코드가 중단되지 않음
      if (token) localStorage.setItem("token", token); // Access Token 로컬 스토리지에 저장

      const data = response.data as {
        status: number;
        message: { name: string; msg: string };
      };

      if (data.message?.name) {
        localStorage.setItem("id", id); // 로컬 스토리지에 사용자 아이디 저장 (마이 페이지에 쓰임)
        router.push(`/mainPage?name=${encodeURIComponent(data.message.name)}`);
      } else {
        alert("회원정보가 없으니 회원가입을 해주세요.");
      }
    } catch (err: any) {
      console.error("로그인 중 오류 발생:", err);
      if (err.response) {
        if (err.response.status === 401) {
          alert("아이디 또는 비밀번호가 틀렸습니다.");
        } else {
          alert("로그인 중 오류가 발생했습니다.");
        }
      } else {
        alert("네트워크 연결을 확인해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header title="로그인" showBack onBack={goToHome} />
      <div className={styles.InputArea}>
        <div className={styles.StartImage}>
          <Image
            className={styles.LogoImage}
            src="/favicon.png"
            alt="logo"
            width={247}
            height={202}
          />
        </div>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          className={styles.inputId}
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            if (e.target.value.trim() !== "") setIdError("");
          }}
          onBlur={() =>
            id.trim() === ""
              ? setIdError("아이디를 입력해주세요.")
              : setIdError("")
          }
        />
        {idError && <p className={styles.error}>{idError}</p>}
        <br />

        <div className={styles.inputWrapper}>
          <input
            type={passwordType1.type}
            placeholder="비밀번호를 입력해주세요."
            className={styles.inputpwd}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.trim() !== "") setPwdError("");
            }}
            onBlur={() =>
              password.trim() === ""
                ? setPwdError("비밀번호를 입력해주세요.")
                : setPwdError("")
            }
          />
          <div className={styles.eyeIcon} onClick={handlePassword}>
            {passwordType1.visible ? (
              <Image src="/eye-off.png" alt="숨기기" width={24} height={24} />
            ) : (
              <Image src="/eye.png" alt="보이기" width={24} height={24} />
            )}
          </div>
        </div>
        {pwdError && <p className={styles.error}>{pwdError}</p>}
      </div>

      <div className={styles.ButtonWrapper}>
        <button className={styles.btn} onClick={handleLogin} disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
}
