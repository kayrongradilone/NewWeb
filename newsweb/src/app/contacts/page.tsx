import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const Contatos = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Entre em Contato</h2>

      <div className="grid md:grid-cols-2 gap-6">
      
        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-red-500" />
              <span>Rua da Praça, 241 - Edifício Office Green, Palhoça - SC</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-blue-500" />
              <span>(48) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-green-500" />
              <span>contato@plathanus.com.br</span>
            </div>
          </CardContent>
        </Card>

        
        <Card>
          <CardHeader>
            <CardTitle>Envie uma Mensagem</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <input type="text" placeholder="Nome" className="w-full p-2 border rounded-md" />
              <input type="email" placeholder="E-mail" className="w-full p-2 border rounded-md" />
              <textarea placeholder="Mensagem" className="w-full p-2 border rounded-md h-32"></textarea>
              <Button type="submit" className="w-full">Enviar</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Nossa Localização</h3>
        <iframe
          className="w-full h-72 border rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.2609374186315!2d-48.67277458541662!3d-27.601377583406668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952739e85e4d5e8d%3A0x221e262ce74f03bb!2sPlathanus%20Software%20%26%20Design!5e0!3m2!1spt-BR!2sbr!4v1711400000000!5m2!1spt-BR!2sbr"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contatos;