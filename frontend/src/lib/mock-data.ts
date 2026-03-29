// Mock data for standalone frontend operation (no backend needed)
export const MOCK_SOURCES = [
  { id: "s1", name: "Reuters", reliability_score: 94 },
  { id: "s2", name: "Associated Press", reliability_score: 93 },
  { id: "s3", name: "BBC News", reliability_score: 91 },
  { id: "s4", name: "Al Jazeera", reliability_score: 85 },
  { id: "s5", name: "Bloomberg", reliability_score: 90 },
  { id: "s6", name: "The Guardian", reliability_score: 87 },
  { id: "s7", name: "TechCrunch", reliability_score: 82 },
  { id: "s8", name: "Nature", reliability_score: 96 },
  { id: "s9", name: "Financial Times", reliability_score: 91 },
  { id: "s10", name: "NPR", reliability_score: 89 },
];

export const MOCK_ARTICLES = [
  {
    id: "a1", title: "Global Climate Summit 2026: 147 Nations Sign Updated Carbon Pledge",
    content: "World leaders gathered in Geneva have reached a landmark agreement on carbon emissions. The updated pledge commits 147 nations to accelerating their transition to renewable energy sources, with a new target of net-zero emissions by 2035 for developed nations. The agreement includes a $500 billion green energy transition fund, marking the largest climate finance commitment in history. Environmental groups have praised the binding nature of the commitments, while developing nations argue the timeline remains unrealistic given their industrialization needs.",
    source_name: "Reuters", source_reliability: 94, category: "Climate",
    image_url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800",
    trust_score: 94, published_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    credibility_details: { source_reliability: 94, cross_source_agreement: 91, verifiable_data: 96, bias_score: 8, reasoning: "Reuters has a strong track record of factual reporting. This story is corroborated by 6 other major outlets. Contains specific verifiable data points." },
  },
  {
    id: "a2", title: "Federal Reserve Signals Emergency Rate Cut Amid Banking Instability",
    content: "The Federal Reserve has signaled it may implement an emergency interest rate cut following instability at several mid-size regional banks. Three banks reported significant deposit outflows this week, raising concerns about a broader liquidity crisis. Unlike the 2023 banking turbulence, regulators moved within 48 hours to provide emergency lending facilities.",
    source_name: "Bloomberg", source_reliability: 90, category: "Finance",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    trust_score: 91, published_at: new Date(Date.now() - 4 * 3600000).toISOString(),
    credibility_details: { source_reliability: 90, cross_source_agreement: 88, verifiable_data: 93, bias_score: 12, reasoning: "Bloomberg's financial reporting is highly reliable. Fed statements are publicly verifiable." },
  },
  {
    id: "a3", title: "OpenAI Unveils GPT-5 with Real-Time Multimodal Reasoning",
    content: "OpenAI has officially launched GPT-5, its most advanced AI model to date, featuring real-time multimodal reasoning across text, images, audio, and video. The model demonstrates significant improvements in mathematical reasoning, code generation, and factual accuracy, with hallucination rates reduced by 80% compared to GPT-4.",
    source_name: "TechCrunch", source_reliability: 82, category: "Technology",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    trust_score: 86, published_at: new Date(Date.now() - 6 * 3600000).toISOString(),
    credibility_details: { source_reliability: 82, cross_source_agreement: 79, verifiable_data: 84, bias_score: 22, reasoning: "TechCrunch has good tech coverage but occasionally reflects industry hype." },
  },
  {
    id: "a4", title: "Breakthrough mRNA Vaccine Shows 94% Efficacy Against Resistant Malaria",
    content: "Researchers at Oxford University have published Phase III trial results for an mRNA-based malaria vaccine, showing 94% efficacy against the drug-resistant P. falciparum strain devastating sub-Saharan Africa. The trial involved 12,000 participants across seven countries. WHO officials called it 'potentially the most significant public health breakthrough of the decade.'",
    source_name: "Nature", source_reliability: 96, category: "Health",
    image_url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800",
    trust_score: 97, published_at: new Date(Date.now() - 8 * 3600000).toISOString(),
    credibility_details: { source_reliability: 96, cross_source_agreement: 94, verifiable_data: 98, bias_score: 3, reasoning: "Nature is a top-tier peer-reviewed journal. Phase III trial data is publicly registered." },
  },
  {
    id: "a5", title: "EU Parliament Passes Landmark AI Regulation Framework",
    content: "The European Parliament has passed the world's most comprehensive AI regulation framework with a decisive 521-73 vote. The legislation establishes tiered risk categories for AI systems, bans real-time facial recognition in public spaces, and requires all AI-generated content to be labeled.",
    source_name: "BBC News", source_reliability: 91, category: "Politics",
    image_url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    trust_score: 92, published_at: new Date(Date.now() - 10 * 3600000).toISOString(),
    credibility_details: { source_reliability: 91, cross_source_agreement: 93, verifiable_data: 95, bias_score: 10, reasoning: "BBC provides balanced political reporting. Vote counts are public record." },
  },
  {
    id: "a6", title: "India's Chandrayaan-4 Successfully Lands on Lunar South Pole",
    content: "India's space agency ISRO has successfully landed the Chandrayaan-4 rover on the Moon's south pole, becoming the first mission to collect and store samples from the permanently shadowed craters believed to contain water ice.",
    source_name: "Al Jazeera", source_reliability: 85, category: "Science",
    image_url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
    trust_score: 88, published_at: new Date(Date.now() - 12 * 3600000).toISOString(),
    credibility_details: { source_reliability: 85, cross_source_agreement: 90, verifiable_data: 91, bias_score: 11, reasoning: "ISRO mission data is publicly tracked. Multiple space agencies confirm the landing." },
  },
  {
    id: "a7", title: "Global Semiconductor Shortage Eases as New TSMC Fab Begins Production",
    content: "TSMC's new $40 billion fabrication plant in Arizona has begun commercial production of 3nm chips, marking a significant step toward easing the global semiconductor shortage.",
    source_name: "The Guardian", source_reliability: 87, category: "Technology",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    trust_score: 85, published_at: new Date(Date.now() - 14 * 3600000).toISOString(),
    credibility_details: { source_reliability: 87, cross_source_agreement: 84, verifiable_data: 88, bias_score: 14, reasoning: "Production figures cited from TSMC investor relations." },
  },
  {
    id: "a8", title: "Japan's Economy Enters Strongest Growth Phase in Three Decades",
    content: "Japan's GDP grew at an annualized rate of 4.2% in Q1 2026, marking the strongest quarterly growth in 30 years. The surge is driven by a weakened yen boosting exports, significant corporate governance reforms attracting foreign investment.",
    source_name: "Financial Times", source_reliability: 91, category: "Finance",
    image_url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
    trust_score: 93, published_at: new Date(Date.now() - 16 * 3600000).toISOString(),
    credibility_details: { source_reliability: 91, cross_source_agreement: 92, verifiable_data: 95, bias_score: 7, reasoning: "GDP figures are from official Japanese government data." },
  },
  {
    id: "a9", title: "Massive Earthquake Strikes Central Turkey, Rescue Operations Underway",
    content: "A 7.1 magnitude earthquake struck central Turkey early this morning, causing significant damage in Konya. At least 230 people are confirmed dead with over 1,800 injured. Turkish authorities have declared a national emergency.",
    source_name: "Associated Press", source_reliability: 93, category: "World",
    image_url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800",
    trust_score: 95, published_at: new Date(Date.now() - 1 * 3600000).toISOString(),
    credibility_details: { source_reliability: 93, cross_source_agreement: 96, verifiable_data: 97, bias_score: 4, reasoning: "AP has reporters on the ground. Seismic data independently verified by USGS." },
  },
  {
    id: "a10", title: "Spotify Acquires Major Podcast Network, Signals Audio AI Ambitions",
    content: "Spotify has acquired Wondery-rival podcast network AudioBoom for $1.2 billion, its largest acquisition since the Joe Rogan deal. The move signals Spotify's pivot toward AI-generated audio content.",
    source_name: "NPR", source_reliability: 89, category: "Entertainment",
    image_url: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800",
    trust_score: 81, published_at: new Date(Date.now() - 18 * 3600000).toISOString(),
    credibility_details: { source_reliability: 89, cross_source_agreement: 78, verifiable_data: 82, bias_score: 18, reasoning: "Acquisition details from SEC filings. AI product roadmap claims need independent verification." },
  },
];

