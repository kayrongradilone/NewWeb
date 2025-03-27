import axios from 'axios';

const BASE_URL = 'http://localhost:5555/api/news/'; // URL base para a API

// Função para obter todas as notícias
export const getNoticias = async () => {
  try {
    const response = await axios.get(BASE_URL); // Endpoint para obter todas as notícias
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

// Função para obter uma notícia específica por ID
export const getNoticiaPorId = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${id}`); // Usando a URL com o ID para pegar a notícia
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar notícia com ID ${id}:`, error);
    throw error;
  }
};

// Função para criar uma nova notícia
export const criarNoticia = async (noticia: { title: string; descricao: string;  url?: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}create`, noticia); // Usando a rota POST para criar notícia
    return response.data; // Retorna a notícia criada
  } catch (error) {
    console.error('Erro ao criar notícia:', error);
    throw error;
  }
};

// Função para atualizar uma notícia existente
export const atualizarNoticia = async (id: string, noticia: { title: string; descricao: string;  url?: string }) => {
  try {
    const response = await axios.patch(`${BASE_URL}update/${id}`, noticia); // Usando a rota PATCH para atualizar notícia
    return response.data; // Retorna a notícia atualizada
  } catch (error) {
    console.error(`Erro ao atualizar notícia com ID ${id}:`, error);
    throw error;
  }
};

// Função para excluir uma notícia
export const excluirNoticia = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}delete/${id}`); // Usando a rota DELETE para excluir a notícia
    return response.data; // Retorna o status da exclusão
  } catch (error) {
    console.error(`Erro ao excluir notícia com ID ${id}:`, error);
    throw error;
  }
};

