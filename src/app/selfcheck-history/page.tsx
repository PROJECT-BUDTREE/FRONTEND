"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import styles from "./selfcheckhistory.module.css";
import apiRequest from "../util/reissue";

interface SelfCheckResult {
  score: number;
  createdDate: string;
}

export default function SelfCheckHistory() {
  const router = useRouter();

  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState("연도");
  const [selectedMonth, setSelectedMonth] = useState("월");

  const [results, setResults] = useState<SelfCheckResult[]>([]);
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
      resultListRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFetchResults = async () => {
    const year = selectedYear === "연도" ? 0 : parseInt(selectedYear, 10);
    const month = selectedMonth === "월" ? 0 : parseInt(selectedMonth, 10);

    try {
      const response = await apiRequest.post<{ message: SelfCheckResult[] }>(
        "/survey/all",
        { year, month }
      );
      const data = response.data.message;

      if (response.status === 200 && Array.isArray(data) && data.length > 0) {
        setResults(data);
        setError(null);
      } else {
        setResults([]);
      }
    } catch (err: any) {
      setResults([]);
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 400 && message) {
        setError(message);
        console.error({ status: 400, message });
      }
    }
  };

  useEffect(() => {
    handleFetchResults();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    const container = resultListRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
      setIsScrolled(scrollTop > 0);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const getStatus = (score: number) => {
    if (score <= 4) return "정상";
    if (score <= 9) return "경미한 수준";
    if (score <= 14) return "중간 수준";
    if (score <= 19) return "약간 심한 수준";
    return "심한 수준";
  };

  const getStatusColor = (score: number): string => {
    if (score <= 4) return "#8dd884";
    if (score <= 9) return "#e986fd";
    if (score <= 14) return "#6fa4ff";
    if (score <= 19) return "#ffb74d";
    return "#e57373";
  };

  return (
    <div className={styles["selfcheckhistory-container"]} ref={dropdownRef}>
      <Header title="자가진단 내역" showBack />

      {/* 날짜 선택 드롭다운 */}
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
            {showYearDropdown ? (
              <ChevronUp className={styles["selector-icon"]} />
            ) : (
              <ChevronDown className={styles["selector-icon"]} />
            )}
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
            {showMonthDropdown ? (
              <ChevronUp className={styles["selector-icon"]} />
            ) : (
              <ChevronDown className={styles["selector-icon"]} />
            )}
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
      <div className={styles["selfcheckhistory-list-container"]} ref={resultListRef}>
        <h2 className={styles["selfcheckhistory-list-title"]}>
          {selectedYear === "연도" && selectedMonth === "월"
            ? "전체 내역"
            : `${selectedYear !== "연도" ? `${selectedYear}년` : ""} ${
                selectedMonth !== "월" ? `${selectedMonth}` : ""
              }`.trim()}
        </h2>

        {error && <p className={styles["error-message"]}>{error}</p>}
        {results.map((item, idx) => {
          const dateObj = new Date(item.createdDate);
          const formattedDate = `${dateObj.getFullYear()}-${String(
            dateObj.getMonth() + 1
          ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;

          return (
            <div key={idx} className={styles["selfcheckhistory-item"]}>
              <div className={styles["selfcheckhistory-item-row"]}>
                <p className={styles["selfcheckhistory-item-date"]}>{formattedDate}</p>
                <p
                  className={styles["selfcheckhistory-item-status"]}
                  style={{ color: getStatusColor(item.score) }}
                >
                  {getStatus(item.score)} ｜ <span>{item.score}점</span>
                </p>
              </div>
            </div>
          );
        })}

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
