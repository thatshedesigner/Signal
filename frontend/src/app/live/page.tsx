"use client";
import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { MOCK_LIVE_STREAMS } from "@/lib/mock-data";
import { Radio, Users, AlertCircle, Play, CheckCircle2, Clock, Zap } from "lucide-react";

export default function LivePage() {
  const [streams, setStreams] = useState(MOCK_LIVE_STREAMS);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  useEffect(() => {
    api.getLiveStreams().then(setStreams).catch(console.error);
  }, []);

  const active = selectedStream ? streams.find(s => s.id === selectedStream) : null;

  return (
    <AppShell>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Radio size={22} color="var(--accent-red)" />
          </div>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, display: "flex", alignItems: "center", gap: 10 }}>
              Live News Hub
              <span className="live-dot" />
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              {streams.filter(s => s.is_active).length} streams active · AI-powered summaries & fact-checks
            </p>
          </div>
        </div>

        {/* Selected stream player */}
        {active && (
          <div className="card" style={{ marginBottom: 24, overflow: "hidden", animation: "fadeInUp 0.3s ease" }}>
            <div style={{ display: "flex", gap: 0 }}>
              {/* Video */}
              <div style={{ flex: 1, position: "relative", aspectRatio: "16/9", background: "#000", minHeight: 400 }}>
                <img src={active.thumbnail_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Play size={32} fill="white" color="white" />
                  </div>
                </div>
                <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8 }}>
                  {active.is_active && (
                    <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "rgba(239, 68, 68, 0.9)", borderRadius: "var(--radius-full)", fontSize: 12, fontWeight: 700, color: "white" }}>
                      <span className="live-dot" style={{ width: 6, height: 6 }} /> LIVE
                    </span>
                  )}
                  <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 14px", background: "rgba(0,0,0,0.6)", borderRadius: "var(--radius-full)", fontSize: 12, color: "white", backdropFilter: "blur(10px)" }}>
                    <Users size={12} /> {active.viewer_count.toLocaleString()} watching
                  </span>
                </div>
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "white" }}>{active.title}</h2>
                </div>
              </div>

              {/* AI Summary sidebar */}
              <div style={{ width: 360, background: "var(--bg-secondary)", borderLeft: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 8 }}>
                  <Zap size={16} color="var(--accent-primary)" />
                  <h3 style={{ fontSize: 14, fontWeight: 700 }}>AI Live Summary</h3>
                </div>
                <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                  {active.ai_summaries?.map((summary: { time: string; text: string }, i: number) => (
                    <div key={i} style={{ padding: 14, background: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--accent-primary)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <Clock size={12} color="var(--accent-primary)" />
                        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--accent-primary)" }}>{summary.time}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{summary.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stream grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340, 1fr))", gap: 16 }}>
          {streams.map((stream) => (
            <div key={stream.id} className="card" onClick={() => setSelectedStream(stream.id)}
              style={{ cursor: "pointer", overflow: "hidden", border: selectedStream === stream.id ? "1px solid var(--accent-primary)" : undefined }}>
              <div style={{ position: "relative", height: 200 }}>
                <img src={stream.thumbnail_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(0,0,0,0.8))" }} />
                {stream.is_active ? (
                  <span style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(239,68,68,0.9)", borderRadius: "var(--radius-full)", fontSize: 11, fontWeight: 700, color: "white" }}>
                    <span className="live-dot" style={{ width: 6, height: 6 }} /> LIVE
                  </span>
                ) : (
                  <span style={{ position: "absolute", top: 12, left: 12, padding: "4px 12px", background: "rgba(0,0,0,0.6)", borderRadius: "var(--radius-full)", fontSize: 11, color: "var(--text-muted)" }}>
                    Ended
                  </span>
                )}
                <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{stream.title}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                    <Users size={12} /> {stream.viewer_count.toLocaleString()} viewers
                    <span>·</span>
                    <span>{stream.ai_summaries?.length || 0} AI updates</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
