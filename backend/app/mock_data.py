"""Mock data seeder for Signal — rich demo data for all entities"""
import uuid
from datetime import datetime, timedelta
import random


def _id():
    return str(uuid.uuid4())


# ── Sources ──────────────────────────────────────────────────────────
SOURCES = [
    {"id": _id(), "name": "Reuters", "url": "https://www.reuters.com", "type": "api", "reliability_score": 94.0},
    {"id": _id(), "name": "Associated Press", "url": "https://apnews.com", "type": "api", "reliability_score": 93.0},
    {"id": _id(), "name": "BBC News", "url": "https://www.bbc.com/news", "type": "rss", "reliability_score": 91.0},
    {"id": _id(), "name": "Al Jazeera", "url": "https://www.aljazeera.com", "type": "rss", "reliability_score": 85.0},
    {"id": _id(), "name": "Bloomberg", "url": "https://www.bloomberg.com", "type": "api", "reliability_score": 90.0},
    {"id": _id(), "name": "The Guardian", "url": "https://www.theguardian.com", "type": "rss", "reliability_score": 87.0},
    {"id": _id(), "name": "TechCrunch", "url": "https://techcrunch.com", "type": "rss", "reliability_score": 82.0},
    {"id": _id(), "name": "Nature", "url": "https://www.nature.com", "type": "api", "reliability_score": 96.0},
    {"id": _id(), "name": "Financial Times", "url": "https://www.ft.com", "type": "api", "reliability_score": 91.0},
    {"id": _id(), "name": "NPR", "url": "https://www.npr.org", "type": "rss", "reliability_score": 89.0},
]

now = datetime.utcnow()

