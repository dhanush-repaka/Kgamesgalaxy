import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SplashCursor from '../components/SplashCursor';
import FeaturedGames from '../components/FeaturedGames';
import LatestGames from '../components/LatestGames';
import Announcements from '../components/Announcements';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ui/scroll-reveal';

const HomePage = () => {
  useEffect(() => {
    document.title = "Karthikeya's Games Galaxy - Don't be bored , get ON-BOARD";
  }, []);

  return (
    <div className="min-h-screen bg-gaming-lighter text-gaming-text overflow-x-hidden">
      <Header />
      <Hero />
      <SplashCursor />
      <ScrollReveal><LatestGames /></ScrollReveal>
      <ScrollReveal><FeaturedGames /></ScrollReveal>
      <ScrollReveal><Announcements /></ScrollReveal>
      <ScrollReveal><Services /></ScrollReveal>
      <ScrollReveal><Contact /></ScrollReveal>
      <Footer />
    </div>
  );
};

export default HomePage;