Signal

### AI-Native News Platform - Cut the Noise. Find the Truth.

---

## Overview

**Signal** is an AI-powered, personalized news platform that transforms how people consume information.

Instead of static articles and noisy feeds, Signal delivers:

* verified and credible news
* personalized intelligence briefings
* short-form journalist videos
* live news streams
* interactive, conversational exploration

It is designed to make users say:

> “I can’t go back to consuming news the old way.”

---

## The Problem

Modern news consumption is broken:

* Information overload with low signal-to-noise ratio
* Misinformation and lack of credibility
* Static, non-interactive formats
* One-size-fits-all feeds

Users don’t need more news.
They need **clarity, trust, and context**.

---

## The Solution

Signal is a **multi-agent AI system** that:

* filters and verifies information
* synthesizes multiple sources into unified briefings
* personalizes content for each user
* delivers news across multiple formats (text, video, live, chat)

---

## Core Features

### Personalized Newsroom

* AI-curated feed based on user interests and behavior
* Delivers relevant, high-value content only

---

### Credibility Engine

* Each news item is assigned a **Trust Score**
* Based on:

  * source reliability
  * cross-verification
  * factual consistency

---

### Smart Briefings

* Multiple articles → one structured insight
* Includes:

  * summary
  * perspectives
  * implications

---

### Signal Reels (Short-Form Video)

* Scrollable, vertical news feed
* Journalists post quick updates and insights
* AI prioritizes credible and relevant content

---

### Live News Hub

* Aggregated live streams from major news channels
* Real-time access to ongoing events

---

### Interactive News Chat

* Ask questions like:

  * “Explain this simply”
  * “What’s the impact on India?”
* AI responds using verified data

---

### Story Arc Tracker

* Tracks evolving news stories over time
* Shows:

  * timelines
  * sentiment shifts
  * key developments

---

## Architecture

Signal is built using a **multi-agent AI system**, including:

* **Ingestion Agent** — collects global news data
* **Credibility Agent** — evaluates trustworthiness
* **Synthesis Agent** — generates structured briefings
* **Personalization Agent** — curates user feeds
* **Content Agent** — creates summaries and videos
* **Video Intelligence Agent** — processes reels
* **Live Broadcast Agent** — integrates live streams
* **Interaction Agent** — powers chat interface
* **Moderation Agent** — filters misinformation
* **Learning Agent** — improves system over time

---

## Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript

### Backend

* Python (FastAPI)

### AI Stack

* LLMs (OpenAI / Claude-compatible)
* Retrieval-Augmented Generation (RAG)
* Vector databases

### Media & Infra

* FFmpeg (video processing)
* Scalable deployment via Vercel

---

## Project Structure

```id="p7t1m6"
signal/
├── backend/        # AI agents and APIs
├── frontend/       # Next.js frontend
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Clone the repository

```bash id="qlj1o5"
git clone https://github.com/thatshedesigner/Signal.git
cd Signal
```

---

### Frontend setup

```bash id="b1w8hu"
cd frontend
npm install
npm run dev
```

---

### Backend setup

```bash id="k0k9k2"
cd backend
pip install -r requirements.txt
```

---

## Deployment

* Frontend deployed on **Vercel**
* Root directory set to:

```id="4r6c4s"
frontend
```

---

## Impact

Signal aims to:

* reduce misinformation exposure
* decrease time to understand news
* increase engagement through interactive formats
* restore trust in journalism

---

## Future Scope

* Real-time credibility scoring improvements
* Multi-language support
* Advanced personalization engine
* Creator ecosystem for journalists
* AI-generated video enhancements

---

## About

Signal is built as part of a hackathon project focused on reimagining the future of news using AI.

---

## License

MIT

## APP LINK

https://signal-two-eta.vercel.app/
