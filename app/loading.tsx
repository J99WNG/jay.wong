import LoadingLogo from '@/components/layout/LoadingLogo';

export default function Loading() {
  // Next.js automatically swaps this in while Server Components resolve
  return (
    <main
      className="grid min-h-[calc(100svh-var(--header-height))] place-items-center bg-bg-primary"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">Loading case study</span>
      <LoadingLogo />
    </main>
  );
}
