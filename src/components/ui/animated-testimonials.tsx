
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-10", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <div className="relative h-80 w-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.src}
                className={cn(
                  "absolute inset-0 origin-bottom transition-all duration-500 ease-in-out",
                  isActive(index) 
                    ? "opacity-100 scale-100 z-50" 
                    : "opacity-70 scale-95 z-10 blur-sm"
                )}
                style={{
                  transform: isActive(index) 
                    ? 'translateY(0) rotate(0deg)' 
                    : `translateY(${Math.random() * 10}px) rotate(${Math.floor(Math.random() * 7) - 3}deg)`,
                }}
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="h-full w-full rounded-3xl object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <div
            key={active}
            className="transition-opacity duration-300"
          >
            <h3 className="text-2xl font-bold">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonials[active].designation}
            </p>
            <p className="text-lg text-muted-foreground mt-8">
              {testimonials[active].quote}
            </p>
          </div>
          <div className="flex gap-4 pt-8 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center group hover:bg-secondary/80 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center group hover:bg-secondary/80 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-5 w-5 group-hover:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