# ── Articles ─────────────────────────────────────────────────────────
ARTICLES = [
    {
        "id": _id(), "source_id": SOURCES[0]["id"],
        "title": "Global Climate Summit 2026: 147 Nations Sign Updated Carbon Pledge",
        "content": "World leaders gathered in Geneva have reached a landmark agreement on carbon emissions. The updated pledge commits 147 nations to accelerating their transition to renewable energy sources, with a new target of net-zero emissions by 2035 for developed nations. The agreement includes a $500 billion green energy transition fund, marking the largest climate finance commitment in history. Environmental groups have praised the binding nature of the commitments, while developing nations argue the timeline remains unrealistic given their industrialization needs.",
        "url": "https://reuters.com/climate-summit-2026", "image_url": "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800",
        "category": "Climate", "trust_score": 94.0, "language": "en",
        "credibility_details": {"source_reliability": 94, "cross_source_agreement": 91, "verifiable_data": 96, "bias_score": 8, "reasoning": "Reuters has a strong track record of factual reporting. This story is corroborated by 6 other major outlets. Contains specific verifiable data points (147 nations, $500B fund)."},
        "entities": ["Geneva", "Climate Summit", "Carbon Pledge", "UN"],
        "published_at": (now - timedelta(hours=2)).isoformat(),
    },
    {
        "id": _id(), "source_id": SOURCES[4]["id"],
        "title": "Federal Reserve Signals Emergency Rate Cut Amid Banking Instability",
        "content": "The Federal Reserve has signaled it may implement an emergency interest rate cut following instability at several mid-size regional banks. Three banks reported significant deposit outflows this week, raising concerns about a broader liquidity crisis. Unlike the 2023 banking turbulence, regulators moved within 48 hours to provide emergency lending facilities. Market analysts are divided on whether the intervention will be sufficient to restore confidence. Treasury yields fell sharply on the news.",
        "url": "https://bloomberg.com/fed-rate-cut-2026", "image_url": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
        "category": "Finance", "trust_score": 91.0, "language": "en",
        "credibility_details": {"source_reliability": 90, "cross_source_agreement": 88, "verifiable_data": 93, "bias_score": 12, "reasoning": "Bloomberg's financial reporting is highly reliable. Fed statements are publicly verifiable. Multiple sources confirm the deposit outflows."},
        "entities": ["Federal Reserve", "Regional Banks", "Interest Rate", "Treasury"],
        "published_at": (now - timedelta(hours=4)).isoformat(),
    },
    {
        "id": _id(), "source_id": SOURCES[6]["id"],
        "title": "OpenAI Unveils GPT-5 with Real-Time Multimodal Reasoning",
        "content": "OpenAI has officially launched GPT-5, its most advanced AI model to date, featuring real-time multimodal reasoning across text, images, audio, and video. The model demonstrates significant improvements in mathematical reasoning, code generation, and factual accuracy, with hallucination rates reduced by 80% compared to GPT-4. Enterprise pricing starts at $0.03 per 1K tokens. Google and Anthropic are expected to respond with competing releases within weeks.",
        "url": "https://techcrunch.com/gpt5-launch", "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        "category": "Technology", "trust_score": 86.0, "language": "en",
        "credibility_details": {"source_reliability": 82, "cross_source_agreement": 79, "verifiable_data": 84, "bias_score": 22, "reasoning": "TechCrunch has good tech coverage but occasionally reflects industry hype. Claims about 80% hallucination reduction need independent verification."},
        "entities": ["OpenAI", "GPT-5", "Google", "Anthropic", "AI"],
        "published_at": (now - timedelta(hours=6)).isoformat(),
    },
    {
        "id": _id(), "source_id": SOURCES[7]["id"],
        "title": "Breakthrough mRNA Vaccine Shows 94% Efficacy Against Resistant Malaria Strain",
        "content": "Researchers at Oxford University have published Phase III trial results for an mRNA-based malaria vaccine, showing 94% efficacy against the drug-resistant P. falciparum strain devastating sub-Saharan Africa. The trial involved 12,000 participants across seven countries. WHO officials called it 'potentially the most significant public health breakthrough of the decade.' Manufacturing scale-up could deliver 500 million doses by late 2027.",
        "url": "https://nature.com/malaria-mrna-vaccine", "image_url": "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800",
        "category": "Health", "trust_score": 97.0, "language": "en",
        "credibility_details": {"source_reliability": 96, "cross_source_agreement": 94, "verifiable_data": 98, "bias_score": 3, "reasoning": "Nature is a top-tier peer-reviewed journal. Phase III trial data is publicly registered. WHO statements are verifiable. Extremely low bias."},
        "entities": ["Oxford University", "Malaria", "mRNA", "WHO", "P. falciparum"],
        "published_at": (now - timedelta(hours=8)).isoformat(),
    },
    {
        "id": _id(), "source_id": SOURCES[2]["id"],
        "title": "EU Parliament Passes Landmark AI Regulation Framework",
        "content": "The European Parliament has passed the world's most comprehensive AI regulation framework with a decisive 521-73 vote. The legislation establishes tiered risk categories for AI systems, bans real-time facial recognition in public spaces, and requires all AI-generated content to be labeled. Tech companies have 18 months to comply. Silicon Valley firms have expressed concerns about compliance costs, while privacy advocates celebrate the move as a global template for AI governance.",
        "url": "https://bbc.com/eu-ai-regulation", "image_url": "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
        "category": "Politics", "trust_score": 92.0, "language": "en",
        "credibility_details": {"source_reliability": 91, "cross_source_agreement": 93, "verifiable_data": 95, "bias_score": 10, "reasoning": "BBC provides balanced political reporting. Vote counts are public record. The legislation text is available for verification."},
        "entities": ["EU Parliament", "AI Regulation", "Facial Recognition", "Silicon Valley"],
        "published_at": (now - timedelta(hours=10)).isoformat(),
    },
    {
        "id": _id(), "source_id": SOURCES[3]["id"],
        "title": "India's Chandrayaan-4 Successfully Lands on Lunar South Pole",
        "content": "India's space agency ISRO has successfully landed the Chandrayaan-4 rover on the Moon's south pole, becoming the first mission to collect and store samples from the permanently shadowed craters believed to contain water ice. The rover will spend 14 Earth days analyzing soil composition and preparing samples for a future return mission. The achievement strengthens India's position in the emerging space economy and adds momentum to the global race for lunar resources.",
        "url": "https://aljazeera.com/chandrayaan-4", "image_url": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
        "category": "Science", "trust_score": 88.0, "language": "en",
        "credibility_details": {"source_reliability": 85, "cross_source_agreement": 90, "verifiable_data": 91, "bias_score": 11, "reasoning": "Al Jazeera's science coverage is solid. ISRO mission data is publicly tracked. Multiple space agencies confirm the landing."},
        "entities": ["ISRO", "Chandrayaan-4", "Moon", "Lunar South Pole"],
        "published_at": (now - timedelta(hours=12)).isoformat(),
    },
    {
        "id": _id(), "source_id": SOURCES[5]["id"],
        "title": "Global Semiconductor Shortage Eases as New TSMC Fab Begins Production",
        "content": "TSMC's new $40 billion fabrication plant in Arizona has begun commercial production of 3nm chips, marking a significant step toward easing the global semiconductor shortage that has plagued industries from automotive to consumer electronics. The facility is expected to produce 50,000 wafers per month by Q3 2026. Intel and Samsung are also ramping competing facilities, signaling a potential oversupply situation by 2027.",
        "url": "https://theguardian.com/tsmc-arizona-fab", "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        "category": "Technology", "trust_score": 85.0, "language": "en",
        "credibility_details": {"source_reliability": 87, "cross_source_agreement": 84, "verifiable_data": 88, "bias_score": 14, "reasoning": "Production figures cited from TSMC investor relations. Multiple industry analysts corroborate timelines."},
        "entities": ["TSMC", "Arizona", "Semiconductor", "Intel", "Samsung"],
        "published_at": (now - timedelta(hours=14)).isoformat(),
    },
    {
        "id": _id(), "source_id": SOURCES[8]["id"],
        "title": "Japan's Economy Enters Strongest Growth Phase in Three Decades",
        "content": "Japan's GDP grew at an annualized rate of 4.2% in Q1 2026, marking the strongest quarterly growth in 30 years. The surge is driven by a weakened yen boosting exports, significant corporate governance reforms attracting foreign investment, and a boom in semiconductor and AI-related manufacturing. The Bank of Japan hinted at a potential rate hike, which would be only the second since 2007. Economists warn the growth may moderate as the yen stabilization policy takes effect.",
        "url": "https://ft.com/japan-gdp-growth", "image_url": "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
        "category": "Finance", "trust_score": 93.0, "language": "en",
        "credibility_details": {"source_reliability": 91, "cross_source_agreement": 92, "verifiable_data": 95, "bias_score": 7, "reasoning": "FT's economic analysis is industry-leading. GDP figures are from official Japanese government data. Multiple central bank sources confirm."},
        "entities": ["Japan", "GDP", "Bank of Japan", "Yen", "Semiconductor"],
        "published_at": (now - timedelta(hours=16)).isoformat(),
    },
    {
        "id": _id(), "source_id": SOURCES[1]["id"],
        "title": "Massive Earthquake Strikes Central Turkey, Rescue Operations Underway",
        "content": "A 7.1 magnitude earthquake struck central Turkey early this morning, causing significant damage in the city of Konya and surrounding areas. At least 230 people are confirmed dead with over 1,800 injured. Turkish authorities have declared a national emergency and international rescue teams from 15 countries are en route. The quake occurred along the same fault system that caused the devastating 2023 earthquake, raising concerns about regional seismic vulnerability.",
        "url": "https://apnews.com/turkey-earthquake-2026", "image_url": "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800",
        "category": "World", "trust_score": 95.0, "language": "en",
        "credibility_details": {"source_reliability": 93, "cross_source_agreement": 96, "verifiable_data": 97, "bias_score": 4, "reasoning": "AP has reporters on the ground. Seismic data independently verified by USGS. Casualty figures from official Turkish disaster authority."},
        "entities": ["Turkey", "Earthquake", "Konya", "USGS"],
        "published_at": (now - timedelta(hours=1)).isoformat(),
    },
    {
        "id": _id(), "source_id": SOURCES[9]["id"],
        "title": "Spotify Acquires Major Podcast Network, Signals Audio AI Ambitions",
        "content": "Spotify has acquired Wondery-rival podcast network AudioBoom for $1.2 billion, its largest acquisition since the Joe Rogan deal. The move signals Spotify's pivot toward AI-generated audio content, with plans to offer personalized daily news briefings powered by text-to-speech technology. The company also announced an AI co-host feature that will create synthetic conversational podcasts from written articles.",
        "url": "https://npr.org/spotify-podcast-acquisition", "image_url": "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800",
        "category": "Entertainment", "trust_score": 81.0, "language": "en",
        "credibility_details": {"source_reliability": 89, "cross_source_agreement": 78, "verifiable_data": 82, "bias_score": 18, "reasoning": "NPR's tech coverage is reliable. Acquisition details from SEC filings. AI product roadmap claims need independent verification."},
        "entities": ["Spotify", "AudioBoom", "AI", "Podcast", "Text-to-Speech"],
        "published_at": (now - timedelta(hours=18)).isoformat(),
    },
]

