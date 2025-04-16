"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import styles from "./chathistory.module.css";

export default function ChatHistory() {
  const router = useRouter();

  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState("연도");
  const [selectedMonth, setSelectedMonth] = useState("월");

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, index) => (2020 + index).toString()
  );
  const months = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월",
  ];

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

  const mockResults = Array.from({ length: 10 }, (_, i) => ({
    date: `2025/03/${20 + i}`
  }));

  return (
    <div className={styles["chathistory-container"]} ref={dropdownRef}>
      <Header title="대화 내역" showBack />

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
                className={`${styles["dropdown-item"]} ${
                  selectedYear === "연도" ? styles.selected : ""
                }`}
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
                className={`${styles["dropdown-item"]} ${
                  selectedMonth === "월" ? styles.selected : ""
                }`}
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

      <div className={styles["chathistory-list-container"]} ref={resultListRef}>
        <h2 className={styles["chathistory-list-title"]}>2025년 3월</h2>
        {mockResults.map((item, idx) => (
          <div
            key={idx}
            className={styles["chathistory-item"]}
            onClick={() => router.push(`/chat/${item.date.replaceAll("/", "-")}`)}
            style={{ cursor: "pointer" }}
          >
            <p className={styles["chathistory-item-date"]}>{item.date}</p>
          </div>
        ))}

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