export const MOCK_BRIEFINGS = [
  {
    id: "b1", title: "Global Climate Summit 2026: Key Outcomes & Implications",
    summary: "World leaders at the Geneva Climate Summit reached a historic agreement committing 147 nations to accelerated carbon reduction targets. The deal includes a $500B green energy transition fund and a 2035 net-zero target for developed nations.",
    key_facts: ["147 nations signed the updated carbon pledge", "$500B committed to green energy transition fund", "2035 net-zero target adopted by 89 developed countries", "Developing nations secured additional 5-year grace period", "Carbon border adjustment mechanism approved"],
    perspectives: { proponents: "Environmental groups praise the binding commitments as 'the most ambitious climate action in history.'", critics: "Developing nations argue the timeline is unrealistic. Industry groups warn of $2.3 trillion in transition costs." },
    implications: { global: "Major restructuring of global supply chains expected. Clean energy sector projected to grow 340% by 2030.", personal: "Insurance premiums, energy costs, and investment landscapes will shift significantly." },
    topic_cluster: "climate", trust_score: 92, source_count: 7,
  },
  {
    id: "b2", title: "The AI Regulation Race: How Governments Are Responding",
    summary: "A comprehensive look at how major governments are approaching AI regulation in 2026, from the EU's landmark framework to ongoing debates in the US Congress.",
    key_facts: ["EU passed comprehensive AI Act with 521-73 vote", "Real-time facial recognition banned in EU public spaces", "US Congress debating three competing AI bills", "China updated its AI governance framework", "18-month compliance deadline for EU regulations"],
    perspectives: { proponents: "Privacy advocates see the EU framework as a global template.", critics: "Tech companies warn of innovation flight from regulated markets." },
    implications: { global: "Companies operating globally must comply with the strictest applicable regulation.", personal: "AI labeling requirements will change how you consume content." },
    topic_cluster: "ai-regulation", trust_score: 89, source_count: 5,
  },
  {
    id: "b3", title: "Banking Stability Watch: March 2026 Crisis Analysis",
    summary: "Analysis of the March 2026 banking instability, comparing it to the 2023 crisis and assessing systemic risk.",
    key_facts: ["Three mid-size banks reported significant deposit outflows", "Fed signaled emergency rate cut within 48 hours", "Emergency lending facilities activated faster than 2023", "Treasury yields fell 45 basis points", "Contagion contained to regional banking sector"],
    perspectives: { proponents: "Regulators argue swift action prevented a repeat of 2023.", critics: "Critics say underlying issues remain unresolved. Moral hazard concerns grow." },
    implications: { global: "Regional bank consolidation likely to accelerate.", personal: "Savings rates may increase as banks compete for deposits." },
    topic_cluster: "finance", trust_score: 90, source_count: 6,
  },
];

