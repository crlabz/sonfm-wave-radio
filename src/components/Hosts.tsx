const hosts = [
  {
    name: 'DJ Luna',
    specialty: 'Synthwave & Electrónica',
    bio: 'Experta en música electrónica retro-futurista con 10 años de experiencia.',
    avatar: '🌙',
    socials: ['Instagram', 'Twitter'],
  },
  {
    name: 'DJ Nova',
    specialty: 'House & EDM',
    bio: 'Produciendo beats que mueven multitudes desde 2015.',
    avatar: '⭐',
    socials: ['Instagram', 'Twitter'],
  },
  {
    name: 'Sofia Mix',
    specialty: 'Pop & Techno',
    bio: 'Mezclando los mejores ritmos para tu día.',
    avatar: '🎧',
    socials: ['Instagram', 'Twitter'],
  },
  {
    name: 'Carlos Spin',
    specialty: 'Funk & Dark Techno',
    bio: 'Llevando el groove a otro nivel todas las noches.',
    avatar: '🎵',
    socials: ['Instagram', 'Twitter'],
  },
];

const Hosts = () => {
  return (
    <section id="hosts" className="py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestros Locutores
          </h2>
          <p className="text-muted-foreground">
            Los mejores DJs y locutores en un solo lugar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hosts.map((host) => (
            <div
              key={host.name}
              className="p-6 rounded-2xl bg-card border border-border hover:border-accent-blue/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                {host.avatar}
              </div>
              <h3 className="text-lg font-bold text-center mb-2">{host.name}</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                {host.specialty}
              </p>
              <p className="text-sm text-center mb-4 line-clamp-3 text-muted-foreground">
                {host.bio}
              </p>
              <div className="flex items-center justify-center gap-2">
                {host.socials.map((social) => (
                  <a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="w-8 h-8 rounded-lg bg-accent hover:bg-accent/80 flex items-center justify-center transition-colors text-xs"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hosts;
