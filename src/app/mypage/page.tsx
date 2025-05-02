"use client";

import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import DeleteModal from "../components/DeleteModal";
import LogoutModal from "../components/LogoutModal";
import apiRequest from "../util/reissue";

// 1. 로그인 아이디 정보 불러오기

export default function MyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false); // 회원탈퇴 모달
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 로그아웃 모달
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const savedNickname = localStorage.getItem("userName");
    const savedUserId = localStorage.getItem("id");

    // 닉네임 저장
    if (savedNickname) {
      setName(savedNickname);
      console.log("저장된 닉네임:", savedNickname);
    } else {
      console.log("닉네임이 localStorage에 없습니다.");
    }

    // 아이디 저장
    if (savedUserId) {
      setUserId(savedUserId); // ✅ state를 업데이트해야 함!
      console.log("저장된 유저 ID:", savedUserId);
    } else {
      console.log("유저 ID가 localStorage에 없습니다.");
    }
  }, []);

  const handleDeleteProfile = async () => {
    try {
      // await axios.delete("https://api.budtree.store/member/edit", {
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      //   },
      // });

      const response = await apiRequest.delete("member/edit", {});
      const data = response.data as {};

      localStorage.clear();
      alert("그동안 이용해주셔서 감사합니다.");
      router.push("/");
    } catch (err) {
      alert(err.response?.data?.message || "회원 탈퇴에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await apiRequest.get("member/logout", {});
      const data = response.data as {};
    } catch (e) {
      console.error("백엔드 로그아웃 실패:", e);
    } finally {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      router.push("/LoginPage");
    }
  };

  return (
    <div className={styles.container}>
      <Header title="마이 페이지" showBack />;
      <div className={styles.content}>
        {/* 프로필 섹션 */}
        <div className={styles.profileCard}>
          <div className={styles.profileInfo}>
            <Image
              src="/buddy.png"
              alt="프로필 이미지"
              width={60}
              height={60}
              className={styles.profileImage}
            />
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.nickname}>{name}</h2>
            <p className={styles.userId}>{userId}</p>
          </div>
        </div>
      </div>
      <br></br>
      {/* 활동 내역 섹션 */}
      <div className={styles.menuCard}>
        <Link href="/diary-history" className={styles.menuItem}>
          <span>일기 내역</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
        <div className={styles.divider}></div>
        <Link href="/chat-history" className={styles.menuItem}>
          <span>대화 내역</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
        <div className={styles.divider}></div>
        <Link href="/selfcheck-history" className={styles.menuItem}>
          <span>자가진단 내역</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>
      <br></br>
      {/* 계정 설정 섹션 */}
      <div className={styles.menuCard}>
        <Link href="/nickname-change" className={styles.menuItem}>
          <span>닉네임 변경</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
        <div className={styles.divider}></div>
        <Link href="/password-change" className={styles.menuItem}>
          <span>비밀번호 변경</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>
      {/* 회원 탈퇴 및 로그아웃 */}
      <div className={styles.footer}>
        <button
          className={styles.textButton}
          onClick={() => setShowLogoutModal(true)}
        >
          로그아웃
        </button>
        {showLogoutModal && (
          <LogoutModal
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
          />
        )}
        <span className={styles.separator}>|</span>
        <button
          className={styles.textButton}
          onClick={() => setShowModal(true)}
        >
          회원탈퇴
        </button>
      </div>
      {/* 모달 렌더링 */}
      {showModal && (
        <DeleteModal
          onClose={() => setShowModal(false)}
          onConfirm={handleDeleteProfile}
        />
      )}
    </div>
  );
}
