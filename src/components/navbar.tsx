"use client";

import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

// 메뉴 데이터 구성
const MENU_ITEMS = {
  "서비스": [
    "브랜드 전략",
    "퍼포먼스 마케팅",
    "컨텐츠 마케팅",
    "바이럴 캠페인",
    "광고 대행"
  ],
  "성과보기": [
    "브랜드 캠페인",
    "SNS 마케팅 사례",
    "영상/컨텐츠 제작"
  ],
  "솔루션": [
    "마케팅 자동화",
    "데이터 기반 분석",
    "고객 맞춤 전략"
  ],
  "후기모음": [
    "실제 클라이언트의 후기 및 평가",
  ],
  "인사이트": [
    "트렌드 리포트",
    "성공하는 광고의 비밀",
    "브랜드 사례 분석",
  ],
  "회사소개": [
    "About Us",
    "팀 소개",
    "협업 파트너",
    "오시는 길"
  ],
  "상담신청": [
    "마케팅 시작하기",
    "프로젝트 문의",
  ]
};

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
  items?: string[];
  style?: React.CSSProperties;
}

function NavItem({ children, href, items, style }: NavItemProps) {
  const isReviews = children === "후기모음";
  
  return (
    <li className="relative w-[100px] group" style={style}>
      <div className="relative">
        <Typography
          as="a"
          href={isReviews ? "/reviews" : (href || "#")}
          target={href ? "_blank" : "_self"}
          variant="paragraph"
          className="font-medium text-lg py-2 px-3 block w-full text-center whitespace-nowrap"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          {children}
        </Typography>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4f07ba] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
      </div>
      {items && (
        <div className="absolute left-1/2 -translate-x-1/2 w-[240px] bg-white shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-200">
          <div className="py-3">
            {items.map((item, index) => (
              <a
                key={index}
                href={isReviews ? "/reviews" : "#"}
                className="block px-6 py-2.5 text-sm text-gray-700 hover:text-[#4f07ba] transition-colors whitespace-nowrap text-center"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div 
        className={`w-full transition-colors duration-300 ${
          isHovered || isScrolling ? 'bg-white' : 'bg-transparent'
        }`}
      >
        <MTNavbar
          fullWidth
          shadow={false}
          blurred={false}
          color={isHovered || isScrolling ? "white" : "transparent"}
          className="border-0"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <div className="container mx-auto flex items-center justify-between">
            <Typography 
              as="a"
              href="/"
              variant="h4" 
              color={isHovered || isScrolling ? "blue-gray" : "white"}
              className="text-2xl font-bold mr-8 transition-transform duration-300 hover:scale-110"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              MaBle
            </Typography>
            <div 
              className="relative flex-1 px-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ul
                className={`mx-auto flex items-center justify-center gap-4 lg:flex transition-[gap,color] duration-300 ease-in-out ${
                  isHovered || isScrolling ? "text-gray-900" : "text-white"
                } ${isHovered ? 'gap-6' : 'gap-4'}`}
              >
                {Object.entries(MENU_ITEMS).map(([title, items], index) => (
                  <NavItem 
                    key={title} 
                    items={items}
                    style={{
                      transition: 'transform 300ms ease-in-out',
                      transform: isHovered 
                        ? `translateX(${(index - Math.floor(Object.keys(MENU_ITEMS).length / 2)) * 12}px)` 
                        : 'translateX(0)'
                    }}
                  >
                    {title}
                  </NavItem>
                ))}
              </ul>
            </div>
            <IconButton
              variant="text"
              color={isScrolling ? "gray" : "white"}
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
            <Button 
              variant="gradient"
              color="white" 
              size="sm" 
              className={`text-base font-bold px-6 py-2.5 ml-8 rounded-[25px] bg-white/5 backdrop-blur-md border ${isHovered || isScrolling ? 'border-black/20 text-black' : 'border-white/20 text-white'} 
              shadow-lg transition-all duration-300 hover:bg-white hover:text-gray-900 
              hover:scale-105 hover:shadow-white/20`}
              onClick={() => window.location.href = '/reservation'}
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <span className="pt-0.5 block">예약하기</span>
            </Button>
          </div>
          <Collapse open={open}>
            <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
              <ul className="flex flex-col gap-4 text-black-900">
                {Object.keys(MENU_ITEMS).map((title) => (
                  <NavItem key={title}>{title}</NavItem>
                ))}
              </ul>
              <div className="mt-4">
                <Button color="gray" size="sm" className="w-full">
                  예약하기
                </Button>
              </div>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

export default Navbar;
