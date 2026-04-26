"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/getting-started", label: "Get Started" },
  { href: "/accounts", label: "Accounts" },
  { href: "/identity", label: "Identity" },
  { href: "/payments", label: "Payments" },
  { href: "/data", label: "Data" },
  { href: "/core", label: "Core" },
  { href: "/cli", label: "CLI" },
  { href: "/examples", label: "Examples" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.2s",
        background: scrolled
          ? "rgba(6, 9, 15, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(148, 163, 184, 0.08)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", height: 60, gap: 32 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 30,
              height: 30,
              background: "linear-gradient(135deg, #fbbf24, #d97706)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 13,
              color: "#06090f",
            }}>
              A3
            </div>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
            }}>
              A3Stack
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#fbbf24",
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.2)",
              padding: "1px 6px",
              borderRadius: 4,
              letterSpacing: "0.04em",
            }}>
              v0.2
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4 }}>
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    color: active ? "#fbbf24" : "#94a3b8",
                    background: active ? "rgba(251,191,36,0.08)" : "transparent",
                    transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="https://github.com/arcabotai/a3stack"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#64748b", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fbbf24"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#64748b"}
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.npmjs.com/package/a3stack"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                background: "#fbbf24",
                color: "#06090f",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "'Syne', sans-serif",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#fcd34d"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#fbbf24"}
            >
              npm install
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
