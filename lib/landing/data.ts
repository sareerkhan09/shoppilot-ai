export interface Feature {
  label: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    label: "AI Insights",
    title: "Reads your store the way an analyst would",
    description:
      "Every metric is compared against your own history, not a generic benchmark — so what you see is specific to your business.",
  },
  {
    label: "Revenue Intelligence",
    title: "Knows the difference between noise and signal",
    description:
      "Sales dips and spikes are measured against your rolling baseline, so you only hear about what's actually unusual.",
  },
  {
    label: "Inventory Monitoring",
    title: "Watches sell-through, not just stock counts",
    description:
      "Reorder timing is calculated from velocity per SKU, catching a stockout days before it happens.",
  },
  {
    label: "Customer Intelligence",
    title: "Flags who's worth a second look",
    description:
      "Repeat buyers who've gone quiet are surfaced early, while they're still worth winning back.",
  },
  {
    label: "Growth Opportunities",
    title: "Surfaces what's working before you notice",
    description:
      "A product quietly trending faster than usual gets flagged the moment the pattern is clear.",
  },
  {
    label: "Daily AI Reports",
    title: "One account of your business, every morning",
    description:
      "No dashboards to check. A single, ranked briefing arrives before you've opened your laptop.",
  },
  {
    label: "Smart Recommendations",
    title: "Tells you what to do, not just what happened",
    description:
      "Every entry comes with a specific, actionable next step — never just a number without context.",
  },
  {
    label: "Automation",
    title: "Built to act, not only observe",
    description:
      "The roadmap moves from insight to execution — drafting the email, not just naming the customer.",
  },
];

export interface Integration {
  name: string;
  status: "connected" | "coming-soon";
}

export const integrations: Integration[] = [
  { name: "Shopify", status: "connected" },
  { name: "Meta Ads", status: "coming-soon" },
  { name: "Google Ads", status: "coming-soon" },
  { name: "Instagram", status: "coming-soon" },
  { name: "TikTok", status: "coming-soon" },
  { name: "Klaviyo", status: "coming-soon" },
  { name: "Google Analytics", status: "coming-soon" },
];

export interface PricingTier {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "See what ShopPilot catches before you commit to anything.",
    features: [
      "Daily AI briefing",
      "Sales anomaly detection",
      "Low-inventory alerts",
      "7-day insight history",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$99",
    cadence: "/month",
    description: "The full daily ledger for a single store, running every morning.",
    features: [
      "Everything in Free",
      "Trending product detection",
      "Customer win-back signals",
      "Unlimited insight history",
      "Priority email delivery",
    ],
    highlighted: true,
    cta: "Start free trial",
  },
  {
    name: "Growth",
    price: "$299",
    cadence: "/month",
    description: "For stores ready to move from insight to automated action.",
    features: [
      "Everything in Pro",
      "Ad performance monitoring",
      "Automated win-back emails",
      "Multi-channel recommendations",
      "Dedicated onboarding",
    ],
    cta: "Talk to us",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Is this just a chatbot I have to ask questions?",
    answer:
      "No. ShopPilot doesn't wait for a prompt. It reviews your store on a schedule and delivers a ranked account of what needs attention — you read it the way you'd read a report from a trusted employee, not a search bar.",
  },
  {
    question: "What data does ShopPilot need access to?",
    answer:
      "Only read access to orders, products, customers, and inventory levels through Shopify's official permissions. Nothing is ever written back to your store without your explicit approval.",
  },
  {
    question: "How is this different from Shopify's built-in analytics?",
    answer:
      "Shopify's analytics show you numbers. ShopPilot compares those numbers against your own store's history and tells you, in plain language, what's worth acting on today — and what to do about it.",
  },
  {
    question: "Can I use this alongside my existing tools?",
    answer:
      "Yes. ShopPilot is additive — it doesn't replace your ad platforms or email tools, it watches across them and tells you where to look next.",
  },
  {
    question: "What happens after the free trial?",
    answer:
      "You can continue on the Free tier indefinitely with core alerts, or upgrade to Pro for the full daily ledger. No card is charged without your confirmation.",
  },
];