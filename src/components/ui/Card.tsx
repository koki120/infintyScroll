import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className = "", children }: Props) {
  return (
    <div className={`rounded-2xl bg-white shadow-md ${className}`}>
      {children}
    </div>
  );
}
