'use client';

import { Suspense, useState } from 'react';
import AboutSection from '../components/AboutSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import HeroSection from '../components/HeroSection';
import Layout from '../components/Layout';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TrackingSection from '../components/TrackingSection';
import { HeroTrackingData } from '../interfaces/TrackingDataInterface';


export default function Page() {
  const [heroTrackingData, setHeroTrackingData] = useState<HeroTrackingData | null>(null);

  const handleTrackingFromHero = (data: HeroTrackingData) => {
    console.log('Page received tracking data from Hero:', data);
    setHeroTrackingData(data);
  };


  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection onTrackingSuccess={handleTrackingFromHero} />
        <AboutSection />
        <ServicesSection />
        <TrackingSection heroTrackingData={heroTrackingData} />
        <TestimonialsSection />
        <ContactSection />
        <BlogSection />
      </Suspense>
    </Layout>
  );
}
