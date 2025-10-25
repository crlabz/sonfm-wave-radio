import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Music,
  Play,
  Radio,
  User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const schedule = [
  {
    day: 'Lunes',
    date: '2024-01-15',
    shows: [
      {
        time: '06:00',
        name: 'Morning Energy',
        host: 'DJ Nova',
        genre: 'EDM',
        duration: '2h',
        listeners: 1200,
        isLive: false,
      },
      {
        time: '12:00',
        name: 'Midday Vibes',
        host: 'Sofia Mix',
        genre: 'Pop',
        duration: '1.5h',
        listeners: 800,
        isLive: false,
      },
      {
        time: '18:00',
        name: 'The Sunset Session',
        host: 'Alex Beat',
        genre: 'Chill',
        duration: '2h',
        listeners: 1500,
        isLive: false,
      },
      {
        time: '22:00',
        name: 'Late Night Drive',
        host: 'DJ Luna',
        genre: 'Synthwave',
        duration: '3h',
        listeners: 2100,
        isLive: true,
      },
    ],
  },
  {
    day: 'Martes',
    date: '2024-01-16',
    shows: [
      {
        time: '06:00',
        name: 'Wake Up Call',
        host: 'DJ Nova',
        genre: 'House',
        duration: '2h',
        listeners: 1100,
        isLive: false,
      },
      {
        time: '14:00',
        name: 'Afternoon Groove',
        host: 'Carlos Spin',
        genre: 'Funk',
        duration: '1.5h',
        listeners: 900,
        isLive: false,
      },
      {
        time: '20:00',
        name: 'Night Beats',
        host: 'Sofia Mix',
        genre: 'Techno',
        duration: '2.5h',
        listeners: 1800,
        isLive: false,
      },
    ],
  },
  {
    day: 'Miércoles',
    date: '2024-01-17',
    shows: [
      {
        time: '08:00',
        name: 'Morning Mix',
        host: 'Alex Beat',
        genre: 'Dance',
        duration: '2h',
        listeners: 1300,
        isLive: false,
      },
      {
        time: '15:00',
        name: 'Mid Week Party',
        host: 'DJ Luna',
        genre: 'EDM',
        duration: '2h',
        listeners: 1600,
        isLive: false,
      },
      {
        time: '21:00',
        name: 'Dark Pulse',
        host: 'Carlos Spin',
        genre: 'Dark Techno',
        duration: '3h',
        listeners: 1900,
        isLive: false,
      },
    ],
  },
  {
    day: 'Jueves',
    date: '2024-01-18',
    shows: [
      {
        time: '07:00',
        name: 'Rise & Shine',
        host: 'DJ Nova',
        genre: 'Progressive',
        duration: '2h',
        listeners: 1000,
        isLive: false,
      },
      {
        time: '13:00',
        name: 'Lunch Break',
        host: 'Sofia Mix',
        genre: 'Ambient',
        duration: '1h',
        listeners: 600,
        isLive: false,
      },
      {
        time: '19:00',
        name: 'Evening Flow',
        host: 'Alex Beat',
        genre: 'Deep House',
        duration: '2.5h',
        listeners: 1400,
        isLive: false,
      },
    ],
  },
  {
    day: 'Viernes',
    date: '2024-01-19',
    shows: [
      {
        time: '06:00',
        name: 'Friday Morning',
        host: 'DJ Nova',
        genre: 'Trance',
        duration: '2h',
        listeners: 1200,
        isLive: false,
      },
      {
        time: '12:00',
        name: 'TGIF Vibes',
        host: 'Sofia Mix',
        genre: 'House',
        duration: '2h',
        listeners: 1500,
        isLive: false,
      },
      {
        time: '18:00',
        name: 'Weekend Kickoff',
        host: 'Carlos Spin',
        genre: 'Bass',
        duration: '3h',
        listeners: 2200,
        isLive: false,
      },
    ],
  },
  {
    day: 'Sábado',
    date: '2024-01-20',
    shows: [
      {
        time: '10:00',
        name: 'Saturday Morning',
        host: 'Alex Beat',
        genre: 'Chill',
        duration: '2h',
        listeners: 800,
        isLive: false,
      },
      {
        time: '16:00',
        name: 'Weekend Party',
        host: 'DJ Luna',
        genre: 'EDM',
        duration: '4h',
        listeners: 2500,
        isLive: false,
      },
      {
        time: '22:00',
        name: 'Saturday Night',
        host: 'Carlos Spin',
        genre: 'Techno',
        duration: '3h',
        listeners: 2000,
        isLive: false,
      },
    ],
  },
  {
    day: 'Domingo',
    date: '2024-01-21',
    shows: [
      {
        time: '09:00',
        name: 'Sunday Brunch',
        host: 'Sofia Mix',
        genre: 'Jazz',
        duration: '2h',
        listeners: 700,
        isLive: false,
      },
      {
        time: '15:00',
        name: 'Sunday Chill',
        host: 'Alex Beat',
        genre: 'Ambient',
        duration: '2h',
        listeners: 900,
        isLive: false,
      },
      {
        time: '20:00',
        name: 'Sunday Night',
        host: 'DJ Luna',
        genre: 'Downtempo',
        duration: '2h',
        listeners: 1100,
        isLive: false,
      },
    ],
  },
];

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [hoveredShow, setHoveredShow] = useState<string | null>(null);

  const currentDay = schedule[selectedDay];
  const currentTime = new Date().getHours() * 100 + new Date().getMinutes();

  const getCurrentShow = () => {
    for (const show of currentDay.shows) {
      const [hours, minutes] = show.time.split(':').map(Number);
      const showTime = hours * 100 + minutes;
      const showEndTime = showTime + parseFloat(show.duration) * 100;

      if (currentTime >= showTime && currentTime <= showEndTime) {
        return show;
      }
    }

    return null;
  };

  const currentShow = getCurrentShow();

  return (
    <section id="schedule" className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black mb-4 text-dark-text-primary">
            Programación Semanal
          </h2>
          <p className="text-dark-text-secondary text-lg">
            Todos tus programas favoritos en un solo lugar
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="w-full md:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
              disabled={selectedDay === 0}
              className="flex w-full items-center justify-center gap-2 bg-dark-elevated border-dark-border hover:border-dark-red hover:shadow-red-glow text-dark-text-primary disabled:opacity-50 md:w-auto"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
          </motion.div>

          <div className="w-full md:w-auto">
            <div className="flex gap-3 overflow-x-auto pb-1 md:overflow-visible md:justify-center">
              {schedule.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0"
                >
                  <Button
                    variant={selectedDay === index ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDay(index)}
                    className={`flex items-center gap-2 whitespace-nowrap transition-all duration-300 ${
                      selectedDay === index
                        ? 'bg-gradient-red-power hover:shadow-red-glow-lg text-white border-0'
                        : 'bg-dark-elevated border-dark-border hover:border-dark-red hover:shadow-red-glow text-dark-text-primary'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    {day.day}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="w-full md:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSelectedDay(Math.min(schedule.length - 1, selectedDay + 1))
              }
              disabled={selectedDay === schedule.length - 1}
              className="flex w-full items-center justify-center gap-2 bg-dark-elevated border-dark-border hover:border-dark-red hover:shadow-red-glow text-dark-text-primary disabled:opacity-50 md:w-auto"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {currentShow && (
            <motion.div
              className="mb-8 p-8 bg-gradient-red-power rounded-2xl text-white shadow-red-glow-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-dark-red/20 to-dark-red-hover/20" />
              <div className="relative z-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="w-full">
                    <motion.div
                      className="flex items-center gap-3 mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <motion.div
                        className="w-3 h-3 bg-white rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <Radio className="w-6 h-6" />
                      <span className="text-sm font-bold tracking-wider">
                        ON AIR AHORA
                      </span>
                    </motion.div>
                    <motion.h3
                      className="text-3xl font-black mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {currentShow.name}
                    </motion.h3>
                    <motion.p
                      className="text-white/90 text-lg mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {currentShow.host} • {currentShow.genre}
                    </motion.p>
                    <motion.div
                      className="flex flex-wrap items-center gap-4 text-sm sm:gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <span>👥 {currentShow.listeners.toLocaleString()} oyentes</span>
                      <span>⏱️ {currentShow.duration}</span>
                    </motion.div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto"
                  >
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 md:w-auto">
                      <Play className="w-5 h-5 mr-2" />
                      Escuchar
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="space-y-6">
            <motion.h3
              className="text-3xl font-black text-dark-text-primary mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {currentDay.day} -
              {' '}
              {new Date(currentDay.date).toLocaleDateString('es-ES')}
            </motion.h3>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {currentDay.shows.map((show, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.15 },
                    }}
                    className={`group relative p-6 rounded-xl border transition-transform duration-200 cursor-pointer ${
                      show.isLive
                        ? 'bg-gradient-to-r from-dark-red/10 to-dark-red-hover/10 border-dark-red hover-lift'
                        : hoveredShow === `${selectedDay}-${index}`
                          ? 'bg-dark-elevated border-dark-red hover-lift'
                          : 'bg-dark-card border-dark-border hover-border hover-lift'
                    }`}
                    onMouseEnter={() => setHoveredShow(`${selectedDay}-${index}`)}
                    onMouseLeave={() => setHoveredShow(null)}
                  >
                    {show.isLive && (
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-red-power rounded-t-xl"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-dark-text-secondary" />
                            <span className="font-bold text-dark-text-primary">
                              {show.time}
                            </span>
                          </div>
                          {show.isLive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            >
                              <Badge className="bg-gradient-red-power text-white shadow-red-glow animate-pulse">
                                <motion.div
                                  className="w-2 h-2 bg-white rounded-full mr-2"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.8, 1, 0.8],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                  }}
                                />
                                <Radio className="w-3 h-3 mr-1" />
                                ON AIR
                              </Badge>
                            </motion.div>
                          )}
                          <Badge
                            variant="outline"
                            className="text-xs bg-dark-elevated border-dark-border text-dark-text-secondary"
                          >
                            {show.duration}
                          </Badge>
                        </div>

                        <h4 className="text-xl font-bold text-dark-text-primary mb-3 group-hover:text-dark-red transition-colors">
                          {show.name}
                        </h4>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-dark-text-secondary mb-4 sm:gap-6">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{show.host}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Music className="w-4 h-4" />
                            <span>{show.genre}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>👥 {show.listeners.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="inline-block">
                          <Badge
                            variant="outline"
                            className="text-xs bg-dark-red/10 border-dark-red/30 text-dark-red hover:bg-dark-red/20 transition-colors duration-300"
                          >
                            {show.genre}
                          </Badge>
                        </div>
                      </div>

                      <motion.div
                        className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:translate-x-2 md:group-hover:translate-x-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full shadow-lg hover:shadow-red-glow bg-dark-elevated border-dark-border hover:border-dark-red text-dark-text-primary md:w-auto"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Escuchar
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Schedule;
