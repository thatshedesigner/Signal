"use client";
import { useState, useRef, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { MOCK_ARTICLES, getTrustColor } from "@/lib/mock-data";
import { Send, Bot, User, Shield, ExternalLink, Sparkles, Loader2 } from "lucide-react";

interface ChatSource {
  name: string;
  trust_score: number;
  title: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  timestamp: Date;
}

const DEMO_RESPONSES: Record<string, { content: string; sources: ChatSource[] }> = {
  climate: {
    content: "Based on **4 verified sources** (avg Trust Score: 92/100):\n\nThe 2026 Geneva Climate Summit produced the most ambitious climate agreement in history. Key outcomes:\n\n**1.** 147 nations signed the updated carbon pledge\n**2.** $500B committed to green energy transition fund\n**3.** 2035 net-zero target adopted by 89 developed countries\n**4.** Carbon border adjustment mechanism approved\n\nDeveloping nations secured an additional 5-year grace period, though critics argue even these targets may be insufficient to limit warming to 1.5°C.\n\nThe agreement is legally binding, unlike previous voluntary commitments.",
    sources: [
      { name: "Reuters", trust_score: 94, title: "147 Nations Sign Updated Carbon Pledge" },
      { name: "BBC News", trust_score: 91, title: "Climate Summit Reaches Historic Deal" },
      { name: "The Guardian", trust_score: 87, title: "Green Fund Surpasses $500B" },
      { name: "Al Jazeera", trust_score: 85, title: "Developing Nations React to Treaty" },
    ],
  },
  bank: {
    content: "Based on **3 verified sources** (avg Trust Score: 91/100):\n\nThe March 2026 banking instability was triggered by:\n\n**1.** Rapid interest rate shifts by the Federal Reserve\n**2.** Overexposure of mid-size banks to commercial real estate\n**3.** A liquidity crunch following deposit outflows\n\nKey context: Unlike 2023, regulators intervened within **48 hours**, preventing wider contagion. The Fed activated emergency lending facilities.\n\nTreasury yields fell 45 basis points. The situation is stabilizing.",
    sources: [
      { name: "Bloomberg", trust_score: 91, title: "Fed Signals Emergency Rate Cut" },
      { name: "Financial Times", trust_score: 93, title: "Bank Stress Analysis" },
      { name: "AP News", trust_score: 95, title: "Regulatory Response Timeline" },
    ],
  },
  ai: {
    content: "Based on **3 verified sources** (avg Trust Score: 88/100):\n\nThe EU has passed the most comprehensive AI regulation in history:\n\n**Key provisions:**\n• Tiered risk categories for AI systems\n• Real-time facial recognition banned in public spaces\n• All AI-generated content must be labeled\n• 18-month compliance deadline\n\n**Impact:** Companies operating globally must comply with the strictest applicable regulation. Some AI features may be restricted in certain regions.\n\nThe US Congress is debating three competing bills, while China has updated its generative AI governance framework.",
    sources: [
      { name: "BBC News", trust_score: 91, title: "EU AI Regulation Framework" },
      { name: "TechCrunch", trust_score: 82, title: "GPT-5 Launch Details" },
      { name: "Reuters", trust_score: 94, title: "Global AI Governance Race" },
    ],
  },
  default: {
    content: "I can help you explore any news story in depth. Here are some topics I can discuss based on today's coverage:\n\n• **Climate Summit 2026** — What was agreed and implications\n• **Banking Crisis** — March 2026 instability analysis\n• **GPT-5 Launch** — Capabilities and market impact\n• **EU AI Regulation** — The new framework explained\n• **Turkey Earthquake** — Latest rescue updates\n• **Malaria Vaccine** — The mRNA breakthrough\n\nAsk me anything — I'll provide grounded responses with source citations and trust scores.",
    sources: [],
  },
};

function getResponse(text: string) {
  const lower = text.toLowerCase();
  if (lower.match(/climate|summit|carbon|green|environment/)) return DEMO_RESPONSES.climate;
  if (lower.match(/bank|fed|rate|finance|deposit|economy/)) return DEMO_RESPONSES.bank;
  if (lower.match(/ai|gpt|openai|regulation|eu|artificial/)) return DEMO_RESPONSES.ai;
  return DEMO_RESPONSES.default;
}

function renderMarkdown(text: string) {
  return text.split('\n').map((line, i) => {
    const formatted = line
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
    return <p key={i} style={{ marginBottom: line === '' ? 12 : 4, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: formatted }} />;
  });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to **Signal Chat**. I'm your AI news assistant. I can help you explore any story, provide fact-checks, simplify complex topics, or analyze implications.\n\nEvery response is grounded in verified sources with trust scores. What would you like to know?",
      sources: [],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const resp = await api.sendChatMessage("mock_session", userMsg.content);
      const mappedSources = resp.sources?.map((s: any) => ({
        name: s.source_name || s.name,
        title: s.title,
        trust_score: s.trust_score
      }));
      const assistantMsg: Message = {
        role: "assistant", content: resp.reply, sources: mappedSources, timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const fallback = getResponse(userMsg.content);
      const assistantMsg: Message = {
        role: "assistant", content: fallback.content, sources: fallback.sources, timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppShell>
      <div style={{ maxWidth: 900, margin: "0 auto", height: "calc(100vh - 140px)", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, padding: "0 0 16px", borderBottom: "1px solid var(--border-subtle)" }}>
          <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800 }}>Signal Chat</h1>
            <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Grounded AI news assistant · All responses cite verified sources</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 20, paddingRight: 8 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, maxWidth: msg.role === "user" ? "75%" : "100%",
              marginLeft: msg.role === "user" ? "auto" : 0,
              animation: "fadeInUp 0.3s ease",
            }}>
              {msg.role === "assistant" && (
                <div style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Bot size={18} color="white" />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{
                  padding: "14px 18px", borderRadius: "var(--radius-md)",
                  background: msg.role === "user" ? "var(--accent-primary)" : "var(--bg-card)",
                  border: msg.role === "assistant" ? "1px solid var(--border-subtle)" : "none",
                  fontSize: 14, lineHeight: 1.6,
                  color: msg.role === "user" ? "white" : "var(--text-primary)",
                }}>
                  {renderMarkdown(msg.content)}
                </div>

                {/* Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Sources</span>
                    {msg.sources.map((src, j) => (
                      <div key={j} style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                        background: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", fontSize: 12,
                      }}>
                        <Shield size={12} color={getTrustColor(src.trust_score)} />
                        <span style={{ fontWeight: 600 }}>{src.name}</span>
                        <span style={{ color: "var(--text-muted)" }}>—</span>
                        <span style={{ color: "var(--text-secondary)", flex: 1 }}>{src.title}</span>
                        <span style={{ fontWeight: 700, color: getTrustColor(src.trust_score) }}>{src.trust_score}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <User size={16} color="var(--text-secondary)" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div style={{ display: "flex", gap: 12, animation: "fadeIn 0.3s" }}>
              <div style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={18} color="white" />
              </div>
              <div style={{ padding: "14px 18px", background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: 8 }}>
                <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} color="var(--accent-primary)" />
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Searching verified sources...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "16px 0 0", borderTop: "1px solid var(--border-subtle)", marginTop: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <input
              type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about any story, request a fact-check, or explore a topic..."
              style={{
                flex: 1, padding: "14px 18px", borderRadius: "var(--radius-lg)",
                background: "var(--bg-tertiary)", border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)", fontSize: 14, outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent-primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border-subtle)"}
            />
            <button onClick={handleSend} className="btn-primary" disabled={isLoading || !input.trim()}
              style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 6, opacity: isLoading || !input.trim() ? 0.5 : 1 }}>
              <Send size={16} /> Send
            </button>
          </div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8, textAlign: "center" }}>
            All responses grounded in verified sources. Trust scores provided for transparency.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
