"use client";

import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { ChartBarIcon, CursorArrowRaysIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";

const SERVICE_PACKAGES = [
  {
    icon: ChartBarIcon,
    title: "데이터 기반 마케팅",
    description: "데이터 분석을 통한 인사이트 도출부터 전략 수립, 실행까지 원스톱 솔루션을 제공합니다.",
    features: [
      "시장 및 경쟁사 분석",
      "타겟 고객 분석",
      "마케팅 KPI 설정",
      "실시간 데이터 대시보드",
      "월간 성과 리포트"
    ]
  },
  {
    icon: CursorArrowRaysIcon,
    title: "디지털 퍼포먼스",
    description: "검증된 광고 전략과 크리에이티브로 브랜드의 성장을 가속화합니다.",
    features: [
      "SNS 채널 운영",
      "콘텐츠 기획 및 제작",
      "퍼포먼스 광고 운영",
      "리타겟팅 전략",
      "전환율 최적화"
    ]
  },
  {
    icon: RocketLaunchIcon,
    title: "브랜드 성장 전략",
    description: "브랜드의 가치를 높이는 통합 마케팅 전략을 제시합니다. 브랜드 포지셔닝, 브랜드 스토리텔링, 브랜드 인지도 강화",
    features: [
      "브랜드 포지셔닝",
      "마케팅 전략 수립",
      "브랜드 스토리텔링",
      "미디어 믹스 전략",
      "브랜드 인지도 강화"
    ]
  }
];

export function Solution() {
  return (
    <section className="relative px-8 py-20">
      {/* 배경 이미지와 오버레이 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/data-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/90 via-gray-800/70 to-gray-800/90" />
      </div>

      {/* 기존 컨텐츠를 z-10으로 설정하여 배경 위에 표시 */}
      <div className="container relative z-10 mx-auto mb-20">
        <div className="text-center">
          <Typography 
            variant="h2" 
            color="white" 
            className="mb-4 animate-fade-down animate-once animate-duration-[800ms] animate-delay-100 animate-ease-in-out"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            맞춤형 마케팅 솔루션
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full px-4 !text-white/80 lg:w-6/12 animate-fade-up animate-once animate-duration-[800ms] animate-delay-200 animate-ease-in-out"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            각 브랜드의 특성과 목표에 맞는 최적의 마케팅 솔루션을 제공합니다.<br />
            지금 바로 무료 상담을 신청하세요.
          </Typography>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {SERVICE_PACKAGES.map(({ icon: Icon, title, description, features }, i) => (
            <Card 
              key={i} 
              className={`border border-blue-gray-50 animate-fade-right animate-once animate-duration-[800ms] ${
                i === 0 ? 'animate-delay-200' : i === 1 ? 'animate-delay-400' : 'animate-delay-600'
              } animate-ease-in-out hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <CardBody 
                className="p-8"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <div className="mb-6 grid place-items-center">
                  <div className="rounded-full bg-blue-gray-50/50 p-6">
                    <Icon className="h-8 w-8 text-blue-gray-900" />
                  </div>
                </div>
                <Typography 
                  variant="h5" 
                  color="blue-gray" 
                  className="mb-4 text-center"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  {title}
                </Typography>
                <Typography 
                  className="text-center font-normal !text-gray-500"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  {description}
                </Typography>
                <div className="mt-8 border-t border-blue-gray-50 pt-8">
                  <ul className="space-y-4">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <span className="rounded-full bg-blue-gray-50/50 p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-3 w-3 text-blue-gray-900"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                        <Typography 
                          className="font-normal !text-gray-500"
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          {feature}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 text-center">
                  <Button
                    variant="gradient"
                    size="lg"
                    color="gray"
                    className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 animate-pulse animate-infinite animate-duration-[2000ms]"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    무료 상담 신청
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Solution;
