import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MusicCard from "./MusicCard";
import type { MusicItem } from "../lib/spotify-data";

interface SectionRowProps {
  title: string;
  items: MusicItem[];
  isArtist?: boolean;
  isRadio?: boolean;
  isChart?: boolean;
}

export default function SectionRow({
  title,
  items,
  isArtist = false,
  isRadio = false,
  isChart = false,
}: SectionRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [items]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer tracking-tighter">
          {title}
        </h2>
        <button className="text-xs font-bold text-[#a7a7a7] hover:text-white transition-colors uppercase tracking-widest">
          Show all
        </button>
      </div>

      {/* Carousel wrapper */}
      <div className="relative group">
        {/* Left button */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-[40%] -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 bg-[#2a2a2a] hover:bg-[#3e3e3e] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item) => (
            <div key={item.id} style={{ scrollSnapAlign: "start" }} className="flex-shrink-0">
              <MusicCard
                title={item.title || item.name || ""}
                subtitle={
                  isArtist
                    ? item.type || "Artist"
                    : isRadio || isChart
                    ? item.description || ""
                    : item.artist || item.description || ""
                }
                // PERBAIKAN
                image={item.cover || item.image || ""} 
                isRound={isArtist}
                gradient={item.gradient}
                label={item.label}
                isChart={isChart}
              />
            </div>
          ))}
        </div>

        {/* Right button */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-0 top-[40%] -translate-y-1/2 translate-x-4 z-10 w-8 h-8 bg-[#2a2a2a] hover:bg-[#3e3e3e] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </section>
  );
}