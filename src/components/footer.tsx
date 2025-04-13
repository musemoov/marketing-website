"use client";

import { Typography, Button, Input } from "@material-tailwind/react";

const LINKS = [
  {
    title: "회사 소개",
    items: ["회사 소개", "채용 정보", "파트너십", "블로그"],
  },
  {
    title: "서비스",
    items: ["디지털 마케팅", "브랜드 전략", "콘텐츠 제작", "광고 운영"],
  },
  {
    title: "고객 지원",
    items: ["이용약관", "개인정보처리방침", "자주 묻는 질문", "문의하기"],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="px-8 pt-24 pb-8 bg-gray-50">
      <div className="container max-w-6xl flex flex-col mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 !w-full">
          <div className="flex col-span-2 items-start gap-10 mb-10 lg:mb-0 md:gap-36">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      className="py-1 font-normal !text-gray-700 transition-colors hover:!text-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="">
            <Typography variant="h6" className="mb-3 text-left">
              뉴스레터 구독
            </Typography>
            <Typography className="!text-gray-500 font-normal mb-4 text-base">
              마케팅 인사이트와 최신 트렌드 정보를 매주 받아보세요.
              구독자 전용 특별 혜택도 제공됩니다.
            </Typography>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="w-full">
                <div className="flex gap-2">
                  {/* @ts-ignore */}
                  <Input
                    label="이메일"
                    color="gray"
                    className="!h-11"
                    containerProps={{
                      className: "min-w-[240px]"
                    }}
                  />
                  <Button 
                    color="gray" 
                    className="h-11 px-6 min-w-[120px] whitespace-nowrap"
                    size="md"
                  >
                    구독하기
                  </Button>
                </div>
                <Typography className="font-medium mt-3 !text-sm !text-gray-500 text-left">
                  <a
                    href="#"
                    className="font-bold underline hover:text-gray-900 transition-colors"
                  >
                    개인정보처리방침
                  </a>
                  에 동의합니다.
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <Typography
            color="blue-gray"
            className="font-normal !text-gray-700 mb-4 md:mb-0"
          >
            &copy; {CURRENT_YEAR} MaBle Marketing. All rights reserved.
          </Typography>
          <div className="flex gap-4">
            <Typography
              as="a"
              href="tel:02-1234-5678"
              className="font-normal !text-gray-700"
            >
              Tel: 02-1234-5678
            </Typography>
            <Typography
              as="a"
              href="mailto:contact@mable.co.kr"
              className="font-normal !text-gray-700"
            >
              Email: contact@mable.co.kr
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
