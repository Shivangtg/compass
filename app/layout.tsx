"use client";

import { BookOpen, Megaphone, Plus, User } from "lucide-react";
import router from "next/router";
import { Button } from "@/components/ui/button";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md bg-white px-4 py-2 rounded-full shadow-md flex items-center justify-between gap-1 border">
          {[
            { icon: BookOpen, label: "Official Docs", path: "/guide" },
            { icon: Megaphone, label: "Noticeboard", path: "/noticeboard/v1" },
            { icon: Plus, label: "Add Location", path: "/findme" },
            { icon: User, label: "Profile", path: "/profile" },
          ].map(({ icon: Icon, label, path }) => (
            <Button
              key={label}
              variant="ghost"
              className="flex flex-col items-center justify-center gap-0.5 px-1 min-w-[58px] sm:min-w-[64px]"
              onClick={() => {
                router.push(path);
                window.scrollTo(0, 0);
              }}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              <span className="text-[9px] sm:text-[11px] text-gray-600 text-center leading-tight">
                {label}
              </span>
            </Button>
          ))}
        </div>
      </body>
    </html>
  );
}
