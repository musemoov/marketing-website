"use client";

import { Typography } from "@material-tailwind/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { TypographyProps } from "@material-tailwind/react";

const CASE_STUDIES = [
  {
    img: "/image/cases/case1.jpg",
    category: "브랜드 마케팅",
    title: "신규 브랜드 런칭 성공 사례",
    desc: "3개월 만에 브랜드 인지도 45% 상승, 소셜미디어 팔로워 250% 증가 달성",
    stats: {
      engagement: "+180%",
      conversion: "+45%",
      revenue: "+125%"
    }
  },
  {
    img: "/image/cases/case2.jpg",
    category: "퍼포먼스 마케팅",
    title: "이커머스 매출 성장 사례",
    desc: "데이터 기반 타겟팅으로 광고 효율 200% 개선, 월 매출 3억 달성",
    stats: {
      roas: "350%",
      ctr: "+85%",
      sales: "3억+"
    }
  },
  {
    img: "/image/cases/case3.jpg",
    category: "콘텐츠 마케팅",
    title: "바이럴 마케팅 성공 사례",
    desc: "유튜브 숏폼 콘텐츠로 MZ세대 타겟 인게이지먼트 300% 증가",
    stats: {
      views: "100만+",
      shares: "+240%",
      followers: "+180%"
    }
  },
  {
    img: "/image/cases/case4.jpg",
    category: "통합 마케팅",
    title: "브랜드 리포지셔닝 사례",
    desc: "전략적 브랜드 리뉴얼로 기존 고객 유지율 강화 및 신규 고객층 확보",
    stats: {
      retention: "+75%",
      awareness: "+120%",
      growth: "+95%"
    }
  },
];

export function GoodCase() {
  return (
    <section className="px-8 py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="mb-20 text-center">
          <Typography
            as="h2"
            variant="h2"
            color="blue-gray"
            className="mb-4"
          >
            성공 사례
          </Typography>
          <Typography
            as="p"
            variant="lead"
            className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12"
          >
            MaBle과 함께 성장한 브랜드들의 실제 성공 사례를 확인하세요
          </Typography>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {CASE_STUDIES.map((study, idx) => (
            <div 
              key={idx} 
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={study.img}
                  alt={study.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/70" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="mb-2">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white">
                      {study.category}
                    </span>
                  </div>
                  <Typography
                    as="h5"
                    variant="h5"
                    className="text-white"
                  >
                    {study.title}
                  </Typography>
                </div>
              </div>
              <div className="p-6">
                <Typography
                  as="p"
                  className="mb-4 font-normal !text-gray-500"
                >
                  {study.desc}
                </Typography>
                <div className="flex justify-between border-t border-blue-gray-50 pt-4">
                  {Object.entries(study.stats).map(([key, value], i) => (
                    <div key={i} className="text-center">
                      <Typography
                        as="p"
                        className="mb-1 text-xl font-bold text-blue-gray-900"
                      >
                        {value}
                      </Typography>
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal !text-gray-500"
                      >
                        {key}
                      </Typography>
                    </div>
                  ))}
                </div>
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-gray-50/50 py-3 text-sm font-medium text-blue-gray-900 transition-colors hover:bg-blue-gray-50">
                  자세히 보기
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


