"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SearchInput from "./SearchInput"; 

interface Artigo {
  title?: string;
  description?: string;
  image_url?: string;
  link: string;
}

const Noticias = () => {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [editando, setEditando] = useState<Artigo | null>(null); 
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novoLink, setNovoLink] = useState("");
  const editFormRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    const buscarNoticias = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_76322fbc5ccf8366af464c0db58d5d4fb2e6c&q=news%20brasil"
        );
        if (!response.ok) throw new Error("Erro ao buscar notícias");

        const data = await response.json();
        if (data.results) {
          
          const artigosAleatorios = embaralharArray(data.results);
          
          const artigosCompletos = garantirArtigosCompletos(artigosAleatorios);
          setArtigos(artigosCompletos);
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

  // Função para embaralhar o array de artigos
  const embaralharArray = (array: Artigo[]) => {
    return array.sort(() => Math.random() - 0.5); 
  };

  // Função para garantir que todos os artigos tenham imagem e descrição
  const garantirArtigosCompletos = (array: Artigo[]) => {
    return array.filter(
      (artigo) => artigo.image_url && artigo.description 
    );
  };

  const limitarDescricao = (descricao: string) => {
    const tamanhoMaximo = 120; 
    return descricao.length > tamanhoMaximo
      ? descricao.slice(0, tamanhoMaximo) + "..." 
      : descricao;
  };

  // Função para filtrar artigos com base na consulta de busca
  const filtrarArtigos = () => {
    if (!searchQuery) return artigos; 
    return artigos.filter((artigo) => {
      const tituloMatch = artigo.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descricaoMatch = artigo.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      return tituloMatch || descricaoMatch; 
    });
  };

  const renderizarArtigos = () => {
    const artigosFiltrados = filtrarArtigos();

    return artigosFiltrados.slice(0, 6).map((artigo, index) => (
      <Card key={index} className="overflow-hidden shadow-lg">
        {/* Exibe a imagem se existir */}
        {artigo.image_url && (
          <img
            src={artigo.image_url}
            alt={artigo.title || "Imagem da notícia"}
            className="w-full h-48 object-cover"
          />
        )}

        <CardHeader>
          {/* Exibe o título se existir */}
          {artigo.title && (
            <CardTitle className="text-lg">{artigo.title}</CardTitle>
          )}
        </CardHeader>

        <CardContent>
          {/* Exibe a descrição se existir */}
          {artigo.description && (
            <p className="text-gray-600 mb-4">
              {limitarDescricao(artigo.description)}
            </p>
          )}
          {/* Exibe os botões alinhados */}
          <div className="flex flex-col gap-2 mt-auto">
            {artigo.link && (
              <Button asChild className="w-full">
                <a href={artigo.link} target="_blank" rel="noopener noreferrer">
                  Ler mais
                </a>
              </Button>
            )}

            {/* Botão de Edição */}
            <Button onClick={() => handleEditar(artigo)} className="w-full">
              Editar
            </Button>
          </div>
        </CardContent>
      </Card>
    ));
  };

  // Função chamada quando a pesquisa é feita
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Função para editar uma notícia
  const handleEditar = (artigo: Artigo) => {
    setEditando(artigo); // Inicia o modo de edição
    setNovoTitulo(artigo.title || "");
    setNovaDescricao(artigo.description || "");
    setNovoLink(artigo.link);

    // Rola até o formulário de edição
    if (editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Função para salvar a edição
  const handleSalvarEdicao = () => {
    if (editando) {
      const artigosAtualizados = artigos.map((artigo) =>
        artigo === editando
          ? {
              ...artigo,
              title: novoTitulo,
              description: novaDescricao,
              link: novoLink,
            }
          : artigo
      );
      setArtigos(artigosAtualizados);
      setEditando(null); // Encerra o modo de edição
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Últimas Notícias</h2>

      {/* Componente de busca */}
      <SearchInput onSearch={handleSearch} />

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

      {/* Formulário de Edição */}
      {editando && (
        <div ref={editFormRef} className="mt-8 p-6 border rounded-lg shadow-lg">
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

          <label className="block mb-2">Link</label>
          <input
            type="text"
            value={novoLink}
            onChange={(e) => setNovoLink(e.target.value)}
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
