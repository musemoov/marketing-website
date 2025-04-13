import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";

interface BackgroundCardProps {
  title: string;
  children: React.ReactNode;
  image?: string;
  video?: string;
  position?: "left" | "right";
}

export function BackgroundCard({ 
  title, 
  children, 
  image, 
  video, 
  position = "left" 
}: BackgroundCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleEl = cardRef.current?.querySelector('.card-title');
    const textEl = cardRef.current?.querySelector('.card-text');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === cardRef.current) {
              // 카드가 보이면 내부 요소에 애니메이션 클래스 추가
              if (titleEl && textEl) {
                if (position === "left") {
                  titleEl.classList.add("animate-fade-in-right");
                  setTimeout(() => {
                    textEl.classList.add("animate-fade-in-right");
                  }, 200);
                } else {
                  titleEl.classList.add("animate-fade-in-left");
                  setTimeout(() => {
                    textEl.classList.add("animate-fade-in-left");
                  }, 200);
                }
              }
            }
          } else {
            // 카드가 화면에서 벗어나면 애니메이션 클래스 제거
            if (entry.target === cardRef.current && titleEl && textEl) {
              titleEl.classList.remove("animate-fade-in-right", "animate-fade-in-left");
              textEl.classList.remove("animate-fade-in-right", "animate-fade-in-left");
            }
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [position]);

  return (
    <div ref={cardRef} className="relative w-full min-h-[400px] bg-gray-900 rounded-xl overflow-hidden">
      {video ? (
        <div className="absolute inset-0">
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ) : image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-32">
        <div className="card-title opacity-0 w-full">
          <Typography 
            variant="h2" 
            className="text-center mb-2" 
            color="white"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {title}
          </Typography>
        </div>
        <div className="card-text opacity-0 w-full">
          <Typography
            color="white"
            className="text-base w-full text-center font-normal whitespace-pre-line"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {children}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default BackgroundCard;