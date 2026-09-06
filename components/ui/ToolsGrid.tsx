import Image from "next/image";

const tools = [
  { name: "Figma", category: "Design", icon: "/assets/tools/figma.svg" },
  { name: "Sketch", category: "Design", icon: "/assets/tools/sketch.svg" },
  { name: "Storybook", category: "Systems", icon: "/assets/tools/storybook.svg" },
  { name: "Zeplin", category: "Handoff", icon: "/assets/tools/zeplin.svg" },
  { name: "Claude", category: "AI", icon: "/assets/tools/claude.svg" },
  { name: "Codex", category: "AI", icon: "/assets/tools/codex.svg" },
  { name: "Cursor", category: "Development", icon: "/assets/tools/cursor.svg" },
  { name: "GitHub", category: "Development", icon: "/assets/tools/github.svg" },
  { name: "Next.js", category: "Development", icon: "/assets/tools/nextjs.svg" },
  { name: "Tailwind CSS", category: "Development", icon: "/assets/tools/tailwindcss.svg" },
  { name: "Notion", category: "Collaboration", icon: "/assets/tools/notion.svg" },
  { name: "Jira", category: "Delivery", icon: "/assets/tools/jira.svg" },
  { name: "Azure DevOps", category: "Delivery", icon: "/assets/tools/azuredevops.svg" },
  { name: "ServiceNow", category: "Enterprise", icon: "/assets/tools/servicenow.svg" },
] as const;

export default function ToolsGrid() {
  return (
    <ul
      className="grid grid-cols-2 gap-x-4 gap-y-3 list-none p-0 sm:grid-cols-3"
      aria-label="Tools and tech I'm comfortable with"
    >
      {tools.map((tool, index) => (
        <li
          key={tool.name}
          tabIndex={0}
          className="group/tool flex items-center gap-3 rounded-lg py-2 focus-visible:outline-offset-4"
        >
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-sm motion-safe:transition-[rotate,scale] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:will-change-[rotate,scale] motion-safe:group-hover/tool:scale-110 motion-safe:group-focus-visible/tool:scale-110 ${
              index % 2 === 0
                ? "motion-safe:group-hover/tool:-rotate-6 motion-safe:group-focus-visible/tool:-rotate-6"
                : "motion-safe:group-hover/tool:rotate-6 motion-safe:group-focus-visible/tool:rotate-6"
            }`}
          >
            <Image
              src={tool.icon}
              alt=""
              width={32}
              height={32}
              className="size-7 object-contain"
            />
          </span>

          <span className="min-w-0">
            <span className="block text-sm font-medium text-text-primary">
              {tool.name}
            </span>

            <span className="block text-xs text-text-tertiary">
              {tool.category}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
