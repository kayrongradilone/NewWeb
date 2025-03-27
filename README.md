📢 Projeto de Notícias

Este é um projeto de gerenciamento de notícias desenvolvido com Next.js, TypeScript, Tailwind CSS e Axios para consumir uma API.

🚀 Tecnologias Utilizadas

Next.js (React Framework)

TypeScript (Tipagem estática)

Tailwind CSS (Estilização)

Axios (Requisições HTTP)

Express.js (Backend API - Opcional)

📂 Estrutura do Projeto

📂 projeto-noticias
│-- 📂 src
│   │-- 📂 components (Componentes reutilizáveis)
│   │-- 📂 pages
│   │   │-- 📂 news (Página de notícias)
│   │   │-- 📂 api (Integração com backend)
│   │-- 📂 service (Serviços de API)
│   │-- 📂 styles (Estilos gerais)
│-- 📂 public (Imagens e assets)
│-- package.json (Dependências)
│-- README.md (Documentação)

🔧 Configuração e Instalação

Clone o repositório:

  git clone https://github.com/seu-usuario/projeto-noticias.git
  cd projeto-noticias

Instale as dependências:

  npm install

Inicie o projeto:

  npm run dev

Acesse: http://localhost:3000

🔌 Configuração da API

O projeto consome uma API backend para gerenciar notícias. Por padrão, ele se conecta a:

http://localhost:5555/api/news/

Certifique-se de que seu backend esteja rodando antes de iniciar a aplicação.

📌 Endpoints Utilizados:

GET /news → Retorna todas as notícias.

GET /news/:id → Retorna uma notícia específica.

POST /news/create → Cria uma nova notícia.

PATCH /news/update/:id → Atualiza uma notícia.

DELETE /news/delete/:id → Remove uma notícia.

🛠 Funcionalidades

✅ Criar uma nova notícia
✅ Listar todas as notícias
✅ Editar uma notícia existente
✅ Excluir uma notícia
✅ Validação de URLs na criação de notícias
✅ Redirecionamento ao clicar no título de uma notícia

🎨 Estilização

O projeto utiliza Tailwind CSS para estilização e componentes reutilizáveis.

🏗 Melhorias Futuras

🔹 Autenticação de usuários

🔹 Melhorar o layout responsivo

🔹 Implementar testes automatizados

📝 Licença

Este projeto está sob a licença MIT.

🚀 Desenvolvido por Kayron Gradilone

