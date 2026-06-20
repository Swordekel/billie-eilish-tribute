import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "motion/react";
import { Play } from "lucide-react";
import { ScrambleText } from "./ScrambleText";

const search = (q: string) =>
  `https://open.spotify.com/search/${encodeURIComponent("Billie Eilish " + q)}`;

const albums = [
  { title: "HIT ME HARD AND SOFT", year: "2024", tracks: 10, single: "Birds of a Feather", image: "/images/be-birds.png", url: search("Hit Me Hard and Soft"), latest: true },
  { title: "Happier Than Ever", year: "2021", tracks: 16, single: "Happier Than Ever", image: "/images/be-guitar.jpg", url: search("Happier Than Ever") },
  { title: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", year: "2019", tracks: 14, single: "bad guy", image: "/images/be-portrait.jpg", url: search("When We All Fall Asleep Where Do We Go") },
  { title: "dont smile at me", year: "2017", tracks: 9, single: "ocean eyes", image: "/images/be-camera.jpg", url: search("Don't Smile at Me") },
];

export function Discography() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInView = useInView(playerRef, { once: true, margin: "250px 0px 250px 0px" });

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const scrollWidth = scrollContainerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const xDistance = scrollWidth - viewportWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${xDistance}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(scrollContainerRef.current, { x: -xDistance, ease: "none" });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <section
        id="music"
        ref={sectionRef}
        className="relative flex h-screen w-full items-center overflow-hidden bg-[#070707]"
      >
        <div className="absolute top-12 left-6 z-10 md:top-24 md:left-24">
          <p className="mb-3 font-space-grotesk text-xs uppercase tracking-[0.3em] text-[#B6FF1E]">
            4 records · 2017 — 2024
          </p>
          <h2 className="font-anton text-4xl uppercase tracking-wider text-[#F4F4F4] md:text-6xl">
            <ScrambleText text="DISCOGRAPHY" />
          </h2>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex h-[72vh] items-center gap-12 px-[10vw] pt-24 md:gap-24 md:px-[25vw]"
        >
          {albums.map((album, i) => (
            <a
              key={i}
              href={album.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group relative block w-[72vw] flex-shrink-0 md:w-[32vw]"
            >
              <motion.div
                whileHover={{ scale: 0.97, rotate: 1.5 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative aspect-square w-full overflow-hidden border border-white/10 bg-[#0C0C0C]"
              >
                <img
                  src={album.image}
                  alt={`Billie Eilish — ${album.title}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-80 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#B6FF1E]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* index + latest */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between">
                  <span className="font-anton text-xl text-white/50">{String(i + 1).padStart(2, "0")}</span>
                  {album.latest && (
                    <span className="rounded-full bg-[#B6FF1E] px-2.5 py-1 font-space-grotesk text-[10px] font-bold uppercase tracking-[0.15em] text-[#070707]">
                      Latest
                    </span>
                  )}
                </div>

                {/* play on hover */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B6FF1E] text-[#070707] transition-transform duration-500 group-hover:scale-100 scale-90">
                    <Play className="h-6 w-6 translate-x-[2px]" fill="currentColor" />
                  </div>
                </div>
              </motion.div>

              <div className="mt-6 flex flex-col gap-2">
                <span className="font-space-grotesk text-sm font-bold text-[#B6FF1E]">
                  {album.year} · {album.tracks} tracks
                </span>
                <h3 className="font-anton text-2xl uppercase leading-none tracking-wide text-[#F4F4F4] md:text-3xl">
                  {album.title}
                </h3>
                <span className="font-space-grotesk text-sm text-[#777]">
                  <span className="text-[#B6FF1E]">♪</span> {album.single}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Listen — real Billie Eilish tracks from Spotify */}
      <div className="w-full bg-[#070707] px-6 pb-32 md:px-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-space-grotesk text-xs uppercase tracking-[0.3em] text-[#B6FF1E]">Press play</p>
              <h3 className="font-anton text-4xl uppercase leading-none text-[#F4F4F4] md:text-6xl">Listen now</h3>
            </div>
            <p className="max-w-xs font-space-grotesk text-sm text-[#777] md:text-right">
              Real tracks streamed straight from Spotify. Tap any record above to open it.
            </p>
          </div>

          <div ref={playerRef} className="overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl">
            {playerInView ? (
              <iframe
                title="Billie Eilish on Spotify"
                src="https://open.spotify.com/embed/artist/6qqNVTkY8uBg9cP3Jd7DAH?utm_source=generator&theme=0"
                width="100%"
                height="380"
                loading="lazy"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                style={{ display: "block" }}
              />
            ) : (
              <div className="flex h-[380px] items-center justify-center font-space-grotesk text-xs uppercase tracking-[0.3em] text-[#777]">
                Spotify player
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
