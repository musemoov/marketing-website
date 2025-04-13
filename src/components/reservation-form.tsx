"use client";

import { useState } from "react";
import { Typography, Card, Input, Button, Checkbox } from "@material-tailwind/react";

export function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-200 to-purple-200 relative overflow-hidden py-12">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-50 -right-32 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-3000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-5000"></div>
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-sky-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-10 left-1/4 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <Typography variant="h2" className="text-center mb-2 text-4xl font-bold text-gray-800">
          상담 예약
        </Typography>
        <Typography className="text-center mb-8 text-gray-600">
          전문가와의 1:1 상담을 예약하세요
        </Typography>
        
        <Card className="max-w-xl mx-auto backdrop-blur-md bg-white/40 border border-white/50 shadow-xl rounded-2xl">
          <form 
            action="https://formsubmit.co/musemoov@naver.com" 
            method="POST"
            className="flex flex-col gap-6 p-8"
          >
            <input type="hidden" name="_subject" value="새로운 상담 예약이 접수되었습니다." />
            <input type="hidden" name="_next" value="http://localhost:3000/thanks" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div>
              <Typography variant="h6" className="mb-3 font-semibold text-gray-700">
                기본 정보
              </Typography>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  name="name"
                  label="이름"
                  size="lg"
                  crossOrigin="anonymous"
                  className="!border-gray-300 text-gray-700 bg-white/50"
                  labelProps={{className: 'text-gray-700'}}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  label="이메일"
                  size="lg"
                  crossOrigin="anonymous"
                  className="!border-gray-300 text-gray-700 bg-white/50"
                  labelProps={{className: 'text-gray-700'}}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
                <Input
                  type="tel"
                  name="phone"
                  label="연락처"
                  size="lg"
                  crossOrigin="anonymous"
                  className="!border-gray-300 text-gray-700 bg-white/50"
                  labelProps={{className: 'text-gray-700'}}
                  required
                />
              </div>
            </div>
            
            <div>
              <Typography variant="h6" className="mb-3 font-semibold text-gray-700">
                상담 희망 일시
              </Typography>
              <div className="flex flex-col gap-4">
                <Input
                  type="date"
                  name="date"
                  label="날짜"
                  size="lg"
                  crossOrigin="anonymous"
                  className="!border-gray-300 text-gray-700 bg-white/50"
                  labelProps={{className: 'text-gray-700'}}
                  required
                />
                <Input
                  type="time"
                  name="time"
                  label="시간"
                  size="lg"
                  crossOrigin="anonymous"
                  className="!border-gray-300 text-gray-700 bg-white/50"
                  labelProps={{className: 'text-gray-700'}}
                  required
                />
              </div>
            </div>
            
            <div>
              <Typography variant="h6" className="mb-3 font-semibold text-gray-700">
                상담 내용
              </Typography>
              <Input
                type="text"
                name="subject"
                label="상담 주제"
                size="lg"
                className="mb-4 !border-gray-300 text-gray-700 bg-white/50"
                crossOrigin="anonymous"
                labelProps={{className: 'text-gray-700'}}
                required
              />
              <textarea
                name="content"
                className="w-full h-32 rounded-lg p-3 bg-white/50 border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="상담하고 싶은 내용을 자세히 적어주세요"
                required
              />
            </div>
            
            <Checkbox
              name="agreement"
              label={
                <Typography className="flex items-center font-normal text-gray-700">
                  개인정보 수집 및 이용에 동의합니다
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
              crossOrigin="anonymous"
              className="checked:bg-purple-300 border-gray-300"
              required
            />
            
            <Button 
              type="submit"
              size="lg" 
              className="mt-6 bg-[#5a25a8] hover:bg-[#4a1d8a] text-white shadow-lg transition-colors duration-300" 
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "예약 처리 중..." : "예약하기"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
} 