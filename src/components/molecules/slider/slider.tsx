import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useArrowButton } from "./slider.hooks";

export default function Slider({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
    align: "start",
    dragFree: false,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useArrowButton(emblaApi);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          style={{
            backfaceVisibility: "hidden",
            display: "flex",
            touchAction: "pan-y",
            marginLeft: "calc(12px * -1)",
            maxHeight: 400,
          }}
        >
          {images.map((src, index) => (
            <div
              className="flex-[0_0_30%] md:flex-[0_0_20%] lg:flex-[0_0_14%] pl-3"
              key={index}
            >
              <img
                src={src}
                alt={`Movie ${index}`}
                className="h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {!prevBtnDisabled && (
        <button
          onClick={onPrevButtonClick}
          className="absolute left-0 top-0 h-full z-10 bg-pink-500/30 hover:bg-pink-500/50 p-2 lg:p-4 cursor-pointer"
        >
          <ChevronLeft className="text-white" />
        </button>
      )}
      {!nextBtnDisabled && (
        <button
          onClick={onNextButtonClick}
          className="absolute right-0 top-0 h-full z-10 bg-pink-500/30 hover:bg-pink-500/50 p-2 lg:p-4 cursor-pointer"
        >
          <ChevronRight className="text-white" />
        </button>
      )}
    </div>
  );
}
