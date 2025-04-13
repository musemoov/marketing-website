"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  InboxIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";

import FeatureCard from "@/components/feature-card";

const FEATURES = [
  {
    icon: InboxIcon,
    title: "실전 중심 전략",
    description: "실제 브랜드 캠페인 데이터를 바탕으로 성과 중심의 데이터 마케팅을 설계합니다.",
  },
  {
    icon: LightBulbIcon,
    title: "비즈니스 성장 기회",
    description: "고객을 사로잡는 전략은 곧 매출로 이어집니다. 브랜드의 성장을 현실로 만드세요.",
  },
  {
    icon: CheckBadgeIcon,
    title: "유연한 운영 방식",
    description: "필요할 때 바로 실행 가능한 마케팅. 당신의 일정과 상황에 최적화된 전략을 제시합니다.",
  },
];

export function DataMarketing() {
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === imageRef.current) {
              entry.target.classList.add('slide-left');
            } else if (entry.target.classList.contains('feature-item')) {
              entry.target.classList.add('slide-up');
            } else {
              entry.target.classList.add('slide-down');
            }
          } else {
            if (entry.target === imageRef.current) {
              entry.target.classList.remove('slide-left');
            } else if (entry.target.classList.contains('feature-item')) {
              entry.target.classList.remove('slide-up');
            } else {
              entry.target.classList.remove('slide-down');
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    if (descRef.current) {
      observer.observe(descRef.current);
    }
    featureRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
      if (descRef.current) {
        observer.unobserve(descRef.current);
      }
      featureRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const setFeatureRef = (el: HTMLDivElement | null, index: number) => {
    featureRefs.current[index] = el;
  };

  return (
    <section className="py-28 px-8">
      <div className="container mx-auto grid grid-cols-1 place-items-center lg:grid-cols-3">
        <div className="col-span-1 rounded-xl lg:mb-0 mb-12 w-[85%] lg:h-[400px]">
          <div ref={imageRef} className="h-full">
            <div className="relative overflow-hidden rounded-[10px] h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/video/datas.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div className="col-span-2 lg:pl-24">
          <div ref={titleRef}>
            <Typography 
              variant="h2" 
              color="blue-gray" 
              className="mb-4"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              데이터로 증명하는 마케팅
            </Typography>
          </div>
          <div ref={descRef}>
            <Typography
              variant="lead"
              className="mb-5 max-w-lg px-4 text-left text-lg !text-gray-500 lg:px-0"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              기획부터 실행, 분석까지 브랜드의 성장을 이끄는 전 과정을 설계합니다.
              경험과 수치 기반 전략으로 최적의 결과를 만들어드립니다.
            </Typography>
          </div>

          <div className="col-span-2 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {FEATURES.map(({ icon, title, description }, index) => (
              <div 
                key={title} 
                className="feature-item opacity-0"
                ref={(el) => setFeatureRef(el, index)}
              >
                <FeatureCard icon={icon} title={title}>
                  {description}
                </FeatureCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

