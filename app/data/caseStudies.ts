// data/caseStudies.ts

export type CaseStudy = {
    slug: string;           // used for the URL: /bp-itsm-genai
    year: string;
    company: string;
    industry: string;
    title: string;
    tagline: string;        // used on the case study page
    badges: string[];
    bentoImage: string;
    bentoImage2: string; // second image for the bento card
    bentoImage3: string; // third image for the bento card
    available: boolean;     // false = "Coming soon", hides link
  };
  
  export const caseStudies: CaseStudy[] = [
    {
      slug: "bp-itsm-genai",
      year: "2025",
      company: "bp",
      industry: "Oil & Gas",
      title: "Shifting IT Support Left at Enterprise Scale",
      tagline: "Reducing repeat IT tickets by 24% through AI-assisted knowledge discovery.",
      badges: ["B2B", "GenAI", "ITSM", "ServiceNow"],
      bentoImage: "/assets/images/case-study-1/bp-bento-1.png",
      bentoImage2: "/assets/images/case-study-1/bp-bento-2.png",
      bentoImage3: "/assets/images/case-study-1/bp-bento-3.png",
      available: true,
    },
    {
      slug: "bp-workplace",
      year: "2025",
      company: "bp",
      industry: "Oil & Gas",
      title: "From Fragmented Intranets to a Unified Global Digital Workplace",
      tagline: "Leading the consolidation of fragmented workplace services into a unified ServiceNow experience at bp.",
      badges: ["B2B", "Digital Workplace", "ServiceNow"],
      bentoImage: "/assets/images/case-study-2/ow-bento-1.png",
      bentoImage2: "/assets/images/case-study-2/ow-bento-2.png",
      bentoImage3: "/assets/images/case-study-2/ow-bento-3.png",
      available: true,
    },
    {
      slug: "cs-kyc",
      year: "2020",
      company: "Credit Suisse",
      industry: "Finance",
      title: "Defragmenting How 1,140 Relationship Managers Start Their Day",
      tagline: "A case study commissioned by Credit Suisse to redirect ~136,800 productivity hours annually towards valuable client-facing time.",
      badges: ["FinTech", "Mobile", "Concept"],
      bentoImage: "/assets/images/case-study-3/cs-bento-1.png",
      bentoImage2: "/assets/images/case-study-3/cs-bento-2.png",
      bentoImage3: "/assets/images/case-study-3/cs-bento-3.png",
      available: true,
    },
  ];