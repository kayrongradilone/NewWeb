"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as newsService from "../../../service/NewsService"; // Supondo que seus serviços estão nesse caminho

interface Artigo {
  id: string;
  title: string;
  descricao: string;
  url: string;
}

const Noticias = () => {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [editando, setEditando] = useState<Artigo | null>(null);
  const [novoTitulo, setNovoTitulo] = useState<string>("");
  const [novaDescricao, setNovaDescricao] = useState<string>("");

  const formularioEdicaoRef = useRef<HTMLDivElement | null>(null); // Ref para o formulário de edição

  // Buscar as notícias ao carregar o componente
  useEffect(() => {
    const buscarNoticias = async () => {
      try {
        const data = await newsService.getNoticias(); // Chama o serviço para pegar as notícias
        setArtigos(data);
      } catch (error) {
        setErro("Erro ao carregar notícias.");
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };

    buscarNoticias();
  }, []);

  // Função para editar uma notícia
  const handleEditar = (artigo: Artigo) => {
    setEditando(artigo);
    setNovoTitulo(artigo.title);
    setNovaDescricao(artigo.descricao);

    // Rolando para o formulário de edição
    if (formularioEdicaoRef.current) {
      formularioEdicaoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Função para salvar as edições de uma notícia
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
        setEditando(null); // Limpa o estado de edição
      } catch (error) {
        console.error("Erro ao salvar edição:", error);
      }
    }
  };

  // Função para excluir uma notícia
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

      {/* Exibe um erro caso haja */}
      {erro && <p className="text-center text-red-500">{erro}</p>}

      {/* Exibe um carregamento enquanto as notícias estão sendo carregadas */}
      {carregando ? (
        <div className="text-center">
          <p>Carregando notícias...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Renderiza os artigos */}
          {artigos.map((artigo) => (
            <Card key={artigo.id} className="overflow-hidden shadow-lg">
              <CardHeader>
                <CardTitle>{artigo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4" >
                  {artigo.descricao && artigo.descricao.length > 5000
                    ? artigo.descricao.slice(0, 100) + "..."
                    : artigo.descricao || "Sem descrição disponível"}
                </p>
                {/* Botões de editar e excluir */}
                <div className="flex flex-col gap-2 mt-auto">
                  <Button
                    onClick={() => handleEditar(artigo)}
                    className="w-full"
                  >
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

      {/* Formulário de edição */}
      {editando && (
        <div
          ref={formularioEdicaoRef} // Ref para controlar o scroll
          className="mt-8 p-6 border rounded-lg shadow-lg"
        >
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
