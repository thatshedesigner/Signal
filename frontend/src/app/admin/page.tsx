"use client";
import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { Activity, Cpu, Server, Shield, CheckCircle2, Clock, BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

export default function AdminDashboardPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [agentData, metricData] = await Promise.all([
          api.getAgentStatus(),
          api.getAdminMetrics()
        ]);
        setAgents(agentData);
        setMetrics(metricData);
      } catch (e) {
        console.error("Failed to load admin data", e);
      }
    }
    loadAdminData();
  }, []);

  return (
    <AppShell>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Server size={24} color="var(--accent-red)" />
          </div>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>Signal Control Center</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Real-time telemetry and metrics for the multi-agent system lattice.</p>
          </div>
        </div>

        {/* Top-Level KPIs */}
        {metrics && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 40 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "var(--text-muted)", fontSize: 13, fontWeight: 600, textTransform: "uppercase" }}>
                <TrendingUp size={14} /> Total Articles
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)" }}>{metrics.total_articles}</div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "var(--text-muted)", fontSize: 13, fontWeight: 600, textTransform: "uppercase" }}>
                <Shield size={14} /> Avg Trust Score
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--accent-emerald)" }}>{metrics.avg_trust_score.toFixed(1)}</div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "var(--text-muted)", fontSize: 13, fontWeight: 600, textTransform: "uppercase" }}>
                <AlertTriangle size={14} /> Misinformation Stopped
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--accent-amber)" }}>{metrics.misinformation_flagged}</div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "var(--text-muted)", fontSize: 13, fontWeight: 600, textTransform: "uppercase" }}>
                <BarChart3 size={14} /> Briefings Gen
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--accent-primary)" }}>{metrics.total_briefings}</div>
            </div>
          </div>
        )}

        {/* Agent Telemetry Matrix */}
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Cpu size={20} color="var(--accent-cyan)" /> Active Agents
        </h2>
        
        <div className="card" style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--bg-tertiary)", borderBottom: "1px solid var(--border-subtle)", textAlign: "left" }}>
                <th style={{ padding: "16px 20px", fontWeight: 600, color: "var(--text-secondary)" }}>Agent Subsystem</th>
                <th style={{ padding: "16px 20px", fontWeight: 600, color: "var(--text-secondary)" }}>Status</th>
                <th style={{ padding: "16px 20px", fontWeight: 600, color: "var(--text-secondary)" }}>Last Ping</th>
                <th style={{ padding: "16px 20px", fontWeight: 600, color: "var(--text-secondary)", textAlign: "right" }}>Items Processed</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, i) => (
                <tr key={i} style={{ borderBottom: i === agents.length - 1 ? "none" : "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
                    <Activity size={16} color="var(--accent-primary)" />
                    {agent.name}
                    <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>v{agent.version}</span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span className="badge" style={{ background: "rgba(16, 185, 129, 0.15)", borderColor: "rgba(16, 185, 129, 0.3)", color: "var(--accent-emerald)" }}>
                      <CheckCircle2 size={10} /> {agent.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Clock size={12} /> {agent.last_run}
                  </td>
                  <td style={{ padding: "16px 20px", fontWeight: 700, fontFamily: "var(--font-mono)", textAlign: "right", color: "var(--text-primary)" }}>
                    {agent.items_processed.toLocaleString()}
                  </td>
                </tr>
              ))}
              {agents.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>
                    No telemetry data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