export const MOCK_REELS = [
  { id: "r1", journalist_name: "Sarah Chen", title: "Inside the Climate Summit: What They're Not Telling You", thumbnail_url: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400", tags: ["climate", "geneva"], credibility_score: 88, views: 245000, avg_watch_pct: 78.5, duration_sec: 62 },
  { id: "r2", journalist_name: "Marcus Williams", title: "The Bank Run Nobody Saw Coming", thumbnail_url: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=400", tags: ["finance", "banking"], credibility_score: 85, views: 189000, avg_watch_pct: 72.3, duration_sec: 55 },
  { id: "r3", journalist_name: "Priya Sharma", title: "I Tested GPT-5 for 24 Hours — Here's the Truth", thumbnail_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400", tags: ["ai", "technology"], credibility_score: 79, views: 512000, avg_watch_pct: 81.2, duration_sec: 74 },
  { id: "r4", journalist_name: "Ahmed Al-Rashidi", title: "Konya Earthquake: First Reporter on the Scene", thumbnail_url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400", tags: ["turkey", "earthquake"], credibility_score: 92, views: 890000, avg_watch_pct: 88.1, duration_sec: 48 },
  { id: "r5", journalist_name: "Elena Vasquez", title: "Why Japan's Economy Is Suddenly Booming", thumbnail_url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400", tags: ["japan", "economy"], credibility_score: 84, views: 156000, avg_watch_pct: 69.8, duration_sec: 67 },
];

export const MOCK_LIVE_STREAMS = [
  { id: "l1", title: "Turkey Earthquake — Live Coverage", thumbnail_url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400", is_active: true, viewer_count: 42300, ai_summaries: [{ time: "14:30 UTC", text: "Rescue teams have reached the city center. Death toll updated to 230." }, { time: "14:15 UTC", text: "International aid arriving from Germany, France, and USA." }, { time: "14:00 UTC", text: "Turkish President declares national emergency." }] },
  { id: "l2", title: "Climate Summit — Closing Ceremony", thumbnail_url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400", is_active: true, viewer_count: 18700, ai_summaries: [{ time: "13:45 UTC", text: "Final text of the agreement being read aloud." }, { time: "13:30 UTC", text: "Standing ovation as 147th nation signs the pledge." }] },
  { id: "l3", title: "Fed Emergency Press Conference", thumbnail_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400", is_active: false, viewer_count: 8900, ai_summaries: [{ time: "12:00 UTC", text: "Fed Chair announces emergency lending facility expansion." }] },
];

export const MOCK_TRENDING = [
  { name: "Turkey Earthquake", count: 342, category: "World" },
  { name: "Climate Summit 2026", count: 289, category: "Climate" },
  { name: "GPT-5 Launch", count: 267, category: "Technology" },
  { name: "Banking Crisis", count: 198, category: "Finance" },
  { name: "EU AI Regulation", count: 176, category: "Politics" },
  { name: "Malaria Vaccine", count: 154, category: "Health" },
  { name: "Chandrayaan-4", count: 143, category: "Science" },
  { name: "Japan GDP Growth", count: 112, category: "Finance" },
];

export const MOCK_CATEGORIES = [
  { name: "All", icon: "📰", count: 653 },
  { name: "World", icon: "🌍", count: 156 },
  { name: "Technology", icon: "💻", count: 134 },
  { name: "Finance", icon: "📈", count: 98 },
  { name: "Politics", icon: "🏛️", count: 87 },
  { name: "Climate", icon: "🌱", count: 76 },
  { name: "Health", icon: "🏥", count: 65 },
  { name: "Science", icon: "🔬", count: 54 },
  { name: "Entertainment", icon: "🎬", count: 43 },
];

export const MOCK_STORY_ARCS = [
  { id: "sa1", title: "Global AI Regulation Timeline", description: "Tracking worldwide movement toward AI governance", status: "developing", article_count: 23, timeline_events: [{ date: "2024-03-13", event: "EU AI Act passed first reading", sentiment: "positive" }, { date: "2025-06-15", event: "China releases generative AI governance rules", sentiment: "neutral" }, { date: "2026-03-25", event: "EU Parliament passes comprehensive framework", sentiment: "positive" }], sentiment_data: { overall: "cautiously_positive", trend: "stabilizing" } },
  { id: "sa2", title: "2026 Banking Stability Crisis", description: "Following the regional banking instability", status: "developing", article_count: 15, timeline_events: [{ date: "2026-03-18", event: "First reports of deposit outflows", sentiment: "negative" }, { date: "2026-03-21", event: "Fed announces emergency lending facilities", sentiment: "neutral" }, { date: "2026-03-25", event: "Fed signals emergency rate cut", sentiment: "positive" }], sentiment_data: { overall: "recovering", trend: "improving" } },
];

// Utility functions
export function getTrustColor(score: number): string {
  if (score >= 90) return '#10b981';
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#f59e0b';
  return '#ef4444';
}

export function getTrustLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 60) return 'Moderate';
  return 'Low';
}

export function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function formatViews(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toString();
}
