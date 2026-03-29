"use client";
import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { MOCK_REELS, getTrustColor, formatViews } from "@/lib/mock-data";
import { Play, Heart, Share2, MessageCircle, Shield, ChevronUp, ChevronDown, Eye, Clock, User, BarChart3 } from "lucide-react";

export default function ReelsPage() {
  const [reels, setReels] = useState(MOCK_REELS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  useEffect(() => {
    api.getReels().then(setReels).catch(console.error);
  }, []);

  const reel = reels[currentIndex];
  const trustColor = reel ? getTrustColor(reel.credibility_score) : "#fff";

  const goNext = () => setCurrentIndex(Math.min(currentIndex + 1, reels.length - 1));
  const goPrev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));

  return (
    <AppShell>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 140px)" }}>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {/* Reel player */}
          <div style={{
            width: 380, height: 680, borderRadius: "var(--radius-lg)",
            overflow: "hidden", position: "relative",
            background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}>
            {/* Video / Thumbnail */}
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <img src={reel.thumbnail_url} alt="" style={{
                width: "100%", height: "100%", objectFit: "cover",
              }} />
              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(transparent 30%, rgba(0,0,0,0.8) 100%)",
              }} />
              {/* Play button */}
              <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.3s",
              }}>
                <Play size={28} fill="white" color="white" />
              </div>

              {/* Top bar */}
              <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "white", padding: "4px 12px", background: "rgba(0,0,0,0.4)", borderRadius: "var(--radius-full)", backdropFilter: "blur(10px)" }}>
                  Signal Reels
                </span>
                <span className="badge" style={{ background: `${trustColor}20`, borderColor: `${trustColor}50`, color: trustColor, backdropFilter: "blur(10px)" }}>
                  <Shield size={10} /> {reel.credibility_score}
                </span>
              </div>

              {/* Bottom info */}
              <div style={{ position: "absolute", bottom: 20, left: 16, right: 60 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <User size={16} color="white" />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{reel.journalist_name}</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "white", lineHeight: 1.3, marginBottom: 8 }}>{reel.title}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {reel.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", padding: "2px 8px", background: "rgba(255,255,255,0.15)", borderRadius: "var(--radius-full)" }}>#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Side actions */}
              <div style={{ position: "absolute", right: 12, bottom: 20, display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
                <button onClick={() => { const s = new Set(liked); s.has(reel.id) ? s.delete(reel.id) : s.add(reel.id); setLiked(s); }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}>
                  <Heart size={26} color="white" fill={liked.has(reel.id) ? "#f43f5e" : "transparent"} style={{ transition: "all 0.2s" }} />
                  <span style={{ fontSize: 11, color: "white", fontWeight: 600 }}>{formatViews(reel.views)}</span>
                </button>
                <button style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}>
                  <MessageCircle size={24} color="white" />
                  <span style={{ fontSize: 11, color: "white" }}>Chat</span>
                </button>
                <button style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}>
                  <Share2 size={24} color="white" />
                  <span style={{ fontSize: 11, color: "white" }}>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation + details */}
          <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Nav buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              <button disabled={currentIndex === 0} onClick={goPrev} className="btn-secondary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, opacity: currentIndex === 0 ? 0.5 : 1 }}>
                <ChevronUp size={16} /> Previous
              </button>
              <button disabled={currentIndex === MOCK_REELS.length - 1} onClick={goNext} className="btn-primary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, opacity: currentIndex === MOCK_REELS.length - 1 ? 0.5 : 1 }}>
                Next <ChevronDown size={16} />
              </button>
            </div>

            {/* Stats */}
            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Engagement</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6 }}><Eye size={14} /> Views</span>
                  <span style={{ fontWeight: 700 }}>{formatViews(reel.views)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6 }}><Clock size={14} /> Duration</span>
                  <span style={{ fontWeight: 700 }}>{reel.duration_sec}s</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6 }}><BarChart3 size={14} /> Avg. Watch</span>
                  <span style={{ fontWeight: 700, color: getTrustColor(reel.avg_watch_pct) }}>{reel.avg_watch_pct}%</span>
                </div>
              </div>
            </div>

            {/* Reel list */}
            <div className="card" style={{ padding: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "var(--text-muted)" }}>Up Next</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {MOCK_REELS.map((r, i) => (
                  <div key={r.id} onClick={() => setCurrentIndex(i)} style={{
                    display: "flex", gap: 10, padding: 8, borderRadius: "var(--radius-sm)",
                    background: i === currentIndex ? "rgba(99, 102, 241, 0.1)" : "transparent",
                    border: i === currentIndex ? "1px solid rgba(99, 102, 241, 0.2)" : "1px solid transparent",
                    cursor: "pointer", transition: "all 0.2s",
                  }}>
                    <img src={r.thumbnail_url} alt="" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</p>
                      <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.journalist_name} · {r.duration_sec}s</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
