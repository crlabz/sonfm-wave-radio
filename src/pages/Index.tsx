import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LiveStats from '@/components/LiveStats';
import LiveChat from '@/components/LiveChat';
import Schedule from '@/components/Schedule';
import Hosts from '@/components/Hosts';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import StickyPlayer from '@/components/StickyPlayer';
import PWAInstall from '@/components/PWAInstall';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Force page to start at the top immediately
    window.scrollTo(0, 0);
    
    // Prevent layout shifts and improve scroll performance
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overflowX = 'hidden';
    
    // Add scroll padding for fixed header
    document.documentElement.style.scrollPaddingTop = '80px';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.overflowX = 'auto';
      document.documentElement.style.scrollPaddingTop = '0px';
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-main text-dark-text-primary overflow-x-hidden">
      <Header />
      <main className="relative">
        <Hero />
        <LiveStats />
        <LiveChat />
        <Schedule />
        <Hosts />
        <ContactForm />
        <Footer />
      </main>
      <StickyPlayer />
      <PWAInstall />
    </div>
  );
};

export default Index;
