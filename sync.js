require("dotenv").config();
const { Client } = require("@notionhq/client");
const fs = require("fs-extra");
const path = require("path");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const databaseId = process.env.NOTION_DATABASE_ID;
const postsDir = path.join(__dirname, "_posts"); 

async function getPublishedPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      status: { equals: "Live" }, 
    },
    // CHANGED: Sorting by Project Year (Descending = Newest at the top)
    sorts: [{ property: "Project Year", direction: "descending" }],
  });
  return response.results;
}

async function getPageContent(pageId) {
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
  });
  return blocks.results;
}

function convertBlocksToMarkdown(blocks) {
  let htmlContent = "";
  blocks.forEach(block => {
    if (block.type === "code" && block.code.language === "html") {
      const codeText = block.code.rich_text.map(t => t.plain_text).join("");
      htmlContent += `${codeText}\n`;
    }
  });
  return htmlContent;
}

function createFrontmatter(post) {
  const props = post.properties;

  const title = props.Title?.title[0]?.plain_text || "Untitled";
  const slug = props.Slug?.rich_text[0]?.plain_text || "no-slug";
  const summary = props.Summary?.rich_text[0]?.plain_text || "";
  const metadata = props.Metadata?.rich_text[0]?.plain_text || "";
  
  // NEW: Extract Project Year (assuming Number type)
  const projectYear = props["Project Year"]?.number || props["Project Year"]?.select?.name || "2026";
  
  const tags = props.Tags?.multi_select?.map(t => t.name) || [];
  const cardImg = props["Card Image Path"]?.rich_text[0]?.plain_text || "";
  const gallery1 = props["Gallery Image 1"]?.rich_text[0]?.plain_text || "";
  const gallery2 = props["Gallery Image 2"]?.rich_text[0]?.plain_text || "";

  return `---
layout: post
title: "${title}"
slug: ${slug}
project_year: ${projectYear}
description: "${summary}"
metadata_info: "${metadata}"
categories: [${tags.join(", ")}]
card_image: "${cardImg}"
image_1: "${gallery1}"
image_2: "${gallery2}"
---
`;
}

async function build() {
  try {
    await fs.ensureDir(postsDir);
    const posts = await getPublishedPosts();

    console.log(`DEBUG: Notion returned ${posts.length} posts.`);

    // SAFETY CHECK: If no posts, STOP immediately. 
    // Do not empty the directory, do not pass go.
    if (posts.length === 0) {
      console.log("⚠️ No posts found. Stopping to prevent folder deletion.");
      return; 
    }

    // Only empty the directory if we actually have new data to put in it
    await fs.emptyDir(postsDir);

    for (const post of posts) {
      // ... your existing loop logic ...
      const year = post.properties["Project Year"]?.number || "2026";
      const slug = post.properties.Slug?.rich_text[0]?.plain_text || "post";
      const filename = `${year}-01-01-${slug}.md`;
      
      await fs.writeFile(path.join(postsDir, filename), createFrontmatter(post) + "\n" + convertBlocksToMarkdown(await getPageContent(post.id)));
      console.log(`✔ Generated ${filename}`);
    }
    console.log("✅ Build complete");
  } catch (error) {
    console.error("❌ Build failed:", error);
  }
}

build();