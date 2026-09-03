import Image from "next/image";

const cardBase =
  "group/card absolute aspect-[4/3] w-[72%] origin-center overflow-hidden rounded-xl border border-border-muted bg-bg-secondary shadow-xl transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:z-30 hover:rotate-0 hover:scale-[1.04] hover:border-border-hover hover:shadow-2xl focus-visible:z-30 focus-visible:rotate-0 focus-visible:scale-[1.04] focus-visible:border-border-hover motion-reduce:transition-none sm:w-[56%] md:w-[48%]";

export default function ShuffleDeck() {
  return (
    <div
      className="relative isolate h-[17rem] w-full sm:h-[20rem] md:h-[19rem]"
      aria-label="A few moments from my design practice"
    >
      <figure
        tabIndex={0}
        className={`${cardBase} left-0 top-8 z-10 -rotate-[7deg]`}
      >
        <Image
          src="/assets/images/about/PXL_20230912_145946197.jpg"
          alt="Jay with a multidisciplinary design team"
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 768px) 56vw, 31vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.03] group-focus-visible/card:scale-[1.03] motion-reduce:transition-none"
        />
      </figure>

      <figure
        tabIndex={0}
        className={`${cardBase} left-[14%] top-1 z-20 rotate-[2.5deg] sm:left-[22%] md:left-[26%]`}
      >
        <video
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.03] group-focus-visible/card:scale-[1.03] motion-reduce:transition-none"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="A short clip from Jay facilitating a design workshop"
        >
          <source src="/assets/images/about/jw-workshop-snippet.mp4" type="video/mp4" />
        </video>
      </figure>

      <figure
        tabIndex={0}
        className={`${cardBase} right-0 top-9 z-10 rotate-[7deg]`}
      >
        <Image
          src="/assets/images/about/e9f89d48-d89b-4f5c-b77b-fa14d4928798.JPG"
          alt="Jay and colleagues at Product Design Week London"
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 768px) 56vw, 31vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.03] group-focus-visible/card:scale-[1.03] motion-reduce:transition-none"
        />
      </figure>
    </div>
  );
}
