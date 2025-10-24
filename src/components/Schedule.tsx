import { Clock, Radio } from 'lucide-react';

const schedule = [
  {
    day: 'Lunes',
    shows: [
      { time: '06:00', name: 'Morning Energy', host: 'DJ Nova', genre: 'EDM' },
      { time: '12:00', name: 'Midday Vibes', host: 'Sofia Mix', genre: 'Pop' },
      { time: '18:00', name: 'The Sunset Session', host: 'Alex Beat', genre: 'Chill' },
      { time: '22:00', name: 'Late Night Drive', host: 'DJ Luna', genre: 'Synthwave', isLive: true },
    ],
  },
  {
    day: 'Martes',
    shows: [
      { time: '06:00', name: 'Wake Up Call', host: 'DJ Nova', genre: 'House' },
      { time: '14:00', name: 'Afternoon Groove', host: 'Carlos Spin', genre: 'Funk' },
      { time: '20:00', name: 'Night Beats', host: 'Sofia Mix', genre: 'Techno' },
    ],
  },
  {
    day: 'Miércoles',
    shows: [
      { time: '08:00', name: 'Morning Mix', host: 'Alex Beat', genre: 'Dance' },
      { time: '15:00', name: 'Mid Week Party', host: 'DJ Luna', genre: 'EDM' },
      { time: '21:00', name: 'Dark Pulse', host: 'Carlos Spin', genre: 'Dark Techno' },
    ],
  },
];

const Schedule = () => {
  return (
    <section id="schedule" className="py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Programación Semanal
          </h2>
          <p className="text-muted-foreground">
            Todos tus programas favoritos en un solo lugar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {schedule.map((daySchedule) => (
            <div key={daySchedule.day} className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-bold mb-4">{daySchedule.day}</h3>
              <div className="space-y-3">
                {daySchedule.shows.map((show, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl transition-all ${
                      show.isLive
                        ? 'bg-accent-blue/10 border border-accent-blue/20'
                        : 'bg-accent hover:bg-accent/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{show.time}</span>
                      {show.isLive && (
                        <span className="ml-auto flex items-center gap-1 text-xs px-2 py-1 bg-accent-blue/20 text-accent-blue rounded-full">
                          <Radio className="w-3 h-3" />
                          EN VIVO
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold mb-1">{show.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {show.host} • {show.genre}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
