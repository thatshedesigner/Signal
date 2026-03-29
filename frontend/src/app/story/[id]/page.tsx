"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { MOCK_ARTICLES, getTrustColor, getTrustLabel, formatTimeAgo } from "@/lib/mock-data";
import { Shield, ArrowLeft, ExternalLink, Clock, BarChart3, CheckCircle2, AlertTriangle, MessageCircle, ChevronRight } from "lucide-react";

function TrustGauge({ score }: { score: number }) {
  const color = getTrustColor(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  return (
    <div style={{ position: "relative", width: 120, height: 120 }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="45" fill="none" stroke="var(--bg-tertiary)" strokeWidth="8" />
        <circle cx="60" cy="60" r="45" fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 60 60)" style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 28, fontWeight: 800, color }}>{score}</span>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{getTrustLabel(score)}</span>
      </div>
    </div>
  );
}

function CredibilityBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
      <span style={{ width: 140, color: "var(--text-secondary)", flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 6, background: "var(--bg-tertiary)", borderRadius: 3 }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 3, transition: "width 1s ease" }} />
      </div>
      <span style={{ fontWeight: 600, color, width: 36, textAlign: "right" }}>{value}</span>
    </div>
  );
}

export default function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [article, setArticle] = useState(() => MOCK_ARTICLES.find(a => a.id === id));
  const [related, setRelated] = useState(() => MOCK_ARTICLES.filter(a => a.id !== id && a.category === article?.category).slice(0, 3));

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const [apiArticle, apiRelated] = await Promise.all([
          api.getStory(id),
          api.getRelated(id)
        ]);
        if (apiArticle) setArticle(apiArticle);
        if (apiRelated) setRelated(apiRelated);
      } catch (error) {
        console.error("Failed to fetch story details", error);
      }
    }
    load();
  }, [id]);

  if (!article) {
    return <AppShell><div style={{ textAlign: "center", padding: 80, color: "var(--text-muted)" }}>Story not found</div></AppShell>;
  }

  const cred = article.credibility_details;

  return (
    <AppShell>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Back */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", textDecoration: "none", fontSize: 14, marginBottom: 20 }}>
          <ArrowLeft size={16} /> Back to Feed
        </Link>

        <div style={{ display: "flex", gap: 24 }}>
          {/* Article */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent-primary)", padding: "4px 12px", background: "rgba(99,102,241,0.1)", borderRadius: "var(--radius-full)" }}>{article.category}</span>
            <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, margin: "16px 0" }}>{article.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, fontSize: 14, color: "var(--text-secondary)" }}>
              <span style={{ fontWeight: 600 }}>{article.source_name}</span>
              <span>·</span>
              <Clock size={14} /> {formatTimeAgo(article.published_at)}
              <a href={article.image_url} target="_blank" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, color: "var(--accent-primary)", textDecoration: "none", fontSize: 13 }}>
                Original <ExternalLink size={12} />
              </a>
            </div>
            <img src={article.image_url} alt="" style={{ width: "100%", height: 360, objectFit: "cover", borderRadius: "var(--radius-md)", marginBottom: 24 }} />
            <div style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-secondary)" }}>
              {article.content}
            </div>

            {/* Chat CTA */}
            <div className="card" style={{ marginTop: 32, padding: 20, display: "flex", alignItems: "center", gap: 16, background: "rgba(99, 102, 241, 0.05)", borderColor: "rgba(99,102,241,0.2)" }}>
              <MessageCircle size={24} color="var(--accent-primary)" />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 15 }}>Have questions about this story?</p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Chat with Signal AI for deeper analysis, impact assessment, or fact-checks.</p>
              </div>
              <Link href="/chat" className="btn-primary" style={{ textDecoration: "none" }}>Ask Signal</Link>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Related Stories</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
                  {related.map(r => (
                    <Link key={r.id} href={`/story/${r.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div className="card" style={{ padding: 12 }}>
                        <img src={r.image_url} alt="" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: "var(--radius-sm)", marginBottom: 8 }} />
                        <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{r.title}</p>
                        <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{r.source_name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Credibility Sidebar */}
          <div style={{ width: 320, flexShrink: 0 }}>
            <div className="card" style={{ padding: 24, position: "sticky", top: 80 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <Shield size={20} color="var(--accent-primary)" />
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>Credibility Panel</h3>
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <TrustGauge score={article.trust_score} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                <CredibilityBar label="Source Reliability" value={cred.source_reliability} color={getTrustColor(cred.source_reliability)} />
                <CredibilityBar label="Cross-Source Agree" value={cred.cross_source_agreement} color={getTrustColor(cred.cross_source_agreement)} />
                <CredibilityBar label="Verifiable Data" value={cred.verifiable_data} color={getTrustColor(cred.verifiable_data)} />
                <CredibilityBar label="Low Bias" value={100 - cred.bias_score} color={getTrustColor(100 - cred.bias_score)} />
              </div>

              {/* Reasoning */}
              <div style={{ padding: 16, background: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--accent-primary)", marginBottom: 8 }}>
                  <CheckCircle2 size={14} style={{ verticalAlign: "middle", marginRight: 4 }} />
                  Why This Score?
                </p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {cred.reasoning}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
