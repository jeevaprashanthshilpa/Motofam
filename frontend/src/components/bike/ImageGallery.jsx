import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ images = [] }) {
  const defaultImage = "/assets/images/placeholder-bike.png";
  const imageList = images && images.length > 0 ? images : [defaultImage];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Active Image View */}
      <div className="relative h-72 sm:h-96 bg-surface-card border border-surface-border rounded-xl overflow-hidden shadow-sm">
        <img
          src={imageList[currentIndex]}
          alt={`Bike view ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
        />
        
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous Image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-neutral-900/80 hover:bg-surface-primary text-white p-2 rounded-full shadow transition cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-neutral-900/80 hover:bg-surface-primary text-white p-2 rounded-full shadow transition cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Selection Row */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                currentIndex === idx
                  ? "border-surface-primary shadow-md scale-105"
                  : "border-surface-border opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}