import { DesignSystemDemo } from './DesignSystemDemo';
import { GeniePersonaDemo } from './GeniePersonaDemo';

export function SelectedWorkDemos() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h3>Meet the Genie</h3>
        <p>One persona, expressed across the product. Explore the original Rive animations.</p>
        <GeniePersonaDemo />
      </div>

      <div className="flex flex-col gap-2">
        <h3>A shared system, built to scale</h3>
        <p>Interactive examples from the shared Figma library. Switch themes, focus or hover controls, and select states to explore how the system behaves.</p>
        <DesignSystemDemo />
      </div>
    </>
  );
}
