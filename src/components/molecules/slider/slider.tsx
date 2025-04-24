import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardMovie from "../../atoms/card-movie";
import { useArrowButton } from "./slider.hooks";
import { SliderProps } from "./slider.types";

export default function Slider(props: SliderProps) {
  const { data, title } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
    align: "start",
    dragFree: true,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useArrowButton(emblaApi);

  return (
    <section className="px-4 lg:px-10 mb-8">
      <h2 className="font-medium text-sm lg:text-xl underline decoration-pink-500 underline-offset-3 lg:underline-offset-4">
        {title}
      </h2>
      <div className="relative mt-3 lg:mt-4">
        <div className="overflow-x-hidden" ref={emblaRef}>
          <div className="backface-hidden flex touch-pan-y ml-[calc(4px*-1)] lg:ml-[calc(12px*-1)]">
            {data.map((d, index) => (
              <CardMovie
                key={index}
                className="flex-[0_0_30%] md:flex-[0_0_20%] xl:flex-[0_0_13%] ml-1 lg:ml-3"
                data={d}
              />
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
    </section>
  );
}
