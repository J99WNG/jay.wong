require("dotenv").config();
const { Client } = require("@notionhq/client");
const fs = require("fs-extra");
const path = require("path");

const notion = new Client({ auth: process.env.NOTION_TOKEN, });

const databaseId = process.env.NOTION_DATABASE_ID;
const postsDir = path.join(__dirname, "../_posts");

async function getPublishedPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: "Publish Date",
        direction: "descending",
      },
    ],
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
  let markdown = "";

  blocks.forEach(block => {
    const { type } = block;

    if (type === "paragraph") {
      const text = block.paragraph.rich_text.map(t => t.plain_text).join("");
      markdown += `${text}\n\n`;
    }

    if (type === "heading_1") {
      const text = block.heading_1.rich_text.map(t => t.plain_text).join("");
      markdown += `# ${text}\n\n`;
    }

    if (type === "heading_2") {
      const text = block.heading_2.rich_text.map(t => t.plain_text).join("");
      markdown += `## ${text}\n\n`;
    }

    if (type === "bulleted_list_item") {
      const text = block.bulleted_list_item.rich_text.map(t => t.plain_text).join("");
      markdown += `- ${text}\n`;
    }
  });

  return markdown;
}

function createFrontmatter(post) {
  const title = post.properties.Title.title[0]?.plain_text || "";
  const slug = post.properties.Slug.rich_text[0]?.plain_text || "";
  const summary = post.properties.Summary.rich_text[0]?.plain_text || "";
  const date = post.properties["Publish Date"].date.start;
  const tags = post.properties.Tags.multi_select.map(t => t.name);

  return `---
layout: post
title: "${title}"
date: ${date}
description: "${summary}"
categories: [${tags.join(", ")}]
slug: ${slug}
---
`;
}

async function build() {
  await fs.emptyDir(postsDir);

  const posts = await getPublishedPosts();

  for (const post of posts) {
    const frontmatter = createFrontmatter(post);
    const blocks = await getPageContent(post.id);
    const markdown = convertBlocksToMarkdown(blocks);

    const date = post.properties["Publish Date"].date.start;
    const slug = post.properties.Slug.rich_text[0]?.plain_text;

    const filename = `${date}-${slug}.md`;

    await fs.writeFile(
      path.join(postsDir, filename),
      frontmatter + "\n" + markdown
    );
  }

  console.log("✅ Posts generated from Notion");
}

build();