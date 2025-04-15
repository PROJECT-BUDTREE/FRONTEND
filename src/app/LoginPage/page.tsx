// "use client";
// import styles from "./style.module.css";
// import { useState } from "react";
// import Image from "next/image"; // Image 컴포넌트 import
// import Header from "../components/Header";
// import axios from "axios";
// import { useRouter } from "next/navigation"; // ✅ 올바른 import

// export default function LoginPage() {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const [name, setName] = useState("");

//   const handleLogin = async () => {
//     if (id.trim() === "" || password.trim() === "") {
//       alert("아이디와 비밀번호를 입력해주세요.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "https://api.budtree.store/member/login",
//         {
//           username: id,
//           password: password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json", // ✅ 꼭 명시
//           },
//           withCredentials: true, // ✅ 쿠키 받을 때 필요
//         }
//       );

//       console.log("로그인 응답:", response);

//       // ✅ 헤더에서 Access Token 추출
//       const authHeader = response.headers["authorization"];
//       const token = authHeader?.split(" ")[1];

//       if (token) {
//         localStorage.setItem("token", token);
//         // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       }

//       console.log("Access Token:", token);

//       // const data = response.data as { name?: string; user?: { name?: string } };
//       // const nameFromResponse = data.name || data.user?.name;
//       const data = response.data as { status: number; message: { name: string; msg: string } };
//       const nameFromResponse = data.message?.name;
//       console.log("name response : ", nameFromResponse);

//       if (nameFromResponse) {
//         router.push(`/mainPage?name=${encodeURIComponent(nameFromResponse)}`);
//       } else {
//         alert("회원정보가 없으니 회원가입을 해주세요.");
//       }
//     } catch (error: any) {
//       console.error("로그인 중 오류 발생:", error);
//       alert("로그인 중 오류가 발생했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <Header title="로그인" showBack={true} />
//       {/* favicon을 src로 사용 */}
//       <div className={styles.InputArea}>
//         <div className={styles.StartImage}>
//           <Image
//             className={styles.LogoImage}
//             src="/favicon.png"
//             alt="logo"
//             width={247}
//             height={202}
//           />
//         </div>
//         <input
//           type="text"
//           placeholder="아이디를 입력해주세요."
//           className={styles.inputId}
//           value={id}
//           onChange={(e) => setId(e.target.value)}
//         />

//         <br />

//         <br></br>
//         <input
//           type="password"
//           placeholder="비밀번호를 입력해주세요."
//           className={styles.inputpwd}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <div className={styles.ButtonWrapper}>
//         <button className={styles.btn} onClick={handleLogin} disabled={loading}>
//           {loading ? "로그인 중..." : "로그인"}
//           {/* {loading ? "로그인 중..." : "완료"} */}
//         </button>
//       </div>
//     </div>
//   );
// }
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

  const handleLogin = async () => {
    // 에러 상태 초기화
    setIdError("");
    setPwdError("");
    
    let hasError = false;
    
    // 아이디가 비어있다면 에러 메시지 설정
    if (id.trim() === "") {
      setIdError("아이디를 입력해주세요.");
      hasError = true;
    }
    
    // 비밀번호가 비어있다면 에러 메시지 설정
    if (password.trim() === "") {
      setPwdError("비밀번호를 입력해주세요.");
      hasError = true;
    }
    
    // 하나라도 비어있으면 로그인 요청 진행 X
    if (hasError) return;
    
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.budtree.store/member/login",
        {
          username: id,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // 응답 헤더에서 Access Token 추출 후 로컬스토리지에 저장
      const authHeader = response.headers["authorization"];
      const token = authHeader?.split(" ")[1];
      if (token) {
        localStorage.setItem("token", token);
      }

      const data = response.data as { status: number; message: { name: string; msg: string } };
      
      // 서버에서 받은 응답 데이터에 이름이 있으면 로그인 성공으로 간주
      if (data.message?.name) {
        router.push(`/mainPage?name=${encodeURIComponent(data.message.name)}`);
      } else {
        // 데이터는 있지만 이름이 없는 경우
        alert("회원정보가 없으니 회원가입을 해주세요.");
      }
    } catch (error: any) {
      console.error("로그인 중 오류 발생:", error);
      
      // 서버 응답에 따른 더 구체적인 에러 메시지 표시
      if (error.response) {
        if (error.response.status === 401) {
          alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        } else if (error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("로그인 중 오류가 발생했습니다.");
        }
      } else {
        alert("로그인 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 아이디와 비밀번호 입력 필드에 대한 검증 함수
  const validateFields = () => {
    // 아이디 입력 필드 검증
    if (id.trim() === "") {
      setIdError("아이디를 입력해주세요.");
    } else {
      setIdError("");
    }
    
    // 비밀번호 입력 필드 검증
    if (password.trim() === "") {
      setPwdError("비밀번호를 입력해주세요.");
    } else {
      setPwdError("");
    }
  };

  return (
    <div className={styles.container}>
      <Header title="로그인" showBack={true} />
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
            // 아이디 필드에 값이 있으면 에러 메시지 제거
            if (e.target.value.trim() !== "") {
              setIdError("");
            }
          }}
          // 포커스를 잃었을 때 검증
          onBlur={validateFields}
        />
        {/* 아이디가 비어있을 때 빨간색 에러 메시지 */}
        {idError && <p style={{ color: "red", marginTop: "0.5rem" }}>{idError}</p>}
        <br />
        <br />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          className={styles.inputpwd}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            // 비밀번호 필드에 값이 있으면 에러 메시지 제거
            if (e.target.value.trim() !== "") {
              setPwdError("");
            }
          }}
          // 포커스를 잃었을 때 검증
          onBlur={validateFields}
        />
        {/* 비밀번호가 비어있을 때 빨간색 에러 메시지 */}
        {pwdError && <p style={{ color: "red", marginTop: "0.5rem" }}>{pwdError}</p>}
      </div>
      <div className={styles.ButtonWrapper}>
        <button 
          className={styles.btn} 
          onClick={() => {
            validateFields(); // 검증 후
            handleLogin(); // 로그인 시도
          }} 
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
}