"use client";
import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { MOCK_STORY_ARCS, getTrustColor } from "@/lib/mock-data";
import { TrendingUp, Clock, BarChart3, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

function SentimentIcon({ sentiment }: { sentiment: string }) {
  if (sentiment === "positive") return <ArrowUpRight size={14} color="var(--accent-emerald)" />;
  if (sentiment === "negative") return <ArrowDownRight size={14} color="var(--accent-red)" />;
  return <Minus size={14} color="var(--accent-amber)" />;
}

function SentimentColor(sentiment: string) {
  if (sentiment === "positive") return "var(--accent-emerald)";
  if (sentiment === "negative") return "var(--accent-red)";
  return "var(--accent-amber)";
}

export default function StoryArcsPage() {
  const [arcs, setArcs] = useState(MOCK_STORY_ARCS);

  useEffect(() => {
    api.getStoryArcs().then(setArcs).catch(console.error);
  }, []);
  return (
    <AppShell>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TrendingUp size={22} color="var(--accent-cyan)" />
          </div>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>Story Arcs</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Track evolving stories over time with AI-powered timelines and sentiment analysis</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {arcs.map((arc) => (
            <div key={arc.id} className="card" style={{ padding: 28 }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{
                      width: 10, height: 10, borderRadius: "50%",
                      background: arc.status === "developing" ? "var(--accent-amber)" : "var(--accent-emerald)",
                      boxShadow: `0 0 8px ${arc.status === "developing" ? "rgba(245,158,11,0.5)" : "rgba(16,185,129,0.5)"}`,
                    }} />
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
                      color: arc.status === "developing" ? "var(--accent-amber)" : "var(--accent-emerald)" }}>
                      {arc.status}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{arc.title}</h2>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>{arc.description}</p>
                </div>
                <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
                  <div style={{ textAlign: "center", padding: "12px 20px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }}>
                    <p style={{ fontSize: 24, fontWeight: 800, color: "var(--accent-primary)" }}>{arc.article_count}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Articles</p>
                  </div>
                  <div style={{ textAlign: "center", padding: "12px 20px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }}>
                    <p style={{ fontSize: 24, fontWeight: 800, color: "var(--accent-cyan)" }}>{arc.timeline_events.length}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Events</p>
                  </div>
                </div>
              </div>

              {/* Sentiment */}
              <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                <div style={{ padding: "10px 16px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: 8 }}>
                  <BarChart3 size={14} color="var(--text-muted)" />
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Overall:</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: SentimentColor(arc.sentiment_data.overall.includes("positive") ? "positive" : arc.sentiment_data.overall.includes("negative") ? "negative" : "neutral") }}>
                    {arc.sentiment_data.overall.replace(/_/g, " ")}
                  </span>
                </div>
                <div style={{ padding: "10px 16px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: 8 }}>
                  <TrendingUp size={14} color="var(--text-muted)" />
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Trend:</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent-emerald)" }}>
                    {arc.sentiment_data.trend}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div style={{ position: "relative", paddingLeft: 24 }}>
                {/* Vertical line */}
                <div style={{
                  position: "absolute", left: 7, top: 8, bottom: 8, width: 2,
                  background: "linear-gradient(180deg, var(--accent-primary), var(--accent-cyan))",
                  borderRadius: 1,
                }} />

                {arc.timeline_events.map((event, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < arc.timeline_events.length - 1 ? 20 : 0, position: "relative" }}>
                    {/* Dot */}
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%",
                      background: SentimentColor(event.sentiment),
                      border: "3px solid var(--bg-card)",
                      position: "absolute", left: -24, top: 4, zIndex: 1,
                      boxShadow: `0 0 8px ${SentimentColor(event.sentiment)}40`,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <Clock size={12} color="var(--text-muted)" />
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{event.date}</span>
                        <SentimentIcon sentiment={event.sentiment} />
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.5 }}>{event.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
