// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Header from "../components/Header";
// import styles from "./diaryhistory.module.css";
// import apiRequest from "../util/reissue";

// export default function DiaryHistory() {
//   const router = useRouter();

//   const [showYearDropdown, setShowYearDropdown] = useState(false);
//   const [showMonthDropdown, setShowMonthDropdown] = useState(false);
//   const [selectedYear, setSelectedYear] = useState("연도");
//   const [selectedMonth, setSelectedMonth] = useState("월");

//   const [isAtBottom, setIsAtBottom] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const currentYear = new Date().getFullYear();
//   const years = Array.from(
//     { length: currentYear - 2020 + 1 },
//     (_, index) => (2020 + index).toString()
//   );
//   const months = [
//     "1월", "2월", "3월", "4월", "5월", "6월",
//     "7월", "8월", "9월", "10월", "11월", "12월",
//   ];

//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const diaryListRef = useRef<HTMLDivElement>(null);

//   const handleYearSelect = (year: string) => {
//     setSelectedYear(year);
//     setShowYearDropdown(false);
//   };

//   const handleMonthSelect = (month: string) => {
//     setSelectedMonth(month);
//     setShowMonthDropdown(false);
//   };

//   const scrollToTop = () => {
//     if (diaryListRef.current) {
//       diaryListRef.current.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }
//   };

//   useEffect(() => {
//     const container = diaryListRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const { scrollTop, scrollHeight, clientHeight } = container;

//       const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
//       setIsAtBottom(isBottom);

//       const scrolled = scrollTop > 0;
//       setIsScrolled(scrolled);
//     };

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className={styles["diary-container"]} ref={dropdownRef}>
//       {/* Header */}
//       <Header title="일기내역"  showBack onBack={() => router.push("/mypage")}/>

//       {/* Year & Month Selector */}
//       <div className={styles["selector-container"]}>
//         {/* Year Selector */}
//         <div className={styles["dropdown-wrapper"]}>
//           <button
//             className={`${styles["selector-button"]} ${
//               showYearDropdown ? styles.active : ""
//             }`}
//             onClick={() => {
//               setShowYearDropdown(!showYearDropdown);
//               setShowMonthDropdown(false);
//             }}
//           >
//             {selectedYear}
//             {showYearDropdown ? (
//               <ChevronUp className={styles["selector-icon"]} />
//             ) : (
//               <ChevronDown className={styles["selector-icon"]} />
//             )}
//           </button>
//           {showYearDropdown && (
//             <div className={styles.dropdown}>
//               <div
//                 className={`${styles["dropdown-item"]} ${
//                   selectedYear === "연도" ? styles.selected : ""
//                 }`}
//                 onClick={() => handleYearSelect("연도")}
//               >
//                 선택안함
//               </div>
//               {years.map((year) => (
//                 <div
//                   key={year}
//                   className={`${styles["dropdown-item"]} ${
//                     selectedYear === year ? styles.selected : ""
//                   }`}
//                   onClick={() => handleYearSelect(year)}
//                 >
//                   {year}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Month Selector */}
//         <div className={styles["dropdown-wrapper"]}>
//           <button
//             className={`${styles["selector-button"]} ${
//               showMonthDropdown ? styles.active : ""
//             }`}
//             onClick={() => {
//               setShowMonthDropdown(!showMonthDropdown);
//               setShowYearDropdown(false);
//             }}
//           >
//             {selectedMonth}
//             {showMonthDropdown ? (
//               <ChevronUp className={styles["selector-icon"]} />
//             ) : (
//               <ChevronDown className={styles["selector-icon"]} />
//             )}
//           </button>
//           {showMonthDropdown && (
//             <div className={styles.dropdown}>
//               <div
//                 className={`${styles["dropdown-item"]} ${
//                   selectedMonth === "월" ? styles.selected : ""
//                 }`}
//                 onClick={() => handleMonthSelect("월")}
//               >
//                 선택안함
//               </div>
//               {months.map((month) => (
//                 <div
//                   key={month}
//                   className={`${styles["dropdown-item"]} ${
//                     selectedMonth === month ? styles.selected : ""
//                   }`}
//                   onClick={() => handleMonthSelect(month)}
//                 >
//                   {month}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Diary List */}
//       <div className={styles["diary-list-container"]} ref={diaryListRef}>
//         <h2 className={styles["diary-list-title"]}>2025년 3월</h2>
//         {[1, 2, 3, 4, 5, 6].map((item) => (
//           <div key={item} className={styles["diary-item"]}>
//             <div className={styles["diary-item-left"]}>
//               <img
//                 src="/1.png"
//                 alt="peach"
//                 className={styles["diary-item-image"]}
//               />
//               <div className={styles["diary-item-text"]}>
//                 <p className={styles["diary-item-date"]}>2025/03/20</p>
//                 <p className={styles["diary-item-status"]}>완전 좋음</p>
//               </div>
//             </div>
//             <button
//               className={styles["diary-change-button"]}
//               onClick={() => router.push(`/diary/edit/${item}`)}
//             >
//               변경
//             </button>
//           </div>
//         ))}

//         {isScrolled && (
//           <button
//             className={`${styles["scroll-to-top-button"]} ${
//               isAtBottom ? styles["at-bottom"] : ""
//             }`}
//             onClick={scrollToTop}
//           >
//             <ChevronUp className={styles["scroll-top-icon"]} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

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
    (2020 + index).toString()
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
          setErrorMessage("해당 날짜에 작성한 일기장이 존재하지 않습니다.");
        }
      } catch (error) {
        console.error("일기장 불러오기 실패:", error);
        setDiaryList([]);
        setErrorMessage("해당 날짜에 작성한 일기장이 존재하지 않습니다.");
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
        {/* Year Selector */}
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

        {/* Month Selector */}
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

      {/* Diary List */}
      <div className={styles["diary-list-container"]} ref={diaryListRef}>
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
