import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Chris Kinsman",
  description: "Chris Kinsman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <DotPattern
            width={40}
            height={40}
            cx={1.5}
            cy={1.5}
            cr={1.5}
            className={cn(
              "[mask-image:radial-gradient(70vw_circle_at_center,white,transparent)]",
              "z-[-2]",
            )}
          />
        </div>
        <div className="max-w-screen-xl mx-auto p-4 z-40">{children}</div>
      </body>
    </html>
  );
}
