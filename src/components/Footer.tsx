import { Instagram, Twitter, Facebook, Youtube, Radio } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer id="contact" className="relative py-20 border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center glow-primary">
                  <Radio className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Radio Web3
                </span>
              </div>
              <p className="text-muted-foreground">
                La radio del futuro. Transmitiendo las mejores vibes 24/7.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#hero" className="text-muted-foreground hover:text-primary transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#schedule" className="text-muted-foreground hover:text-primary transition-colors">
                    Programación
                  </a>
                </li>
                <li>
                  <a href="#hosts" className="text-muted-foreground hover:text-primary transition-colors">
                    Locutores
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>contacto@radioweb3.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Ciudad del Futuro, Web3</li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              © 2025 Radio Web3. Todos los derechos reservados.
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-gradient-primary hover:scale-110 transition-all group"
                >
                  <social.icon className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
