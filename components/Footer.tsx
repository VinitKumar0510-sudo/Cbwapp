// components/Footer.tsx
"use client";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";

export default function Footer() {
  const { theme } = useTheme();
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US'));
  }, []);

  return (
    <footer style={{ padding: "1rem", textAlign: "center", background: theme === "light" ? "#f0f0f0" : "#333", color: theme === "light" ? "#000" : "#fff" }}>
      <p>&copy; {new Date().getFullYear()} Vinit Kumar | Student Number: 21946017 | Date: {date}</p>
    </footer>
  );
}