import { Clock } from 'lucide-react';

const scheduleData = [
  { time: '06:00 - 09:00', show: 'Buenos Días Web3', host: 'DJ Aurora', genre: 'Pop & Noticias' },
  { time: '09:00 - 12:00', show: 'Ritmos Urbanos', host: 'MC Flow', genre: 'Hip Hop & Trap' },
  { time: '12:00 - 15:00', show: 'Rock & Roll', host: 'DJ Thunder', genre: 'Rock Clásico' },
  { time: '15:00 - 18:00', show: 'Tarde Tropical', host: 'DJ Salsa', genre: 'Salsa & Reggaeton' },
  { time: '18:00 - 21:00', show: 'Electronic Dreams', host: 'DJ Neon', genre: 'House & Techno' },
  { time: '21:00 - 00:00', show: 'The Midnight Drive', host: 'DJ Luna', genre: 'Synthwave' },
  { time: '00:00 - 06:00', show: 'Late Night Vibes', host: 'DJ Shadow', genre: 'Chill & Lofi' },
];

const Schedule = () => {
  return (
    <section id="schedule" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Programación Semanal
          </h2>
          <p className="text-muted-foreground text-lg">
            Lo mejor de cada género, todos los días
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {scheduleData.map((item, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl hover:bg-card/50 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Time */}
                <div className="flex items-center gap-2 text-primary shrink-0">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{item.time}</span>
                </div>

                {/* Show Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {item.show}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span>con {item.host}</span>
                    <span>•</span>
                    <span>{item.genre}</span>
                  </div>
                </div>

                {/* Active Indicator */}
                {index === 5 && (
                  <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full shrink-0">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    <span className="text-xs font-medium">AHORA</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
