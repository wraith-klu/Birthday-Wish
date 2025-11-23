import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "A Birthday For Her",
  description: "A romantic animated birthday site",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
