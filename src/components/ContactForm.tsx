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
            <div className="flex items-center justify-center gap-4">
              {['Twitter', 'Instagram', 'Facebook', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-sm"
                >
                  {social}
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
