// data/caseStudies.ts

export type CaseStudy = {
    slug: string;           // used for the URL: /bp-genai
    year: string;
    company: string;
    industry: string;
    title: string;
    tagline: string;        // used on the case study page
    role: string;
    badges: string[];
    bentoImage: string;
    bentoImage2: string; // second image for the bento card
    bentoImage3: string; // third image for the bento card
    available: boolean;     // false = "Coming soon", hides link
  };
  
  export const caseStudies: CaseStudy[] = [
    {
      slug: "bp-genai",
      year: "2025",
      company: "bp",
      industry: "Oil & Gas",
      title: "Shifting IT Support Left at Enterprise Scale",
      tagline: "Reducing repeat IT tickets by 24% through AI-assisted knowledge discovery.",
      role: "Lead Product Designer",
      badges: ["Generative AI", "ITSM", "ServiceNow"],
      bentoImage: "/assets/images/bp-genai/bp-bento-1.png",
      bentoImage2: "/assets/images/bp-genai/bp-bento-2.png",
      bentoImage3: "/assets/images/bp-genai/bp-bento-3.png",
      available: true,
    },
    {
      slug: "bp-workplace",
      year: "2025",
      company: "bp",
      industry: "Oil & Gas",
      title: "From Fragmented Intranets to a Unified Global Digital Workplace",
      tagline: "Leading the consolidation of fragmented workplace services into a unified ServiceNow experience at bp.",
      role: "Lead Product Designer",
      badges: ["B2B", "Digital Workplace", "ServiceNow"],
      bentoImage: "/assets/images/bp-workplace/ow-bento-1.png",
      bentoImage2: "/assets/images/bp-workplace/ow-bento-2.png",
      bentoImage3: "/assets/images/bp-workplace/ow-bento-3.png",
      available: true,
    },
    {
      slug: "cs-kyc",
      year: "2020",
      company: "Credit Suisse",
      industry: "FinTech",
      title: "Reimagining How 1,140 Relationship Managers Start Their Day",
      tagline: "A case study commissioned by Credit Suisse to redirect ~136,800 productivity hours annually towards valuable client-facing time.",
      role: "Product Manager / Designer",
      badges: ["FinTech", "Mobile", "Concept"],
      bentoImage: "/assets/images/cs-kyc/cs-bento-1.png",
      bentoImage2: "/assets/images/cs-kyc/cs-bento-2.png",
      bentoImage3: "/assets/images/cs-kyc/cs-bento-3.png",
      available: true,
    },
  ];