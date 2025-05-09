"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import styles from "./chathistory.module.css";
import apiRequest from "../util/reissue";

interface ChatRoom {
  roomId: number;
  createdTime: string;
}

interface ChatRoomResponse {
  status: number;
  message: ChatRoom[];
}
export default function ChatHistory() {
  const router = useRouter();

  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState("연도");
  const [selectedMonth, setSelectedMonth] = useState("월");

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2020 + 1 }, (_, index) =>
    (currentYear - index).toString()
  );
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const resultListRef = useRef<HTMLDivElement>(null);

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    setShowYearDropdown(false);
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
  };

  const scrollToTop = () => {
    if (resultListRef.current) {
      resultListRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = resultListRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsAtBottom(isBottom);
      setIsScrolled(scrollTop > 0);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const year = selectedYear === "연도" ? 0 : parseInt(selectedYear);
      const month = selectedMonth === "월" ? 0 : parseInt(selectedMonth);
  
      try {
        const response = await apiRequest.post<ChatRoomResponse>("/chatroom/all", {
          year,
          month,
        });
  
        if (response.status === 200 && Array.isArray(response.data.message)) {
          setChatRooms(response.data.message);
          setError(null);
        } else {
          setChatRooms([]);
        }
      } catch (err: any) {
        const message = err?.response?.data?.message;
        setChatRooms([]);
        setError(message || "오류가 발생했습니다.");
        console.error("조회 실패:", err);
      }
    };
  
    fetchChatRooms();
  }, [selectedYear, selectedMonth]);
  

  const getTitle = () => {
    const year = selectedYear === "연도" ? null : selectedYear;
    const month = selectedMonth === "월" ? null : selectedMonth.replace("월", "");
    if (year && month) return `${year}년 ${month}월`;
    if (year) return `${year}년`;
    if (month) return `${month}월`;
    return "전체 내역";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0].replace(/-/g, "/");
  };

  return (
    <div className={styles["chathistory-container"]} ref={dropdownRef}>
      <Header title="대화 내역" showBack onBack={() => router.push("/mypage")} />

      <div className={styles["selector-container"]}>
        <div className={styles["dropdown-wrapper"]}>
          <button
            className={`${styles["selector-button"]} ${showYearDropdown ? styles.active : ""}`}
            onClick={() => {
              setShowYearDropdown(!showYearDropdown);
              setShowMonthDropdown(false);
            }}
          >
            {selectedYear}
            {showYearDropdown ? <ChevronUp className={styles["selector-icon"]} /> : <ChevronDown className={styles["selector-icon"]} />}
          </button>
          {showYearDropdown && (
            <div className={styles.dropdown}>
              <div
                className={`${styles["dropdown-item"]} ${selectedYear === "연도" ? styles.selected : ""}`}
                onClick={() => handleYearSelect("연도")}
              >
                선택안함
              </div>
              {years.map((year) => (
                <div
                  key={year}
                  className={`${styles["dropdown-item"]} ${selectedYear === year ? styles.selected : ""}`}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles["dropdown-wrapper"]}>
          <button
            className={`${styles["selector-button"]} ${showMonthDropdown ? styles.active : ""}`}
            onClick={() => {
              setShowMonthDropdown(!showMonthDropdown);
              setShowYearDropdown(false);
            }}
          >
            {selectedMonth}
            {showMonthDropdown ? <ChevronUp className={styles["selector-icon"]} /> : <ChevronDown className={styles["selector-icon"]} />}
          </button>
          {showMonthDropdown && (
            <div className={styles.dropdown}>
              <div
                className={`${styles["dropdown-item"]} ${selectedMonth === "월" ? styles.selected : ""}`}
                onClick={() => handleMonthSelect("월")}
              >
                선택안함
              </div>
              {months.map((month) => (
                <div
                  key={month}
                  className={`${styles["dropdown-item"]} ${selectedMonth === month ? styles.selected : ""}`}
                  onClick={() => handleMonthSelect(month)}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles["chathistory-list-container"]} ref={resultListRef}>
        <h2 className={styles["chathistory-list-title"]}>{getTitle()}</h2>

        {error && (
          <div className={styles["error-container"]}>
            <p className={styles["error-message"]}>{error}</p>
          </div>
        )}

        {chatRooms.map((item) => (
          <div
            key={item.roomId}
            className={styles["chathistory-item"]}
            onClick={() => router.push(`/chat/${item.roomId}`)}
            style={{ cursor: "pointer" }}
          >
            <p className={styles["chathistory-item-date"]}>{formatDate(item.createdTime)}</p>
          </div>
        ))}

        {isScrolled && (
          <button
            className={`${styles["scroll-to-top-button"]} ${isAtBottom ? styles["at-bottom"] : ""}`}
            onClick={scrollToTop}
          >
            <ChevronUp className={styles["scroll-top-icon"]} />
          </button>
        )}
      </div>
    </div>
  );
}
