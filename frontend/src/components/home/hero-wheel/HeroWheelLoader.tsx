"use client";

import dynamic from "next/dynamic";

const DesktopHeroWheel = dynamic(
  () => import("./DesktopHeroWheel"),
  { ssr: false, loading: () => null }
);

export default function HeroWheelLoader() {
  return <DesktopHeroWheel />;
}
