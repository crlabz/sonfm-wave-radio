import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Schedule from '@/components/Schedule';
import Hosts from '@/components/Hosts';
import Footer from '@/components/Footer';
import StickyPlayer from '@/components/StickyPlayer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Schedule />
      <Hosts />
      <Footer />
      <StickyPlayer />
    </div>
  );
};

export default Index;
