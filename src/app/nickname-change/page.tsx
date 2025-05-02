// "use client";

// import styles from "./style.module.css";
// import Header from "../components/Header";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function nickChange() {
//   const router = useRouter();
//   const [nickname, setNickname] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   useEffect(() => {
//     if (nickname.trim() === "") {
//       setErrorMessage("변경할 닉네임을 입력해주세요.");
//     } else {
//       setErrorMessage("");
//     }
//   }, [nickname]);

//   const nicknameComplete = () => {
//     router.push("./mainPage");
//   };

//   return (
//     <div className={styles.container}>
//       <Header title={"닉네임변경"} showBack />

//       <br></br>
//       <br></br>

//       <div className={styles.content}>
//         <div className={styles.inputNickName}>
//           <div className={styles.inputnick}>새로운 닉네임을 입력하세요.</div>
//           <input
//             className={styles.nickSetting}
//             placeholder="닉네임을 입력하세요"
//             value={nickname}
//             onChange={(e) => setNickname(e.target.value)}
//           />
//           {errorMessage && <p className={styles.error}>{errorMessage}</p>}
//         </div>
//       </div>

//       <div className={styles.footer}>
//         <button
//           className={styles.completeButton}
//           onClick={nicknameComplete}
//           disabled={nickname.trim() === ""}
//         >
//           완료
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import styles from "./style.module.css";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import apiRequest from "../util/reissue";

export default function NickChange() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateNickname = () => {
    if (nickname.trim() === "") {
      setErrorMessage("변경할 닉네임을 입력해주세요.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  useEffect(() => {
    // console.log(
    //   "페이지 렌더 후 ACCESS_TOKEN:",
    //   localStorage.getItem("ACCESS_TOKEN")
    // );

    const savedNickname = localStorage.getItem("userName");
    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

  const nicknameComplete = async () => {
    console.log("보내는 닉네임:", nickname);
    console.log("ACCESS_TOKEN:", localStorage.getItem("token"));
    if (!validateNickname()) return;

    try {
      const response = await apiRequest.patch("/member/change-name", {
        name: nickname,
      });

      const data = response.data as {
        status: number;
        message: string;
      };

      // 성공 시 localStorage에 닉네임 저장
      localStorage.setItem("userName", nickname);
      alert("닉네임이 성공적으로 변경되었습니다.");
      console.log(response.data);
      router.push("./mainPage");
    } catch (err) {
      console.error("닉네임 변경 실패:", err);
      alert(err.response?.data?.message || "닉네임 변경에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <Header title={"닉네임 변경"} showBack />

      <br />
      <br />

      <div className={styles.content}>
        <div className={styles.inputNickName}>
          <div className={styles.inputnick}>새로운 닉네임을 입력하세요.</div>
          <input
            className={styles.nickSetting}
            placeholder="닉네임을 입력하세요."
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              if (e.target.value.trim() !== "") {
                setErrorMessage("");
              }
            }}
            onBlur={validateNickname} // 포커스 벗어나면 검증
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.completeButton}
          onClick={nicknameComplete}
          disabled={nickname.trim() === ""}
        >
          완료
        </button>
      </div>
    </div>
  );
}
