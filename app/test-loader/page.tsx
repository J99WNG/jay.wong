import LoadingLogo from '@/components/LoadingLogo'; // Adjust path if needed

export default function TestLoader() {
  return (
    <div className="relative w-screen h-screen bg-bg-primary">
      {/* This renders the loader permanently on the screen. 
        Refresh the page to replay the animation.
      */}
      <LoadingLogo />
    </div>
  );
}