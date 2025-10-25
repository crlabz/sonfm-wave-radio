import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LiveStats from '@/components/LiveStats';
import LiveChat from '@/components/LiveChat';
import PodcastPlayer from '@/components/PodcastPlayer';
import Schedule from '@/components/Schedule';
import Hosts from '@/components/Hosts';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import StickyPlayer from '@/components/StickyPlayer';
import PWAInstall from '@/components/PWAInstall';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-main text-dark-text-primary">
      <Header />
      <Hero />
      <LiveStats />
      <LiveChat />
      <PodcastPlayer />
      <Schedule />
      <Hosts />
      <ContactForm />
      <Footer />
      <StickyPlayer />
      <PWAInstall />
    </div>
  );
};

export default Index;
