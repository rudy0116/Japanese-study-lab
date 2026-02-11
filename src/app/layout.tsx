import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "日本留学透明平台",
  description: "极致透明的日本留学信息平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
