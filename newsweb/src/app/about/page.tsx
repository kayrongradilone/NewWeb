import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SobrePlathanus() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Sobre a Plathanus</h1>
        <p className="text-gray-600 mt-2">
          Inovação e tecnologia para transformar o mundo digital.
        </p>
      </header>

      <Separator />

      <section className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quem Somos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              A Plathanus é uma empresa focada no desenvolvimento de soluções tecnológicas 
              inovadoras para empresas de diversos setores. Com uma equipe altamente qualificada, 
              buscamos transformar desafios em oportunidades por meio da tecnologia.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Missão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Criar soluções digitais eficientes e inovadoras, proporcionando experiências 
              de alto impacto para clientes e usuários.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Ser referência no desenvolvimento de software e inovação digital, 
              entregando soluções que fazem a diferença.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Inovação e criatividade</li>
              <li>Compromisso com a qualidade</li>
              <li>Foco no cliente</li>
              <li>Transparência e ética</li>
              <li>Trabalho em equipe</li>
            </ul>
          </CardContent>
        </Card>
      </section>
      <Separator />

      <footer className="text-center">
        <h2 className="text-2xl font-semibold">Entre em contato</h2>
        <p className="text-gray-600">Vamos construir algo incrível juntos!</p>
        <Link href="/contacts">
          <Button className="mt-4" variant="default">
            Fale Conosco
          </Button>
        </Link>
      </footer>
    </div>
  );
}
