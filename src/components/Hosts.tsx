import { Instagram, Twitter } from 'lucide-react';

const hostsData = [
  {
    name: 'DJ Luna',
    show: 'The Midnight Drive',
    bio: 'Especialista en synthwave y electrónica retro-futurista',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
  {
    name: 'DJ Aurora',
    show: 'Buenos Días Web3',
    bio: 'Tu compañía matutina con las mejores noticias y pop',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'MC Flow',
    show: 'Ritmos Urbanos',
    bio: 'Experto en hip hop y cultura urbana contemporánea',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'DJ Neon',
    show: 'Electronic Dreams',
    bio: 'Llevando el house y techno a otro nivel',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  },
];

const Hosts = () => {
  return (
    <section id="hosts" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Nuestros Locutores
          </h2>
          <p className="text-muted-foreground text-lg">
            El equipo que hace posible la magia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hostsData.map((host, index) => (
            <div
              key={index}
              className="group animate-in fade-in slide-in-from-bottom-5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="glass rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-20 group-hover:opacity-40 transition-opacity z-10" />
                  <img
                    src={host.image}
                    alt={host.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{host.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{host.show}</p>
                  <p className="text-muted-foreground text-sm mb-4">{host.bio}</p>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hosts;