# Assign source_id references for convenience
for art in ARTICLES:
    art["ingested_at"] = now.isoformat()

# ── Briefings ────────────────────────────────────────────────────────
BRIEFINGS = [
    {
        "id": _id(),
        "title": "Global Climate Summit 2026: Key Outcomes & Implications",
        "summary": "World leaders at the Geneva Climate Summit reached a historic agreement committing 147 nations to accelerated carbon reduction targets. The deal includes a $500B green energy transition fund and a 2035 net-zero target for developed nations.",
        "key_facts": [
            "147 nations signed the updated carbon pledge",
            "$500B committed to green energy transition fund",
            "2035 net-zero target adopted by 89 developed countries",
            "Developing nations secured additional 5-year grace period",
            "Carbon border adjustment mechanism approved"
        ],
        "perspectives": {
            "proponents": "Environmental groups praise the binding commitments as 'the most ambitious climate action in history.' The inclusion of a carbon border tax is seen as a game-changer for enforcing compliance.",
            "critics": "Developing nations argue the timeline is unrealistic. Industry groups warn of $2.3 trillion in transition costs. Some climate scientists say even these targets are insufficient to limit warming to 1.5°C."
        },
        "implications": {
            "global": "Major restructuring of global supply chains expected. Carbon-intensive industries face existential pressure. Clean energy sector projected to grow 340% by 2030.",
            "personal": "Insurance premiums, energy costs, and investment landscapes will shift significantly. Green tech skills become premium."
        },
        "topic_cluster": "climate",
        "trust_score": 92.0,
        "source_count": 7,
        "created_at": now.isoformat(),
    },
    {
        "id": _id(),
        "title": "The AI Regulation Race: How Governments Are Responding",
        "summary": "A comprehensive look at how major governments are approaching AI regulation in 2026, from the EU's landmark framework to ongoing debates in the US Congress and China's evolving stance.",
        "key_facts": [
            "EU passed comprehensive AI Act with 521-73 vote",
            "Real-time facial recognition banned in EU public spaces",
            "US Congress debating three competing AI bills",
            "China updated its AI governance framework with focus on generative AI",
            "18-month compliance deadline for EU regulations"
        ],
        "perspectives": {
            "proponents": "Privacy advocates see the EU framework as a global template. European legislators argue regulation is essential before AI capabilities outpace governance.",
            "critics": "Tech companies warn of innovation flight from regulated markets. Some argue prescriptive rules cannot keep pace with rapid AI development."
        },
        "implications": {
            "global": "Companies operating globally must comply with the strictest applicable regulation. A patchwork of national rules creates compliance complexity.",
            "personal": "AI labeling requirements will change how you consume content. Some AI features may be restricted or unavailable in certain regions."
        },
        "topic_cluster": "ai-regulation",
        "trust_score": 89.0,
        "source_count": 5,
        "created_at": now.isoformat(),
    },
    {
        "id": _id(),
        "title": "Banking Stability Watch: March 2026 Crisis Analysis",
        "summary": "Analysis of the March 2026 banking instability, comparing it to the 2023 crisis, examining regulatory response speed, and assessing systemic risk.",
        "key_facts": [
            "Three mid-size banks reported significant deposit outflows",
            "Fed signaled emergency rate cut within 48 hours",
            "Emergency lending facilities activated faster than 2023",
            "Treasury yields fell 45 basis points",
            "Contagion contained to regional banking sector"
        ],
        "perspectives": {
            "proponents": "Regulators argue swift action prevented a repeat of 2023. New banking stress test requirements proved effective in early detection.",
            "critics": "Critics say the underlying issues — commercial real estate exposure and interest rate sensitivity — remain unresolved. Moral hazard concerns grow with each intervention."
        },
        "implications": {
            "global": "Regional bank consolidation likely to accelerate. Commercial real estate repricing expected through 2027.",
            "personal": "Savings rates may increase as banks compete for deposits. Mortgage rates could see temporary relief from rate cuts."
        },
        "topic_cluster": "finance",
        "trust_score": 90.0,
        "source_count": 6,
        "created_at": now.isoformat(),
    },
]

