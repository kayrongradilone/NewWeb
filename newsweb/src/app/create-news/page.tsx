"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import * as newsService from "../../../service/NewsService";

const NovaNoticia = () => {
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [erroURL, setErroURL] = useState<string | null>(null);
  const router = useRouter();

  const isValidURL = (url: string) => {
    try {
      const newUrl = new URL(url);
      return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleCriar = async () => {
    setCarregando(true);
    setErro(null);
    setSucesso(null);
    setErroURL(null);

    if (url && !isValidURL(url)) {
      setErroURL("URL inválida! Insira um link válido.");
      setCarregando(false);
      return;
    }

    const novaNoticia = {
      title: titulo,
      descricao,
      url: url || "",
    };

    try {
      await newsService.criarNoticia(novaNoticia);
      setSucesso("Notícia criada com sucesso!");
      setTitulo("");
      setDescricao("");
      setUrl("");
      router.push("/news");
    } catch (error) {
      setErro("Erro ao criar a notícia.");
      console.error("Erro ao criar notícia:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Criar Nova Notícia</h2>

      <div className="p-6 border rounded-lg shadow-lg">
        {sucesso && <p className="text-green-500 mb-4">{sucesso}</p>}
        {erro && <p className="text-red-500 mb-4">{erro}</p>}

        <div className="mb-4">
          <label className="block mb-2">Título</label>
          <Input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Descrição</label>
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">URL (Opcional)</label>
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-2 border rounded w-full"
          />
          {erroURL && <p className="text-red-500">{erroURL}</p>}
        </div>

        <div className="flex space-x-4 mt-6">
          <Button onClick={handleCriar} disabled={carregando} className="w-full sm:w-auto">
            {carregando ? "Carregando..." : "Criar Notícia"}
          </Button>

          <Button
            onClick={() => {
              setTitulo("");
              setDescricao("");
              setUrl("");
              setErroURL(null);
            }}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NovaNoticia;
