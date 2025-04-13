"use client";

import { useEffect, useRef } from "react";
import { Typography, Card, CardBody, Avatar } from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/components";

const REVIEWS = [
  {
    name: "김서연",
    position: "스타트업 대표",
    image: "/image/reviews/avatar1.png",
    rating: 5,
    review: "데이터 기반의 마케팅 전략이 정말 인상적이었습니다. 실제로 고객 전환율이 30% 이상 상승했고, ROI도 크게 개선되었습니다. 특히 실시간으로 대응하는 운영 방식이 매우 만족스러웠습니다."
  },
  {
    name: "이준호",
    position: "온라인 쇼핑몰 운영자",
    image: "/image/reviews/avatar2.png",
    rating: 5,
    review: "브랜드의 방향성을 정확히 이해하고 그에 맞는 전략을 제시해주셨습니다. 소셜미디어 채널 운영이 체계적으로 변화되었고, 팔로워 수가 3배 이상 증가했습니다."
  },
  {
    name: "박민지",
    position: "중소기업 마케팅 팀장",
    image: "/image/reviews/avatar3.png",
    rating: 5,
    review: "전문적인 컨설팅과 실행력이 돋보였습니다. 기존에 고민이었던 브랜드 인지도 문제가 크게 개선되었고, 영업팀과의 협업도 더욱 수월해졌습니다."
  }
];

export default function Reviews() {
  const reviewRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          } else {
            entry.target.classList.remove('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    reviewRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      reviewRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const setReviewRef = (el: HTMLDivElement | null, index: number) => {
    reviewRefs.current[index] = el;
  };

  return (
    <>
      <Navbar />
      <section className="relative px-8 py-32 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <Typography 
              variant="h2" 
              color="white" 
              className="mb-4"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              고객 후기
            </Typography>
            <Typography 
              variant="lead" 
              color="white" 
              className="opacity-80"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              실제 클라이언트의 후기 및 평가를 확인하세요
            </Typography>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review, index) => (
              <div
                key={review.name}
                ref={(el) => setReviewRef(el, index)}
                className="opacity-0"
              >
                <Card 
                  className="h-full"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <CardBody
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    <div className="mb-6 flex items-center gap-4">
                      <Avatar
                        src={review.image}
                        alt={review.name}
                        size="lg"
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                      />
                      <div>
                        <Typography 
                          variant="h6" 
                          color="blue-gray"
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          {review.name}
                        </Typography>
                        <Typography 
                          color="blue-gray" 
                          className="font-normal"
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          {review.position}
                        </Typography>
                      </div>
                    </div>
                    <div className="mb-4 flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                      ))}
                    </div>
                    <Typography 
                      className="font-normal text-blue-gray-500"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      {review.review}
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
} 