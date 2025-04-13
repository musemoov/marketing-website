"use client";

import Image from "next/image";
import React from "react";
import { Typography, Carousel } from "@material-tailwind/react";

const TESTIMONIALS = [
  {
    content: "MaBle과 함께한 6개월, 우리 브랜드의 디지털 전환점이었습니다. 데이터 기반의 전략 수립부터 실행까지, 모든 과정이 투명하고 효과적이었습니다.",
    author: "김성준",
    position: "패션 브랜드 마케팅 담당",
    company: "FASHION TREND",
    logo: "/logos/fashion_trend.png"
  },
  {
    content: "소셜 미디어 운영이 고민이었는데, MaBle의 전략적인 접근 방식 덕분에 팔로워 수가 3배 증가했고, 실제 매출 상승으로 이어졌습니다.",
    author: "이지현",
    position: "디지털 마케팅 팀장",
    company: "BEAUTY PLUS",
    logo: "/logos/beauty_plus.png"
  },
  {
    content: "경쟁이 치열한 이커머스 시장에서 MaBle의 차별화된 마케팅 전략으로 신규 고객 유입이 150% 증가했습니다.",
    author: "박민우",
    position: "이커머스 사업부 대표",
    company: "SHOP MASTER",
    logo: "/logos/shop_master.png"
  }
];

export function CarouselFeatures() {
  return (
    <section className="relative px-8 py-20">
      <div 
        className="absolute inset-0 w-full h-full bg-fixed"
        style={{
          backgroundImage: 'url("/image/carousel-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 w-full h-full bg-black/70" />
      <div className="container mx-auto relative z-10">
        <div className="flex mb-16 flex-col items-center">
          <Typography variant="h2" className="text-center mb-2 text-white">
            파트너사 후기
          </Typography>
          <Typography
            variant="lead"
            className="mb-3 w-full text-center font-normal text-gray-300 lg:w-8/12"
          >
            MaBle과 함께 성장한 파트너사들의 이야기를 들어보세요
          </Typography>
        </div>
        
        <div className="relative mx-auto max-w-5xl">
          <Carousel
            className="rounded-xl"
            autoplay={true}
            autoplayDelay={2000}
            loop={true}
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-2 w-2 cursor-pointer rounded-full transition-colors content-[''] ${
                      activeIndex === i ? "bg-blue-500" : "bg-blue-gray-200"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {TESTIMONIALS.map((testimonial, i) => (
              <div
                key={i}
                className="relative flex flex-col md:flex-row items-center gap-8 px-8 py-12 bg-white rounded-xl shadow-lg mx-4"
              >
                <div className="flex-1 space-y-6">
                  <Typography
                    variant="lead"
                    color="blue-gray"
                    className="text-lg font-normal italic"
                  >
                    "{testimonial.content}"
                  </Typography>
                  <div className="flex items-center gap-4">
                    <div>
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-1"
                      >
                        {testimonial.author}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal opacity-70"
                      >
                        {testimonial.position}
                        <br />
                        {testimonial.company}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex justify-center items-center">
                  <Image
                    width={180}
                    height={60}
                    src={testimonial.logo}
                    alt={`${testimonial.company} 로고`}
                    className="object-cover opacity-80"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default CarouselFeatures;