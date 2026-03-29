import { MOCK_ARTICLES, MOCK_BRIEFINGS, MOCK_REELS, MOCK_LIVE_STREAMS, MOCK_STORY_ARCS } from "./mock-data";

// Fallback Mock Data for Admin Metrics
const MOCK_AGENT_STATUS = [
  {"name": "Ingestion Agent", "status": "active", "version": "1.0.0", "last_run": "2 min ago", "items_processed": 1247},
  {"name": "Credibility Agent", "status": "active", "version": "1.0.0", "last_run": "3 min ago", "items_processed": 1180},
  {"name": "Synthesis Agent", "status": "active", "version": "1.0.0", "last_run": "5 min ago", "items_processed": 89},
  {"name": "Personalization Agent", "status": "active", "version": "1.0.0", "last_run": "1 min ago", "items_processed": 3420},
  {"name": "Content Generation Agent", "status": "active", "version": "1.0.0", "last_run": "10 min ago", "items_processed": 67},
  {"name": "Video Intelligence Agent", "status": "active", "version": "1.0.0", "last_run": "4 min ago", "items_processed": 234},
  {"name": "Live Broadcast Agent", "status": "active", "version": "1.0.0", "last_run": "30 sec ago", "items_processed": 18},
  {"name": "Interaction Agent", "status": "active", "version": "1.0.0", "last_run": "1 min ago", "items_processed": 567},
  {"name": "Moderation Agent", "status": "active", "version": "1.0.0", "last_run": "2 min ago", "items_processed": 890},
  {"name": "Learning Agent", "status": "active", "version": "1.0.0", "last_run": "1 hour ago", "items_processed": 12},
];

const MOCK_ADMIN_METRICS = {
  "total_articles": 24,
  "total_briefings": 2,
  "total_reels": 3,
  "active_streams": 2,
  "story_arcs": 3,
  "avg_trust_score": 93.4,
  "misinformation_flagged": 23,
  "user_sessions_today": 1847,
  "avg_engagement_min": 8.4,
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchAPI<T>(endpoint: string, fallbackData: T, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      ...options,
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`[API Fallback] Fetch failed for ${endpoint}. Serving mock data.`);
    return fallbackData;
  }
}

export const api = {
  // Feed
  getFeed: (category?: string) => fetchAPI(`/feed${category ? `?category=${category}` : ''}`, MOCK_ARTICLES),
  getTrending: () => fetchAPI('/feed/trending', []),
  getCategories: () => fetchAPI('/feed/categories', []),

  // Stories
  getStory: (id: string) => fetchAPI(`/stories/${id}`, MOCK_ARTICLES.find(a => a.id === id) || MOCK_ARTICLES[0]),
  getRelated: (id: string, limit = 3) => 
    fetchAPI<any[]>(`/stories/${id}/related?limit=${limit}`, MOCK_ARTICLES.filter(a => a.id !== id).slice(0, limit)),
    
  getAgentStatus: () =>
    fetchAPI<any>('/admin/agents/status', { agents: MOCK_AGENT_STATUS }).then(res => res.agents || MOCK_AGENT_STATUS),

  getAdminMetrics: () =>
    fetchAPI<any>('/admin/metrics', { metrics: MOCK_ADMIN_METRICS }).then(res => res.metrics || MOCK_ADMIN_METRICS),
  searchStories: (q: string) => fetchAPI(`/stories/search/query?q=${encodeURIComponent(q)}`, MOCK_ARTICLES),

  // Briefings
  getBriefings: () => fetchAPI('/briefings', MOCK_BRIEFINGS),
  getBriefing: (id: string) => fetchAPI(`/briefings/${id}`, MOCK_BRIEFINGS.find(b => b.id === id) || MOCK_BRIEFINGS[0]),

  // Reels
  getReels: () => fetchAPI('/reels/feed', MOCK_REELS),
  getReel: (id: string) => fetchAPI(`/reels/${id}`, MOCK_REELS.find(r => r.id === id) || MOCK_REELS[0]),
  trackReelInteraction: (id: string, action: string) =>
    fetchAPI(`/reels/${id}/interaction`, { success: true }, { method: 'POST', body: JSON.stringify({ action }) }),

  // Live
  getLiveStreams: () => fetchAPI('/live/streams', MOCK_LIVE_STREAMS),
  getLiveStream: (id: string) => fetchAPI(`/live/${id}`, MOCK_LIVE_STREAMS.find(l => l.id === id) || MOCK_LIVE_STREAMS[0]),

  // Chat
  createChatSession: () => fetchAPI('/chat/sessions', { session_id: "mock_session", messages: [] }, { method: 'POST' }),
  sendChatMessage: (sessionId: string, message: string) =>
    fetchAPI(`/chat/sessions/${sessionId}/message`, 
      { reply: "This is a mock response from the interactive news agent. Start the backend to converse properly!", sources: MOCK_ARTICLES.slice(0, 2) },
      { method: 'POST', body: JSON.stringify({ message }) }
    ),
  getChatSession: (sessionId: string) => fetchAPI(`/chat/sessions/${sessionId}`, { session_id: sessionId, messages: [] }),

  // User
  getProfile: () => fetchAPI('/users/me', { id: "user_1", name: "Alex" }),
  getInteractions: () => fetchAPI('/users/me/interactions', []),

  // Admin
  getStoryArcs: () => fetchAPI('/admin/story-arcs', MOCK_STORY_ARCS),
};
