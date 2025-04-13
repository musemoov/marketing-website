"use client";

import React, { useEffect, useRef } from "react";
import { Typography } from "@material-tailwind/react";
import {
  ChartPieIcon,
  CloudArrowDownIcon,
  CloudIcon,
  Cog6ToothIcon,
  KeyIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import BackgroundCard from "@/components/background-card";

interface OptionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  index: number;
  animationType?: 'fade-left' | 'fade-right';
}

function Option({ icon: Icon, title, children, index, animationType = 'fade-left' }: OptionProps) {
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (animationType === 'fade-left') {
              entry.target.classList.add('animate-fade-in-left');
            } else {
              entry.target.classList.add('animate-fade-in-right');
            }
          } else {
            entry.target.classList.remove('animate-fade-in-left', 'animate-fade-in-right');
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px" 
      }
    );

    if (optionRef.current) {
      observer.observe(optionRef.current);
    }

    return () => {
      if (optionRef.current) {
        observer.unobserve(optionRef.current);
      }
    };
  }, [animationType]);

  return (
    <div 
      ref={optionRef}
      className={`opacity-0 option-item-${index} flex gap-4`} 
    >
      <div className="mb-4">
        <Icon className="text-gray-900 h-6 w-6" />
      </div>
      <div>
        <Typography 
          variant="h5" 
          color="blue-gray" 
          className="mb-2"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          {title}
        </Typography>
        <Typography 
          className="mb-2 md:w-10/12 font-normal !text-gray-500"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          {children}
        </Typography>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-down');
          } else {
            entry.target.classList.remove('animate-fade-in-down');
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px" 
      }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
    };
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-10">
      <div ref={titleRef} className="opacity-0 w-full text-center">
        <Typography 
          variant="h2" 
          className="text-center mb-2" 
          color="blue-gray"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          왜 MaBle인가요?
        </Typography>
      </div>
      <div ref={subtitleRef} className="opacity-0 flex justify-center w-full">
        <Typography
          variant="lead"
          className="mb-16 inline-block text-center font-normal !text-gray-500 whitespace-nowrap"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          수많은 마케팅 대행사 사이, 우리가 선택받는 이유를 지금 확인해보세요.
        </Typography>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24">
          <div className="flex items-center justify-center w-full">
            <BackgroundCard 
              title="검증된 마케팅 전문가" 
              video="/video/why-choose.mp4"
              position="left"
            >
              {`수많은 실전 프로젝트를 경험한 
업계 실무진이 직접 전략을 제시합니다.`}
            </BackgroundCard>
          </div>
          <div className="space-y-8">
            <div className="my-4">
              <Option icon={CloudIcon} title="브랜드 기초 설계" index={0} animationType="fade-left">
                기초부터 탄탄하게. 브랜드의 방향성과
                기본 전략 구조를 정확히 설계합니다.
              </Option>
            </div>
            <div className="mb-4 flex gap-4">
              <Option icon={ChartPieIcon} title="고객과의 연결고리" index={1} animationType="fade-left">
                데이터 흐름을 분석해 고객의 니즈를 파악하고,
                브랜드 메시지를 효과적으로 전달합니다.
              </Option>
            </div>
            <Option icon={Cog6ToothIcon} title="반응하는 마케팅 구조" index={2} animationType="fade-left">
              캠페인의 흐름을 주도하며
              브랜드의 행동 전략을 유연하게 조율합니다.
            </Option>
          </div>
        </div>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-8">
            <div className="my-4">
              <Option icon={KeyIcon} title="브랜드의 일관된 흐름" index={3} animationType="fade-right">
                고객 여정의 각 지점을 자연스럽게 연결해
                끊김 없는 브랜드 경험을 설계합니다.
              </Option>
            </div>
            <div className="mb-4 flex gap-4">
              <Option icon={UsersIcon} title="데이터 중심 전략 설계" index={4} animationType="fade-right">
                고객 반응을 정교하게 수집·해석하여
                더 나은 마케팅 결정을 이끌어냅니다.
              </Option>
            </div>
            <Option icon={CloudArrowDownIcon} title="성과를 만드는 구조 관리" index={5} animationType="fade-right">
              캠페인 전반의 흐름을 체계적으로 관리하며
              성과 중심의 마케팅을 구현합니다.
            </Option>
          </div>
          <div className="flex items-center justify-center w-full">
            <BackgroundCard 
              title="함께 성장하는 파트너십" 
              video="/video/why-choose02.mp4"
              position="right"
            >
              {`고객과의 긴밀한 소통을 통해
              더 나은 전략을 함께 만들어갑니다.`}
            </BackgroundCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
