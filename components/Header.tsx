"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Cookies.get("activeTab") || "/");

  useEffect(() => {
    Cookies.set("activeTab", activeTab, { expires: 7 });
  }, [activeTab]);

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: theme === "light" ? "#f0f0f0" : "#333", color: theme === "light" ? "#000" : "#fff" }}>
      <div style={{ fontWeight: "bold" }}>Student Number: 21946017</div>
      <nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
        >
          ☰
        </button>
        {isMenuOpen && (
          <ul style={{ position: "absolute", background: theme === "light" ? "#fff" : "#444", border: "1px solid #ccc", padding: "1rem", listStyle: "none" }}>
            <li>
              <Link href="/" onClick={() => { setActiveTab("/"); setIsMenuOpen(false); }}>
                Home {activeTab === "/" ? "(Active)" : ""}
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => { setActiveTab("/about"); setIsMenuOpen(false); }}>
                About {activeTab === "/about" ? "(Active)" : ""}
              </Link>
            </li>
            <li>
              <Link href="/docker" onClick={() => { setActiveTab("/docker"); setIsMenuOpen(false); }}>
                Docker {activeTab === "/docker" ? "(Active)" : ""}
              </Link>
            </li>
            <li>
              <Link href="/prisma" onClick={() => { setActiveTab("/prisma"); setIsMenuOpen(false); }}>
                Prisma {activeTab === "/prisma" ? "(Active)" : ""}
              </Link>
            </li>
            <li>
              <Link href="/tests" onClick={() => { setActiveTab("/tests"); setIsMenuOpen(false); }}>
                Tests {activeTab === "/tests" ? "(Active)" : ""}
              </Link>
            </li>
          </ul>
        )}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          style={{ marginLeft: "1rem", padding: "0.5rem", background: theme === "light" ? "#ddd" : "#555", color: theme === "light" ? "#000" : "#fff" }}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>
    </header>
  );
}