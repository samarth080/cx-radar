# CX Radar

CX Radar is a production-quality prototype for an AI-powered customer experience intelligence platform. It turns high-volume support conversations into evidence-backed product and operational decisions.

The demo workspace is **Nova Commerce**, an Indian e-commerce company with 1,284 synthetic conversations across WhatsApp, live chat, email, and support tickets. No authentication, API key, backend, or real customer data is required.

## Problem

Support teams collect enormous amounts of customer feedback, but converting conversations into actionable product insight is manual and slow. CX managers must read tickets, tag issues, identify patterns, estimate impact, and persuade product or operations teams with evidence. In fast-moving environments, emerging issues are discovered late and recurring contacts remain preventable.

## Product hypothesis

If customer conversations can be automatically structured, grouped by root cause, and connected to representative evidence, CX teams can identify systemic problems earlier, prioritize interventions more confidently, and reduce preventable support volume.

## Primary user

The primary user is a **Customer Experience / Support Operations Manager** responsible for understanding contact drivers, monitoring sentiment and escalation risk, spotting emerging problems, and communicating actionable insight to Product, Engineering, Operations, and Support.

## Core workflow

```text
Conversations → Classification → Clustering → Root Cause → Recommendation → Product Brief
```

The prototype includes:

- A command center focused on emerging issues, daily signals, and conversation trends
- An inbox with search, channel/sentiment/urgency/status filters, and 108 realistic conversations
- Conversation detail with transcript, classification confidence, root cause, agent response, and CX intervention
- Issue aggregation with trend, severity, sentiment, resolution rate, and root-cause drill-down
- Supporting evidence, detected patterns, impact estimates, and concrete recommended actions
- A cited “Ask CX Radar” analyst experience with deterministic no-key responses
- A shareable Product Brief that translates customer evidence into a product decision
- Simulated CSV/JSON processing with clear progress and success states
- Demo integrations, settings, responsive navigation, exports, notifications, and local analytics events

## Product decisions

### Root cause matters more than sentiment alone

Sentiment shows how a customer feels; it does not explain what to change. CX Radar groups conversations around a shared failure mechanism or expectation gap so a team can intervene in the product or process.

### AI insights include evidence and citations

Every significant claim links back to representative conversation IDs. This makes the system explainable, helps analysts validate a cluster, and gives cross-functional partners confidence in the recommendation.

### Recommendations include product and process actions

An agent reply resolves one conversation. The product’s core value is preventing the next hundred. Recommendations therefore include interventions such as a retry path, proactive notification, revised ETA, or better internal tooling.

### Users can drill from aggregate signal to raw conversation

The interface preserves a clear evidence chain: command center → issue → pattern → supporting excerpt → complete conversation. Aggregation creates speed without removing human judgment.

### Confidence is visible

Confidence scores communicate where the model is certain and where a human should inspect more evidence. They are especially important when AI output can influence roadmap or operational work.

## Success metrics

Primary metric:

- Time to identify an emerging customer issue

Secondary metrics:

- Repeat contact rate
- Resolution rate and resolution time
- Preventable support volume
- Escalation rate
- CX analyst time saved
- CSAT
- Time from detected issue to assigned intervention

## Product analytics

The prototype records a small event stream in `localStorage` and logs events to the browser console:

- `dashboard_viewed`
- `conversation_opened`
- `issue_opened`
- `ai_question_asked`
- `product_brief_generated`
- `filter_applied`
- `conversation_upload_started`
- `conversation_upload_completed`

## Technical architecture

- Next.js 16 App Router and TypeScript
- Tailwind CSS with a shadcn/ui-compatible token system and source-owned primitives
- Radix Dialog and Tooltip primitives
- Lucide icons
- Recharts
- Local typed mock data behind `Conversation`, `Customer`, `Issue`, `Insight`, `Metric`, and `RecommendedAction` interfaces
- Deterministic AI output so the complete demo works without a backend or API key

Mock data lives in `src/lib/data.ts`, which is intentionally isolated so a future API client can replace it without rewriting the product components.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then choose **Continue with demo workspace**.

Quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

The project is ready for zero-configuration deployment on Vercel:

1. Import the repository into Vercel.
2. Keep the detected framework as Next.js.
3. Deploy without environment variables.

No backend service or LLM credential is required for the prototype.

## Future roadmap

1. Real-time Intercom, Zendesk, Freshdesk, WhatsApp, Gmail, and Slack ingestion
2. Automated threshold and anomaly alerts
3. Historical root-cause trends and regression detection
4. Feedback-to-roadmap integrations for Linear, Jira, and Productboard
5. Correlation with checkout, delivery, and product analytics events
6. Agent coaching based on repeated resolution gaps
7. Optional LLM-backed exploration with evaluation, cost, and privacy controls

## Data and privacy

All names, messages, customer IDs, and operational metrics in the demo are synthetic. The upload flow is simulated in the browser and does not send selected files to a server.
