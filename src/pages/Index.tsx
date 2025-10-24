import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LiveStream from '@/components/LiveStream';
import PodcastPlayer from '@/components/PodcastPlayer';
import Schedule from '@/components/Schedule';
import Hosts from '@/components/Hosts';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import StickyPlayer from '@/components/StickyPlayer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <LiveStream />
      <PodcastPlayer />
      <Schedule />
      <Hosts />
      <ContactForm />
      <Footer />
      <StickyPlayer />
    </div>
  );
};

export default Index;
