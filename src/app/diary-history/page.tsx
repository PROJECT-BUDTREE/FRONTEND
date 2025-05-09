"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import styles from "./diaryhistory.module.css";
import apiRequest from "../util/reissue";

type DiaryItem = {
  postId: number;
  emotion: "EXCELLENT" | "GOOD" | "SOSO" | "BAD" | "TERRIBLE";
  createdDate: string;
};

export default function DiaryHistory() {
  const router = useRouter();

  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState("연도");
  const [selectedMonth, setSelectedMonth] = useState("월");

  const [diaryList, setDiaryList] = useState<DiaryItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2020 + 1 }, (_, index) =>
    (currentYear - index).toString()
  );
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const diaryListRef = useRef<HTMLDivElement>(null);

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    setShowYearDropdown(false);
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
  };

  const scrollToTop = () => {
    if (diaryListRef.current) {
      diaryListRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getYearValue = () =>
    selectedYear === "연도" ? 0 : parseInt(selectedYear);
  const getMonthValue = () =>
    selectedMonth === "월" ? 0 : parseInt(selectedMonth.replace("월", ""));

  const emotionTextMap: Record<DiaryItem["emotion"], string> = {
    EXCELLENT: "완전 좋음",
    GOOD: "좋음",
    SOSO: "보통",
    BAD: "나쁨",
    TERRIBLE: "완전 나쁨",
  };

  const emotionImageMap: Record<DiaryItem["emotion"], string> = {
    EXCELLENT: "/1.png",
    GOOD: "/2.png",
    SOSO: "/3.png",
    BAD: "/4.png",
    TERRIBLE: "/5.png",
  };

  useEffect(() => {
    const fetchDiaryList = async () => {
      try {
        const response = await apiRequest.post<{ message: DiaryItem[] }>(
          "/post/all",
          {
            year: getYearValue(),
            month: getMonthValue(),
          }
        );

        if (response.status === 200 && Array.isArray(response.data.message)) {
          setDiaryList(response.data.message);
          setErrorMessage("");
        } else {
          setDiaryList([]);
        }
      } catch (err: any) {
        setDiaryList([]);
        const status = err?.response?.status;
        const message = err?.response?.data?.message;

        if (status === 400 && message) {
          setErrorMessage(message);
          console.error({ status: 400, message });
        } else {
          setErrorMessage("일기장 조회 중 오류가 발생했습니다.");
          console.error("알 수 없는 오류:", err);
        }
      }
    };

    fetchDiaryList();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    const container = diaryListRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
      setIsScrolled(scrollTop > 0);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles["diary-container"]} ref={dropdownRef}>
      <Header
        title="일기 내역"
        showBack
        onBack={() => router.push("/mypage")}
      />

      {/* Year & Month Selector */}
      <div className={styles["selector-container"]}>
        <div className={styles["dropdown-wrapper"]}>
          <button
            className={`${styles["selector-button"]} ${
              showYearDropdown ? styles.active : ""
            }`}
            onClick={() => {
              setShowYearDropdown(!showYearDropdown);
              setShowMonthDropdown(false);
            }}
          >
            {selectedYear}
            {showYearDropdown ? (
              <ChevronUp className={styles["selector-icon"]} />
            ) : (
              <ChevronDown className={styles["selector-icon"]} />
            )}
          </button>
          {showYearDropdown && (
            <div className={styles.dropdown}>
              <div
                className={styles["dropdown-item"]}
                onClick={() => handleYearSelect("연도")}
              >
                선택안함
              </div>
              {years.map((year) => (
                <div
                  key={year}
                  className={`${styles["dropdown-item"]} ${
                    selectedYear === year ? styles.selected : ""
                  }`}
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
            className={`${styles["selector-button"]} ${
              showMonthDropdown ? styles.active : ""
            }`}
            onClick={() => {
              setShowMonthDropdown(!showMonthDropdown);
              setShowYearDropdown(false);
            }}
          >
            {selectedMonth}
            {showMonthDropdown ? (
              <ChevronUp className={styles["selector-icon"]} />
            ) : (
              <ChevronDown className={styles["selector-icon"]} />
            )}
          </button>
          {showMonthDropdown && (
            <div className={styles.dropdown}>
              <div
                className={styles["dropdown-item"]}
                onClick={() => handleMonthSelect("월")}
              >
                선택안함
              </div>
              {months.map((month) => (
                <div
                  key={month}
                  className={`${styles["dropdown-item"]} ${
                    selectedMonth === month ? styles.selected : ""
                  }`}
                  onClick={() => handleMonthSelect(month)}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles["diary-list-container"]} ref={diaryListRef}>
        <h2 className={styles["diary-list-title"]}>
          {getYearValue() === 0 && getMonthValue() === 0
            ? "전체 내역"
            : `${getYearValue() !== 0 ? getYearValue() + "년" : ""} ${
                getMonthValue() !== 0 ? getMonthValue() + "월" : ""
              }`.trim()}
        </h2>

        {errorMessage ? (
          <p className={styles["empty-message"]}>{errorMessage}</p>
        ) : (
          diaryList.map((item) => (
            <div key={item.postId} className={styles["diary-item"]}>
              <div className={styles["diary-item-left"]}>
                <img
                  src={emotionImageMap[item.emotion]}
                  alt={item.emotion}
                  className={styles["diary-item-image"]}
                />
                <div className={styles["diary-item-text"]}>
                  <p className={styles["diary-item-date"]}>
                    {item.createdDate.split("T")[0]}
                  </p>
                  <p className={styles["diary-item-status"]}>
                    {emotionTextMap[item.emotion]}
                  </p>
                </div>
              </div>
              <button
                className={styles["diary-change-button"]}
                onClick={() => router.push(`/diary/edit/${item.postId}`)}
              >
                변경
              </button>
            </div>
          ))
        )}

        {isScrolled && (
          <button
            className={`${styles["scroll-to-top-button"]} ${
              isAtBottom ? styles["at-bottom"] : ""
            }`}
            onClick={scrollToTop}
          >
            <ChevronUp className={styles["scroll-top-icon"]} />
          </button>
        )}
      </div>
    </div>
  );
}
