"use client";

import { Typography, Card, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function ThanksPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-200 to-purple-200 relative overflow-hidden py-12">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-50 -right-32 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <Card className="max-w-xl mx-auto backdrop-blur-md bg-white/40 border border-white/50 shadow-xl rounded-2xl p-8 text-center">
          <Typography variant="h2" className="text-3xl font-bold text-gray-800 mb-4">
            예약이 완료되었습니다
          </Typography>
          
          <Typography className="text-gray-600 mb-8">
            상담 예약해 주셔서 감사합니다.<br />
            빠른 시일 내에 연락드리도록 하겠습니다.
          </Typography>
          
          <Button
            size="lg"
            className="bg-[#5a25a8] hover:bg-[#4a1d8a] text-white shadow-lg transition-colors duration-300"
            onClick={() => router.push("/")}
          >
            홈으로 돌아가기
          </Button>
        </Card>
      </div>
    </section>
  );
} 