"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(pathname || "/");

  useEffect(() => {
    setActiveTab(pathname);
    Cookies.set("activeTab", pathname, { expires: 7 });
  }, [pathname]);

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: theme === "light" ? "#f0f0f0" : "#333", color: theme === "light" ? "#000" : "#fff" }}>
      <div style={{ fontWeight: "bold", fontSize: "0.9rem", padding: "0.5rem 1rem", backgroundColor: theme === "light" ? "#e3f2fd" : "#1e3a8a", borderRadius: "20px", border: `2px solid ${theme === "light" ? "#2196f3" : "#3b82f6"}` }}>Student: 21946017</div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link href="/" onClick={() => setActiveTab("/")} style={{ padding: "0.5rem 1rem", background: activeTab === "/" ? "#0070f3" : "transparent", color: activeTab === "/" ? "#fff" : "inherit", borderRadius: "4px", textDecoration: "none" }}>Home</Link>
          <Link href="/about" onClick={() => setActiveTab("/about")} style={{ padding: "0.5rem 1rem", background: activeTab === "/about" ? "#0070f3" : "transparent", color: activeTab === "/about" ? "#fff" : "inherit", borderRadius: "4px", textDecoration: "none" }}>About</Link>
          <Link href="/docker" onClick={() => setActiveTab("/docker")} style={{ padding: "0.5rem 1rem", background: activeTab === "/docker" ? "#0070f3" : "transparent", color: activeTab === "/docker" ? "#fff" : "inherit", borderRadius: "4px", textDecoration: "none" }}>Docker</Link>
          <Link href="/prisma" onClick={() => setActiveTab("/prisma")} style={{ padding: "0.5rem 1rem", background: activeTab === "/prisma" ? "#0070f3" : "transparent", color: activeTab === "/prisma" ? "#fff" : "inherit", borderRadius: "4px", textDecoration: "none" }}>Prisma</Link>
          <Link href="/tests" onClick={() => setActiveTab("/tests")} style={{ padding: "0.5rem 1rem", background: activeTab === "/tests" ? "#0070f3" : "transparent", color: activeTab === "/tests" ? "#fff" : "inherit", borderRadius: "4px", textDecoration: "none" }}>Tests</Link>
          <Link href="/feedback" onClick={() => setActiveTab("/feedback")} style={{ padding: "0.5rem 1rem", background: activeTab === "/feedback" ? "#0070f3" : "transparent", color: activeTab === "/feedback" ? "#fff" : "inherit", borderRadius: "4px", textDecoration: "none" }}>Feedback</Link>
        </nav>
      <nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
        >
          ☰
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>Dark Mode:</span>
          <div
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{
              width: "60px",
              height: "30px",
              backgroundColor: theme === "light" ? "#ccc" : "#0070f3",
              borderRadius: "15px",
              position: "relative",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
          >
            <div
              style={{
                width: "26px",
                height: "26px",
                backgroundColor: "white",
                borderRadius: "50%",
                position: "absolute",
                top: "2px",
                left: theme === "light" ? "2px" : "32px",
                transition: "left 0.3s"
              }}
            />
          </div>
        </div>
        {isMenuOpen && (
          <ul style={{ position: "absolute", top: "60px", right: "10px", background: theme === "light" ? "#fff" : "#444", border: "none", borderRadius: "8px", padding: "0.5rem", listStyle: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: "150px", zIndex: 1000 }}>
            <li style={{ margin: "0.25rem 0" }}>
              <Link href="/" onClick={() => { setActiveTab("/"); setIsMenuOpen(false); }} style={{ display: "block", padding: "0.75rem 1rem", borderRadius: "6px", textDecoration: "none", background: activeTab === "/" ? "#0070f3" : "transparent", color: activeTab === "/" ? "#fff" : "inherit", transition: "all 0.2s" }} onMouseEnter={(e) => e.target.style.background = activeTab === "/" ? "#0070f3" : theme === "light" ? "#f5f5f5" : "#555"} onMouseLeave={(e) => e.target.style.background = activeTab === "/" ? "#0070f3" : "transparent"}>
                Home
              </Link>
            </li>
            <li style={{ margin: "0.25rem 0" }}>
              <Link href="/about" onClick={() => { setActiveTab("/about"); setIsMenuOpen(false); }} style={{ display: "block", padding: "0.75rem 1rem", borderRadius: "6px", textDecoration: "none", background: activeTab === "/about" ? "#0070f3" : "transparent", color: activeTab === "/about" ? "#fff" : "inherit", transition: "all 0.2s" }} onMouseEnter={(e) => e.target.style.background = activeTab === "/about" ? "#0070f3" : theme === "light" ? "#f5f5f5" : "#555"} onMouseLeave={(e) => e.target.style.background = activeTab === "/about" ? "#0070f3" : "transparent"}>
                About
              </Link>
            </li>
            <li style={{ margin: "0.25rem 0" }}>
              <Link href="/docker" onClick={() => { setActiveTab("/docker"); setIsMenuOpen(false); }} style={{ display: "block", padding: "0.75rem 1rem", borderRadius: "6px", textDecoration: "none", background: activeTab === "/docker" ? "#0070f3" : "transparent", color: activeTab === "/docker" ? "#fff" : "inherit", transition: "all 0.2s" }} onMouseEnter={(e) => e.target.style.background = activeTab === "/docker" ? "#0070f3" : theme === "light" ? "#f5f5f5" : "#555"} onMouseLeave={(e) => e.target.style.background = activeTab === "/docker" ? "#0070f3" : "transparent"}>
                Docker
              </Link>
            </li>
            <li style={{ margin: "0.25rem 0" }}>
              <Link href="/prisma" onClick={() => { setActiveTab("/prisma"); setIsMenuOpen(false); }} style={{ display: "block", padding: "0.75rem 1rem", borderRadius: "6px", textDecoration: "none", background: activeTab === "/prisma" ? "#0070f3" : "transparent", color: activeTab === "/prisma" ? "#fff" : "inherit", transition: "all 0.2s" }} onMouseEnter={(e) => e.target.style.background = activeTab === "/prisma" ? "#0070f3" : theme === "light" ? "#f5f5f5" : "#555"} onMouseLeave={(e) => e.target.style.background = activeTab === "/prisma" ? "#0070f3" : "transparent"}>
                Prisma
              </Link>
            </li>
            <li style={{ margin: "0.25rem 0" }}>
              <Link href="/tests" onClick={() => { setActiveTab("/tests"); setIsMenuOpen(false); }} style={{ display: "block", padding: "0.75rem 1rem", borderRadius: "6px", textDecoration: "none", background: activeTab === "/tests" ? "#0070f3" : "transparent", color: activeTab === "/tests" ? "#fff" : "inherit", transition: "all 0.2s" }} onMouseEnter={(e) => e.target.style.background = activeTab === "/tests" ? "#0070f3" : theme === "light" ? "#f5f5f5" : "#555"} onMouseLeave={(e) => e.target.style.background = activeTab === "/tests" ? "#0070f3" : "transparent"}>
                Tests
              </Link>
            </li>
            <li style={{ margin: "0.25rem 0" }}>
              <Link href="/feedback" onClick={() => { setActiveTab("/feedback"); setIsMenuOpen(false); }} style={{ display: "block", padding: "0.75rem 1rem", borderRadius: "6px", textDecoration: "none", background: activeTab === "/feedback" ? "#0070f3" : "transparent", color: activeTab === "/feedback" ? "#fff" : "inherit", transition: "all 0.2s" }} onMouseEnter={(e) => e.target.style.background = activeTab === "/feedback" ? "#0070f3" : theme === "light" ? "#f5f5f5" : "#555"} onMouseLeave={(e) => e.target.style.background = activeTab === "/feedback" ? "#0070f3" : "transparent"}>
                Feedback
              </Link>
            </li>
          </ul>
        )}
      </nav>
      </div>
    </header>
  );
}