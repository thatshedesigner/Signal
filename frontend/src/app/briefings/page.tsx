"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import AppShell from "@/components/AppShell";
import { MOCK_BRIEFINGS, getTrustColor } from "@/lib/mock-data";
import { BookOpen, Shield, ChevronDown, ChevronUp, Users, AlertTriangle, Lightbulb, CheckCircle2, Layers } from "lucide-react";

function BriefingCard({ briefing, isExpanded, onToggle }: { briefing: typeof MOCK_BRIEFINGS[0]; isExpanded: boolean; onToggle: () => void }) {
  const color = getTrustColor(briefing.trust_score);
  return (
    <div className="card" style={{ overflow: "hidden", transition: "all 0.3s ease" }}>
      {/* Header */}
      <div onClick={onToggle} style={{ padding: 24, cursor: "pointer", display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{
          width: 48, height: 48, borderRadius: "var(--radius-md)",
          background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <BookOpen size={24} color={color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="badge" style={{ background: `${color}15`, borderColor: `${color}40`, color, fontSize: 11 }}>
              <Shield size={10} /> Trust {briefing.trust_score}
            </span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{briefing.source_count} sources</span>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>{briefing.title}</h3>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>{briefing.summary}</p>
        </div>
        {isExpanded ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--border-subtle)", animation: "fadeInUp 0.3s ease" }}>
          {/* Key Facts */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <CheckCircle2 size={16} color="var(--accent-emerald)" />
              <h4 style={{ fontSize: 14, fontWeight: 700 }}>Key Facts</h4>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {briefing.key_facts.map((fact, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 12px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ color: "var(--accent-emerald)", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>#{i + 1}</span>
                  <span style={{ fontSize: 13, lineHeight: 1.5 }}>{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Perspectives */}
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Users size={16} color="var(--accent-secondary)" />
              <h4 style={{ fontSize: 14, fontWeight: 700 }}>Opposing Perspectives</h4>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ padding: 16, background: "rgba(16, 185, 129, 0.05)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-emerald)", marginBottom: 8 }}>✓ Proponents</p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{briefing.perspectives.proponents}</p>
              </div>
              <div style={{ padding: 16, background: "rgba(245, 158, 11, 0.05)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(245, 158, 11, 0.15)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-amber)", marginBottom: 8 }}>✗ Critics</p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{briefing.perspectives.critics}</p>
              </div>
            </div>
          </div>

          {/* Implications */}
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Lightbulb size={16} color="var(--accent-amber)" />
              <h4 style={{ fontSize: 14, fontWeight: 700 }}>Implications</h4>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ padding: 14, background: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-cyan)" }}>🌍 GLOBAL</span>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.5 }}>{briefing.implications.global}</p>
              </div>
              <div style={{ padding: 14, background: "rgba(99, 102, 241, 0.05)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(99, 102, 241, 0.1)" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-primary)" }}>👤 FOR YOU</span>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.5 }}>{briefing.implications.personal}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BriefingsPage() {
  const [briefings, setBriefings] = useState(MOCK_BRIEFINGS);
  const [expandedId, setExpandedId] = useState<string | null>(MOCK_BRIEFINGS[0]?.id || null);

  useEffect(() => {
    api.getBriefings().then(data => {
      setBriefings(data);
      if (data.length > 0) {
        setExpandedId(prev => prev || data[0].id);
      }
    }).catch(console.error);
  }, []);

  return (
    <AppShell>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(139, 92, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Layers size={22} color="var(--accent-secondary)" />
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>Smart Briefings</h1>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
            AI-synthesized intelligence from multiple sources. Each briefing merges coverage from verified outlets into one structured overview.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {briefings.map((briefing: any) => (
            <BriefingCard
              key={briefing.id}
              briefing={briefing}
              isExpanded={expandedId === briefing.id}
              onToggle={() => setExpandedId(expandedId === briefing.id ? null : briefing.id)}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
