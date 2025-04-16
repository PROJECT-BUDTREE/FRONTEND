"use client";

import { usePathname } from "next/navigation";
import BottomTab from "./BottomTab";

export default function BottomLayout() {
  const pathname = usePathname();

  // 하단바를 숨기고 싶은 경로 설정
  const hiddenPaths = [
    "/",
    "/chatbot",
    "/selfcheck/result",
    "/LoginPage",
    "/signup",
    "/chatbot/endModal",
    "/diary",
    "/emotion-select",
  ];

  const shouldHide =
    hiddenPaths.includes(pathname) || pathname.startsWith("/diary/edit/");

  if (shouldHide) return null;

  return <BottomTab />;
}