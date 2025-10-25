import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Mensaje enviado! Te contactaremos pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

    const socialLinks = [
      {
        name: 'Facebook',
        href: '#facebook',
        icon: (
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          >
            <path
              fill="currentColor"
              d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82V14.708H9.692v-3.6h3.128V8.413c0-3.1 1.894-4.787 4.66-4.787 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.6h-3.12V24h6.116C23.403 24 24 23.403 24 22.675V1.325C24 .597 23.403 0 22.675 0Z"
            />
          </svg>
        ),
      },
      {
        name: 'Instagram',
        href: '#instagram',
        icon: (
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          >
            <path
              fill="currentColor"
              d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.645.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.741 0 8.332.014 7.052.072 5.771.13 4.653.346 3.678 1.322 2.702 2.298 2.486 3.416 2.428 4.698 2.37 5.978 2.357 6.387 2.357 12s.014 6.022.072 7.302c.058 1.281.274 2.399 1.25 3.375.976.976 2.094 1.192 3.375 1.25 1.28.058 1.689.072 7.302.072s6.022-.014 7.302-.072c1.281-.058 2.399-.274 3.375-1.25.976-.976 1.192-2.094 1.25-3.375.058-1.28.072-1.689.072-7.302s-.014-6.022-.072-7.302c-.058-1.281-.274-2.399-1.25-3.375-.976-.976-2.094-1.192-3.375-1.25C15.668.014 15.259 0 12 0Zm0 5.838A6.162 6.162 0 105.838 12 6.162 6.162 0 0012 5.838Zm0 10.18A4.019 4.019 0 118 12a4.019 4.019 0 014 4.018Zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0Z"
            />
          </svg>
        ),
      },
      {
        name: 'X',
        href: '#x',
        icon: (
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          >
            <path
              fill="currentColor"
              d="M1.533 0 9.78 11.017.96 24h5.574l4.99-6.94L15.07 24H23l-8.59-11.657L23.454 0h-5.574l-4.51 6.32L8.43 0H1.533Z"
            />
          </svg>
        ),
      },
      {
        name: 'Bluesky',
        href: '#bluesky',
        icon: (
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          >
            <path
              fill="currentColor"
              d="M12 4.2c1.27-2.4 4.165-4.2 6.22-4.2 0 2.88-.69 5.27-1.4 7.02 2.18.49 3.88 1.82 3.88 4.7 0 2.54-1.58 4.73-3.85 4.73-1.49 0-3.09-.86-4.85-2.84-1.76 1.98-3.36 2.84-4.85 2.84-2.27 0-3.85-2.19-3.85-4.73 0-2.88 1.7-4.21 3.88-4.7-.71-1.75-1.4-4.14-1.4-7.02 2.055 0 4.95 1.8 6.22 4.2Z"
            />
          </svg>
        ),
      },
      {
        name: 'TikTok',
        href: '#tiktok',
        icon: (
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          >
            <path
              fill="currentColor"
              d="M21 6.6c-1.85-.13-3.47-.87-4.86-2.33V15.4c0 4.17-3.38 7.56-7.56 7.56A7.56 7.56 0 011 15.4a7.56 7.56 0 017.56-7.56c.37 0 .73.03 1.09.08v3.57a3.99 3.99 0 00-1.09-.15 3.99 3.99 0 103.99 3.99V0h3.74c.3 2.28 1.95 4.19 4.71 4.36V6.6Z"
            />
          </svg>
        ),
      },
    ];

  return (
    <section id="contact" className="py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Contáctanos
            </h2>
            <p className="text-muted-foreground">
              ¿Tienes alguna solicitud musical o quieres participar? Escríbenos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Nombre
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tu nombre"
                  required
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium mb-2 block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@email.com"
                  required
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Mensaje / Solicitud Musical
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Cuéntanos tu solicitud o mensaje..."
                  required
                  className="bg-background border-border min-h-[120px]"
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" />
                Enviar Mensaje
              </Button>
            </div>
          </form>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">Síguenos en redes sociales</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
