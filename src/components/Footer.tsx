const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-background font-bold text-sm">W3</span>
              </div>
              <h3 className="text-lg font-bold">Radio Web3</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              La radio del futuro. Música, podcasts y programas en vivo 24/7.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {['Inicio', 'En Vivo', 'Programación', 'Locutores'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contacto@radioweb3.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Redes Sociales</h4>
            <div className="flex gap-2">
              {['TW', 'IG', 'FB', 'YT'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-9 h-9 rounded-lg bg-accent hover:bg-primary hover:text-background flex items-center justify-center transition-all text-xs font-medium"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Radio Web3. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
