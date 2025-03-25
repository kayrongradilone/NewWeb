"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";


const Noticias = () => {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarNoticias = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_76322fbc5ccf8366af464c0db58d5d4fb2e6c&q=news%20brasil"
        );
        if (!response.ok) throw new Error("Erro ao buscar notícias");

        const data = await response.json();
        if (data.results) {
          setArtigos(data.results); // 'results' contém o array de notícias
        } else {
          setErro("Nenhuma notícia encontrada.");
        }
      } catch (err) {
        setErro("Falha ao carregar notícias.");
      } finally {
        setCarregando(false);
      }
    };

    buscarNoticias();
  }, []);

  const limitarDescricao = (descricao: string, tamanhoMaximo: number) => {
    return descricao.length > tamanhoMaximo
      ? descricao.slice(0, tamanhoMaximo) + "..."
      : descricao;
  };

  const renderizarArtigos = () => {
    return artigos.slice(0, 6).map((artigo, index) => (
      <Card key={index} className="overflow-hidden shadow-lg">
        {/* Exibe a imagem somente se existir */}
        {artigo.image_url && (
          <img
            src={artigo.image_url}
            alt={artigo.title}
            className="w-full h-48 object-cover"
          />
        )}

        <CardHeader>
          {/* Exibe o título somente se existir */}
          {artigo.title && <CardTitle className="text-lg">{artigo.title}</CardTitle>}
        </CardHeader>

        <CardContent>
          {/* Exibe a descrição somente se existir */}
          {artigo.descricao && (
            <p className="text-gray-600 mb-4">
              {limitarDescricao(
                artigo.descricao || "Sem descrição disponível.",
                500
              )}
            </p>
          )}
          <Button asChild>
            <a href={artigo.url} target="_blank" rel="noopener noreferrer">
              Ler mais
            </a>
          </Button>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Últimas Notícias</h2>

      {carregando && (
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      )}

      {erro && <p className="text-center text-red-500">{erro}</p>}

      {!carregando && !erro && (
        <div className="grid md:grid-cols-3 gap-6">{renderizarArtigos()}</div>
      )}
    </div>
  );
};

export default Noticias;