# ── Reels ────────────────────────────────────────────────────────────
REELS = [
    {
        "id": _id(), "journalist_name": "Sarah Chen", "title": "Inside the Climate Summit: What They're Not Telling You",
        "video_url": "/demo/reels/climate.mp4", "thumbnail_url": "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400",
        "transcript": "I'm here in Geneva at the Climate Summit and there's a story behind the story...",
        "tags": ["climate", "geneva", "behind-the-scenes"], "credibility_score": 88.0, "views": 245000, "avg_watch_pct": 78.5, "duration_sec": 62,
    },
    {
        "id": _id(), "journalist_name": "Marcus Williams", "title": "The Bank Run Nobody Saw Coming",
        "video_url": "/demo/reels/banking.mp4", "thumbnail_url": "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=400",
        "transcript": "Three banks. 48 hours. Here's what actually happened in the March banking scare...",
        "tags": ["finance", "banking", "federal-reserve"], "credibility_score": 85.0, "views": 189000, "avg_watch_pct": 72.3, "duration_sec": 55,
    },
    {
        "id": _id(), "journalist_name": "Priya Sharma", "title": "I Tested GPT-5 for 24 Hours — Here's the Truth",
        "video_url": "/demo/reels/gpt5.mp4", "thumbnail_url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400",
        "transcript": "Everyone's talking about GPT-5 but nobody's testing it properly. I spent 24 hours...",
        "tags": ["ai", "gpt-5", "technology", "review"], "credibility_score": 79.0, "views": 512000, "avg_watch_pct": 81.2, "duration_sec": 74,
    },
    {
        "id": _id(), "journalist_name": "Ahmed Al-Rashidi", "title": "Konya Earthquake: First Reporter on the Scene",
        "video_url": "/demo/reels/earthquake.mp4", "thumbnail_url": "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400",
        "transcript": "I arrived in Konya within three hours of the earthquake. What I'm seeing is devastating...",
        "tags": ["turkey", "earthquake", "breaking"], "credibility_score": 92.0, "views": 890000, "avg_watch_pct": 88.1, "duration_sec": 48,
    },
    {
        "id": _id(), "journalist_name": "Elena Vasquez", "title": "Why Japan's Economy Is Suddenly Booming",
        "video_url": "/demo/reels/japan.mp4", "thumbnail_url": "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400",
        "transcript": "Japan just posted its best GDP numbers in 30 years. Let me break down what's driving this...",
        "tags": ["japan", "economy", "gdp", "analysis"], "credibility_score": 84.0, "views": 156000, "avg_watch_pct": 69.8, "duration_sec": 67,
    },
]

