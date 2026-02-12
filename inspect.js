const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function inspectSchema() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: 1, // We only need one to see the structure
  });

  if (response.results.length === 0) {
    console.log("❌ Database is empty. Add at least one row!");
    return;
  }

  const properties = response.results[0].properties;
  
  console.log("--- YOUR NOTION SCHEMA ---");
  Object.keys(properties).forEach(key => {
    console.log(`Property Name: "${key}" | Type: ${properties[key].type}`);
  });
  console.log("--------------------------");
}

inspectSchema();