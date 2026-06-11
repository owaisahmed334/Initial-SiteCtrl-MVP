import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiteCtrl — Control, Monitor & Protect Your Websites",
  description: "Website monitoring, renewal tracking, SSL alerts, PageSpeed reports and security notifications.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
