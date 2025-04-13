'use client';

import { useEffect } from 'react';
import { setupAnimations } from '@/utils/animations';

// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import { DataMarketing } from "./data-marketing";
import WhyChooseUs from "./why-choose-us";
import CarouselFeatures from "./carousel-features";
import Pricing from "./solution";
import { GoodCase } from "./good-case";

export default function Campaign() {
  useEffect(() => {
    setupAnimations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="fade-in">
        <Hero />
      </div>
      <div className="fade-in">
        <DataMarketing />
      </div>
      <div className="fade-in">
        <WhyChooseUs />
      </div>
      <CarouselFeatures />
      <div className="fade-in">
        <Pricing />
      </div>
      <div className="fade-in">
        <GoodCase />
      </div>
      <Footer />
    </>
  );
}