# ── Live Streams ─────────────────────────────────────────────────────
LIVE_STREAMS = [
    {
        "id": _id(), "title": "Turkey Earthquake — Live Coverage", "stream_url": "https://www.youtube.com/embed/live_stream",
        "thumbnail_url": "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400",
        "is_active": True, "viewer_count": 42300,
        "ai_summaries": [
            {"time": "14:30 UTC", "text": "Rescue teams have reached the city center. Death toll updated to 230."},
            {"time": "14:15 UTC", "text": "International aid arriving from Germany, France, and USA."},
            {"time": "14:00 UTC", "text": "Turkish President declares national emergency."},
        ],
    },
    {
        "id": _id(), "title": "Climate Summit — Closing Ceremony", "stream_url": "https://www.youtube.com/embed/live_stream",
        "thumbnail_url": "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400",
        "is_active": True, "viewer_count": 18700,
        "ai_summaries": [
            {"time": "13:45 UTC", "text": "Final text of the agreement being read aloud."},
            {"time": "13:30 UTC", "text": "Standing ovation as 147th nation signs the pledge."},
        ],
    },
    {
        "id": _id(), "title": "Fed Emergency Press Conference", "stream_url": "https://www.youtube.com/embed/live_stream",
        "thumbnail_url": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
        "is_active": False, "viewer_count": 8900,
        "ai_summaries": [
            {"time": "12:00 UTC", "text": "Fed Chair announces emergency lending facility expansion."},
            {"time": "11:45 UTC", "text": "Press conference concluded. Q&A lasted 25 minutes."},
        ],
    },
]

