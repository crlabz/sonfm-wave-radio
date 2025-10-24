import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute inset-0 bg-gradient-fade" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-border mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">TRANSMITIENDO EN VIVO</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            La Radio del Futuro
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Música, podcasts y programas en vivo. Conecta con miles de oyentes en tiempo real.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              size="lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="gap-2 h-12 px-6"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Escuchar Ahora
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6">
              Ver Programación
            </Button>
          </div>

          {/* Now Playing Card */}
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-card border border-border animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <span className="text-2xl">🎵</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs text-muted-foreground mb-1">SONANDO AHORA</p>
                <h3 className="font-semibold mb-1">The Midnight Drive</h3>
                <p className="text-sm text-muted-foreground">con DJ Luna • Electrónica & Synthwave</p>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-accent-blue rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 24 + 8}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
