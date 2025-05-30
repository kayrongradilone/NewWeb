"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as newsService from "../../../service/NewsService";

interface Artigo {
  id: string;
  title: string;
  descricao: string;
  url: string;
  imagem?: string;
}

const UNSPLASH_ACCESS_KEY = "U90ozLCCnm_5RNHTGa_UkulDbm7Vh26jN0fYMRJW1dE";

const Noticias = () => {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [editando, setEditando] = useState<Artigo | null>(null);
  const [novoTitulo, setNovoTitulo] = useState<string>("");
  const [novaDescricao, setNovaDescricao] = useState<string>("");

  const formularioEdicaoRef = useRef<HTMLDivElement | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(false);

  

  useEffect(() => {
    const buscarNoticias = async () => {
      try {
        const data = await newsService.getNoticias();
        const artigosComImagens = await Promise.all(
          data.map(async (artigo: Artigo) => ({
            ...artigo,
            imagem: await buscarImagemAleatoria(),
          }))
        );
        setArtigos(artigosComImagens);
      } catch (error) {
        setErro("Erro ao carregar notícias.");
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };

    buscarNoticias();
  }, [editando]);

  const buscarImagemAleatoria = async (): Promise<string> => {
    try {
      const response = await axios.get("https://api.unsplash.com/photos/random", {
        params: { query: "news", client_id: UNSPLASH_ACCESS_KEY },
      });

      return response.data.urls?.regular || "";
    } catch (error) {
      console.error("Erro ao buscar imagem do Unsplash:", error);
      return "https://via.placeholder.com/600x400?text=Imagem+Indisponível";
    }
  };

  const handleEditar = (artigo: Artigo) => {
    setEditando(artigo);
    setNovoTitulo(artigo.title);
    setNovaDescricao(artigo.descricao);

    if (formularioEdicaoRef.current) {
      formularioEdicaoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSalvarEdicao = async () => {
    if (editando) {
      try {
        const updatedNoticia = await newsService.atualizarNoticia(editando.id, {
          title: novoTitulo,
          descricao: novaDescricao,
        });

        setArtigos((prevArtigos) =>
          prevArtigos.map((artigo) =>
            artigo.id === editando.id ? updatedNoticia : artigo
          )
        );
        setEditando(null);
      } catch (error) {
        console.error("Erro ao salvar edição:", error);
      }
    }
  };

  const handleExcluir = async (id: string) => {
    try {
      await newsService.excluirNoticia(id);
      setArtigos((prevArtigos) =>
        prevArtigos.filter((artigo) => artigo.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir notícia:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Últimas Notícias</h2>

      {erro && <p className="text-center text-red-500">{erro}</p>}

      {carregando ? (
        <div className="text-center">
          <p>Carregando notícias...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {artigos.map((artigo, index) => (
            <Card key={index} className="overflow-hidden shadow-lg flex flex-col h-full">
              {artigo.imagem && (
                <img
                  src={artigo.imagem}
                  alt={artigo.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{artigo.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col grow">
                <p className="text-gray-600 mb-4 break-words">
                  {artigo.descricao || "Sem descrição disponível"}
                </p>
                <div className="flex flex-col gap-2 mt-auto">
                  <Button onClick={() => handleEditar(artigo)} className="w-full">
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleExcluir(artigo.id)}
                    variant="destructive"
                    className="w-full"
                  >
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {editando && (
        <div ref={formularioEdicaoRef} className="mt-8 p-6 border rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Editar Notícia</h3>

          <label className="block mb-2">Título</label>
          <input
            type="text"
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />

          <label className="block mb-2">Descrição</label>
          <textarea
            value={novaDescricao}
            onChange={(e) => setNovaDescricao(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />

          <div className="flex space-x-4">
            <Button onClick={handleSalvarEdicao} variant="default">
              Salvar
            </Button>
            <Button onClick={() => setEditando(null)} variant="destructive">
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Noticias;
