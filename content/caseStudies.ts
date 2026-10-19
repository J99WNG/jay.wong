// data/caseStudies.ts

export type CaseStudy = {
    slug: string;           // used for the URL: /bp-genai
    year: string;
    company: string;
    logo: string;
    industry: string;
    title: string;
    tagline: string;        // used on the case study page
    role: string;
    badges: string[];
    bentoImage: string;
    bentoAlt: string;
    bentoImage2: string; // second image for the bento card
    bentoAlt2: string;
    bentoImage3: string; // third image for the bento card
    bentoAlt3: string;
    available: boolean;
  };
  
  export const caseStudies: CaseStudy[] = [
    {
      slug: "dai-pai-dong",
      year: "Ongoing",
      company: "Supreme Roast Goose King",
      logo: "",
      industry: "FoodTech",
      title: "Modernising a Dai Pai Dong Without Losing Its Spirit",
      tagline: "Generated 45,063 views through local SEO, then prototyped a low-risk digital tool to replace pen-and-paper bookings and walk-ins.",
      role: "Service Designer / Product Designer",
      badges: ["Hospitality", "Service Design", "Digital Operations"],
      bentoImage: "/assets/case-studies/dai-pai-dong/dpd-bento-1.png",
      bentoAlt: "Tonight operations dashboard showing table availability, upcoming reservations and the walk-in queue during dinner service.",
      bentoImage2: "/assets/case-studies/dai-pai-dong/results-bento.svg",
      bentoAlt2: "Google Business Profile results from May to September 2026: 45,063 profile views, 19,187 search appearances and 8,584 customer actions.",
      bentoImage3: "/assets/case-studies/dai-pai-dong/service-bento.svg",
      bentoAlt3: "Service blueprint comparing fragmented phone, walk-in, paper and radio signals with one shared view of bookings, tables and wait order.",
      available: false,
    },
    {
      slug: "mathsgenie",
      year: "2026",
      company: "General Learning (YC F24)",
      logo: "/assets/brands/generallearning.png",
      industry: "EdTech",
      title: "Relaunching MathsGenie for 242,000 Daily Users",
      tagline: "Gave a 40,000-message-a-day AI tutor a personality and built a shared design system across three products.",
      role: "Product / Brand Designer",
      badges: ["EdTech", "Product & Brand", "AI Platform"],
      bentoImage: "/assets/case-studies/mathsgenie/mathsgenie-bento-1.png",
      bentoAlt: "MathsGenie identity featuring the Genie tutor and companion riding a magic carpet beneath the message ‘Free GCSE and A Level Maths Revision’.",
      bentoImage2: "/assets/case-studies/mathsgenie/rive/genie-chat.riv",
      bentoAlt2: "Animated Genie tutor responding in the AI chat interface.",
      bentoImage3: "/assets/case-studies/mathsgenie/rive/genie-carpet.riv",
      bentoAlt3: "Animated Genie mascot riding a magic carpet.",
      available: true,
    },
    {
      slug: "bp-genai",
      year: "2025",
      company: "bp",
      logo: "/assets/brands/bp-helios-colour.svg",
      industry: "Oil & Gas",
      title: "Shifting IT Support Left for 87,000 Employees",
      tagline: "Helped reduce low-complexity IT tickets by 24% through trustworthy, AI-assisted knowledge discovery.",
      role: "Lead Product Designer",
      badges: ["IT Support", "Product Design", "Generative AI"],
      bentoImage: "/assets/case-studies/bp-genai/bp-bento-1.png",
      bentoAlt: "Desktop AI support homepage with conversation history, popular searches and a natural-language search field.",
      bentoImage2: "/assets/case-studies/bp-genai/bp-bento-2.png",
      bentoAlt2: "Laptop view of the AI support search experience suggesting related questions as an employee types.",
      bentoImage3: "/assets/case-studies/bp-genai/bp-bento-3.png",
      bentoAlt3: "Mobile AI support homepage with popular questions and an Ask AI field.",
      available: true,
    },
    {
      slug: "bp-workplace",
      year: "2025",
      company: "bp",
      logo: "/assets/brands/bp-helios-colour.svg",
      industry: "Oil & Gas",
      title: "Unifying Fragmented Intranets into One Global Digital Workplace",
      tagline: "Consolidated 15+ workplace services into ServiceNow, improving task success by 30% in usability testing.",
      role: "Lead Product Designer",
      badges: ["Digital Workplace", "Service Design", "ServiceNow"],
      bentoImage: "/assets/case-studies/bp-workplace/ow-bento-1.png",
      bentoAlt: "Location-aware workplace homepage for Pune, with announcements, local contacts and task-based service cards.",
      bentoImage2: "/assets/case-studies/bp-workplace/ow-bento-2.png",
      bentoAlt2: "Responsive office directory showing searchable, filterable workplace locations on desktop and mobile.",
      bentoImage3: "/assets/case-studies/bp-workplace/ow-bento-3.png",
      bentoAlt3: "Workplace food-and-drink page organising local dining services into plain-language cards.",
      available: true,
    },
    {
      slug: "cs-kyc",
      year: "2020",
      company: "Credit Suisse",
      logo: "/assets/brands/creditsuisse-symbol.svg",
      industry: "FinTech",
      title: "Reimagining How 1,140 Relationship Managers Start Their Day",
      tagline: "Credit Suisse-sponsored brief: a unified mobile concept that could redirect up to 136,800 hours annually to client-facing work.",
      role: "Product Manager / Designer",
      badges: ["Wealth Management", "Product Strategy", "Mobile"],
      bentoImage: "/assets/case-studies/cs-kyc/cs-bento-1.png",
      bentoAlt: "RM Suite mobile screens for market news, priority notifications and the searchable client list.",
      bentoImage2: "/assets/case-studies/cs-kyc/cs-bento-2.png",
      bentoAlt2: "RM Suite client profiles showing portfolio allocation, relationship contacts and recent activity.",
      bentoImage3: "/assets/case-studies/cs-kyc/cs-bento-3.png",
      bentoAlt3: "RM Suite two-factor authentication screen shown on a phone.",
      available: true,
    },
  ];