# ── Story Arcs ───────────────────────────────────────────────────────
STORY_ARCS = [
    {
        "id": _id(), "title": "Global AI Regulation Timeline",
        "description": "Tracking the worldwide movement toward AI governance from the EU AI Act to US congressional debates.",
        "status": "developing", "article_count": 23,
        "timeline_events": [
            {"date": "2024-03-13", "event": "EU AI Act passed first reading", "sentiment": "positive"},
            {"date": "2024-12-01", "event": "US Senate introduces AI Safety Act", "sentiment": "neutral"},
            {"date": "2025-06-15", "event": "China releases generative AI governance rules", "sentiment": "neutral"},
            {"date": "2025-11-20", "event": "UK AI Safety Summit produces voluntary commitments", "sentiment": "mixed"},
            {"date": "2026-03-25", "event": "EU Parliament passes comprehensive framework", "sentiment": "positive"},
        ],
        "sentiment_data": {"overall": "cautiously_positive", "trend": "stabilizing"},
    },
    {
        "id": _id(), "title": "2026 Banking Stability Crisis",
        "description": "Following the regional banking instability from deposit flight to regulatory response.",
        "status": "developing", "article_count": 15,
        "timeline_events": [
            {"date": "2026-03-18", "event": "First reports of deposit outflows at regional banks", "sentiment": "negative"},
            {"date": "2026-03-20", "event": "Stock prices of three mid-size banks drop 30%+", "sentiment": "negative"},
            {"date": "2026-03-21", "event": "Fed announces emergency lending facilities", "sentiment": "neutral"},
            {"date": "2026-03-22", "event": "Treasury Secretary issues stability statement", "sentiment": "positive"},
            {"date": "2026-03-25", "event": "Fed signals emergency rate cut", "sentiment": "positive"},
        ],
        "sentiment_data": {"overall": "recovering", "trend": "improving"},
    },
]

# ── Trending Topics ──────────────────────────────────────────────────
TRENDING_TOPICS = [
    {"name": "Turkey Earthquake", "count": 342, "category": "World"},
    {"name": "Climate Summit 2026", "count": 289, "category": "Climate"},
    {"name": "GPT-5 Launch", "count": 267, "category": "Technology"},
    {"name": "Banking Crisis", "count": 198, "category": "Finance"},
    {"name": "EU AI Regulation", "count": 176, "category": "Politics"},
    {"name": "Malaria Vaccine", "count": 154, "category": "Health"},
    {"name": "Chandrayaan-4", "count": 143, "category": "Science"},
    {"name": "Japan GDP Growth", "count": 112, "category": "Finance"},
]

CATEGORIES = [
    {"name": "World", "icon": "🌍", "count": 156},
    {"name": "Technology", "icon": "💻", "count": 134},
    {"name": "Finance", "icon": "📈", "count": 98},
    {"name": "Politics", "icon": "🏛️", "count": 87},
    {"name": "Climate", "icon": "🌱", "count": 76},
    {"name": "Health", "icon": "🏥", "count": 65},
    {"name": "Science", "icon": "🔬", "count": 54},
    {"name": "Entertainment", "icon": "🎬", "count": 43},
]
