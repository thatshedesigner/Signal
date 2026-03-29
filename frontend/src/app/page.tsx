"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import {
  MOCK_ARTICLES, MOCK_TRENDING, MOCK_CATEGORIES, MOCK_BRIEFINGS,
  MOCK_STORY_ARCS, getTrustColor, getTrustLabel, formatTimeAgo
} from "@/lib/mock-data";
import { Shield, TrendingUp, ChevronRight, Clock, ExternalLink, Eye, BookOpen, ArrowRight } from "lucide-react";

function TrustBadge({ score }: { score: number }) {
  const color = getTrustColor(score);
  const label = getTrustLabel(score);
  return (
    <span className="badge" style={{
      background: `${color}15`, borderColor: `${color}40`, color,
    }}>
      <Shield size={12} /> {score} · {label}
    </span>
  );
}

function ArticleCard({ article, index }: { article: typeof MOCK_ARTICLES[0]; index: number }) {
  return (
    <Link href={`/story/${article.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card" style={{
        display: "flex", gap: 16, padding: 16, cursor: "pointer",
        animationDelay: `${index * 0.05}s`,
      }}>
        <img src={article.image_url} alt="" style={{
          width: 180, height: 120, objectFit: "cover",
          borderRadius: "var(--radius-sm)", flexShrink: 0,
        }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 12, fontWeight: 600, color: "var(--accent-primary)",
              padding: "2px 8px", background: "rgba(99, 102, 241, 0.1)",
              borderRadius: "var(--radius-full)",
            }}>{article.category}</span>
            <TrustBadge score={article.trust_score} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3, 
            overflow: "hidden", textOverflow: "ellipsis",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
            {article.title}
          </h3>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5,
            overflow: "hidden", textOverflow: "ellipsis",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
            {article.content}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto", fontSize: 12, color: "var(--text-muted)" }}>
            <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{article.source_name}</span>
            <span>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={12} /> {formatTimeAgo(article.published_at)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [articles, setArticles] = useState(MOCK_ARTICLES);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [trending, setTrending] = useState(MOCK_TRENDING);
  const [briefings, setBriefings] = useState(MOCK_BRIEFINGS);
  const [storyArcs, setStoryArcs] = useState(MOCK_STORY_ARCS);

  useEffect(() => {
    async function loadData() {
      try {
        const [apiArticles, apiTrending, apiCategories, apiBriefings, apiArcs] = await Promise.all([
          api.getFeed(),
          api.getTrending(),
          api.getCategories(),
          api.getBriefings(),
          api.getStoryArcs()
        ]);
        
        setArticles(apiArticles);
        setTrending(apiTrending);
        setCategories(apiCategories);
        setBriefings(apiBriefings);
        setStoryArcs(apiArcs);
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      }
    }
    loadData();
  }, []);

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <AppShell>
      <div style={{ display: "flex", gap: 24 }}>
        {/* Main feed */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Welcome */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
              Good afternoon, <span className="gradient-text">Alex</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
              Your personalized intelligence feed • {MOCK_ARTICLES.length} stories tracked
            </p>
          </div>

          {/* Category pills */}
          <div style={{
            display: "flex", gap: 8, marginBottom: 24, overflowX: "auto",
            paddingBottom: 8,
          }}>
            {MOCK_CATEGORIES.map((cat) => (
              <button key={cat.name} onClick={() => setActiveCategory(cat.name)} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: "var(--radius-full)",
                border: activeCategory === cat.name ? "1px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
                background: activeCategory === cat.name ? "rgba(99, 102, 241, 0.15)" : "var(--bg-secondary)",
                color: activeCategory === cat.name ? "var(--accent-primary)" : "var(--text-secondary)",
                fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}>
                <span>{cat.icon}</span> {cat.name}
                <span style={{ fontSize: 11, opacity: 0.7 }}>({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Articles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
            {filteredArticles.length === 0 && (
              <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>
                <p>No stories in this category yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Trending */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <TrendingUp size={18} color="var(--accent-primary)" />
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Trending Now</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {MOCK_TRENDING.slice(0, 6).map((topic, i) => (
                <div key={topic.name} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "8px 0", borderBottom: i < 5 ? "1px solid var(--border-subtle)" : "none",
                }}>
                  <span style={{
                    fontSize: 14, fontWeight: 800, color: "var(--accent-primary)",
                    width: 24, textAlign: "center",
                  }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{topic.name}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
                      {topic.count} articles · {topic.category}
                    </p>
                  </div>
                  <ChevronRight size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>

          {/* Top Briefings */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <BookOpen size={18} color="var(--accent-secondary)" />
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Top Briefings</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {MOCK_BRIEFINGS.map((briefing) => (
                <Link key={briefing.id} href={`/briefings`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{
                    padding: 12, borderRadius: "var(--radius-sm)",
                    background: "var(--bg-tertiary)", cursor: "pointer",
                    transition: "all 0.2s",
                  }}>
                    <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>{briefing.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--text-muted)" }}>
                      <TrustBadge score={briefing.trust_score} />
                      <span>{briefing.source_count} sources</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Story Arcs */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Eye size={18} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Story Arcs</h3>
            </div>
            {MOCK_STORY_ARCS.map((arc) => (
              <Link key={arc.id} href="/story-arcs" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{
                  padding: 12, borderRadius: "var(--radius-sm)",
                  background: "var(--bg-tertiary)", marginBottom: 8, cursor: "pointer",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: arc.status === "developing" ? "var(--accent-amber)" : "var(--accent-emerald)",
                    }} />
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{arc.title}</p>
                  </div>
                  <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {arc.article_count} articles · {arc.timeline_events.length} events · {arc.sentiment_data.trend}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
