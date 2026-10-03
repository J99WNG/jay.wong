import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Collaborations from "@/components/sections/Collaborations";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import { siteMetadata } from "@/app/data/siteMetadata";

export default function Home() {
  const profileImageUrl = new URL(
    siteMetadata.profileImage,
    siteMetadata.url,
  ).toString();

  // This gives search engines one explicit portrait preference without changing
  // the branded Open Graph image used by LinkedIn, Messages and other apps.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteMetadata.url}/#homepage`,
    url: `${siteMetadata.url}/`,
    name: siteMetadata.homepageTitle,
    description: siteMetadata.description,
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: profileImageUrl,
      width: 768,
      height: 768,
    },
    mainEntity: {
      "@type": "Person",
      "@id": `${siteMetadata.url}/#jay-wong`,
      name: siteMetadata.name,
      jobTitle: "Product Designer",
      url: `${siteMetadata.url}/`,
      image: profileImageUrl,
    },
  };

  return (
    <>
      {/* JSON-LD is machine-readable metadata and is not announced by assistive tech. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escaping `<` prevents page content from accidentally closing the script.
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <Hero />
        <Work />
        <About />
        <Collaborations />
        <Contact />
      </main>
    </>
  );
}
