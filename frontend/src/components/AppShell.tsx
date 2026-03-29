"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search, Bell, User, Newspaper, TrendingUp, Play, Radio,
  MessageCircle, BookOpen, BarChart3, Menu, X, Zap, ChevronRight, Shield
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "My Signal", icon: Newspaper },
  { href: "/briefings", label: "Briefings", icon: BookOpen },
  { href: "/reels", label: "Reels", icon: Play },
  { href: "/live", label: "Live", icon: Radio },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/story-arcs", label: "Story Arcs", icon: TrendingUp },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 240 : 72,
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-subtle)",
        display: "flex", flexDirection: "column",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50,
        overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{
          padding: "20px 16px", display: "flex", alignItems: "center", gap: 12,
          borderBottom: "1px solid var(--border-subtle)"
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: "var(--radius-md)",
            background: "var(--gradient-primary)", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
          }}>
            <Zap size={22} color="white" />
          </div>
          {sidebarOpen && (
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}
                  className="gradient-text">Signal</span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            marginLeft: "auto", background: "none", border: "none", color: "var(--text-muted)",
            cursor: "pointer", padding: 4, display: "flex",
          }}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", borderRadius: "var(--radius-md)",
                background: isActive ? "rgba(99, 102, 241, 0.15)" : "transparent",
                color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                textDecoration: "none", fontSize: 14, fontWeight: isActive ? 600 : 500,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}>
                <Icon size={20} style={{ flexShrink: 0 }} />
                {sidebarOpen && item.label}
                {item.label === "Live" && (
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%", background: "var(--accent-red)",
                    marginLeft: sidebarOpen ? "auto" : 0, boxShadow: "0 0 8px rgba(239,68,68,0.6)",
                    animation: "pulse-glow 2s infinite", flexShrink: 0,
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "16px 8px", borderTop: "1px solid var(--border-subtle)" }}>
          <Link href="/profile" style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
            borderRadius: "var(--radius-md)", color: "var(--text-secondary)",
            textDecoration: "none", fontSize: 14, transition: "all 0.2s"
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <User size={16} color="white" />
            </div>
            {sidebarOpen && <span>Alex Signal</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? 240 : 72, transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        {/* Top bar */}
        <header className="glass" style={{
          position: "sticky", top: 0, zIndex: 40,
          padding: "12px 24px", display: "flex", alignItems: "center", gap: 16,
          borderBottom: "1px solid var(--border-subtle)",
        }}>
          {/* Search */}
          <div style={{
            flex: 1, maxWidth: 600, position: "relative", display: "flex", alignItems: "center",
          }}>
            <Search size={18} style={{ position: "absolute", left: 14, color: "var(--text-muted)" }} />
            <input
              type="text" placeholder="Search news, topics, journalists..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%", padding: "10px 16px 10px 42px",
                background: "var(--bg-tertiary)", border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-full)", color: "var(--text-primary)",
                fontSize: 14, outline: "none", transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent-primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border-subtle)"}
            />
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{
              position: "relative", background: "none", border: "none",
              color: "var(--text-secondary)", cursor: "pointer", padding: 8,
              borderRadius: "var(--radius-md)", transition: "all 0.2s"
            }}>
              <Bell size={20} />
              <span style={{
                position: "absolute", top: 4, right: 4,
                width: 8, height: 8, borderRadius: "50%",
                background: "var(--accent-red)", border: "2px solid var(--bg-secondary)"
              }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px",
              background: "rgba(16, 185, 129, 0.1)", borderRadius: "var(--radius-full)",
              border: "1px solid rgba(16, 185, 129, 0.2)" }}>
              <Shield size={14} color="#10b981" />
              <span style={{ fontSize: 12, color: "#10b981", fontWeight: 600 }}>Trust Mode</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
