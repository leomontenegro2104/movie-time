# 🎬 TMDB Movie App - Movie Time

Este é um projeto desenvolvido para explorar a API do **TMDB (The Movie Database)**, oferecendo uma experiência completa de navegação por filmes e séries, incluindo detalhes, trailers e elencos. O projeto utiliza **React**, **TypeScript**, **Tailwind CSS** e **React Router**, com integração a um contexto global via **Context API**.

## 📸 Preview

Confira a demonstração do projeto no vídeo abaixo:

[![Demo Movie Time](https://img.youtube.com/vi/hbongZNiqMA/maxresdefault.jpg)](https://youtu.be/hbongZNiqMA)

🔗 [Assista no YouTube](https://youtu.be/hbongZNiqMA)

---

## 🚀 Tecnologias Utilizadas

- **React** + **TypeScript** ⚛️
- **React Router** (Gerenciamento de rotas)
- **Tailwind CSS** (Estilização)
- **TMDB API** (Fonte de dados)
- **Context API** (Gerenciamento de estado)
- **Axios** (Requisições HTTP)

---

## 📥 Instalação e Execução Local

Siga os passos abaixo para rodar o projeto na sua máquina:

### 🛠️ **Pré-requisitos**

Certifique-se de ter instalado:

- **Node.js** (versão mais recente recomendada)
- **Yarn** ou **npm**
- **Uma conta no TMDB** para obter a API Key

### 🔧 **Passo a passo**

1. **Clone o repositório**
   ```sh
   git clone https://github.com/leomontenegro2104/movie-time.git
   ```
2. **Acesse o diretório do projeto**
   ```sh
   cd movie-time
   ```
3. **Instale as dependências**  
   Se estiver usando Yarn:
   ```sh
   yarn
   ```
   Se estiver usando npm:
   ```sh
   npm install
   ```
4. **Configure as variáveis de ambiente**

   - Crie um arquivo **`.env`** na raiz do projeto com base no arquivo **`.env.template`**.
   - Adicione a sua chave de API do TMDB

5. **Inicie o projeto**

   ```sh
   yarn dev
   ```

   ou

   ```sh
   npm run dev
   ```

6. **Acesse no navegador**
   - O projeto rodará em: **`http://localhost:3000`**

---

## 📂 Estrutura do Projeto

```
📦 tmdb-movie-app
├── 📁 public              # Arquivos estáticos
├── 📁 src
│   ├── 📁 api             # Configuração da API TMDB
│   ├── 📁 assets          # Ícones, imagens e fontes
│   ├── 📁 components      # Componentes reutilizáveis
│   │   ├── atoms          # Elementos pequenos (Botões, inputs, etc.)
│   │   ├── molecules      # Componentes mais complexos (Card de filme, etc.)
│   ├── 📁 context         # Context API para gerenciamento de estado
│   ├── 📁 hooks           # Hooks personalizados
│   ├── 📁 layout          # Layout principal
│   ├── 📁 pages           # Páginas principais do app
│   ├── 📁 routers         # Configuração de rotas
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Ponto de entrada do React
│   ├── tailwind.config.js # Configuração do Tailwind CSS
├── .env.template          # Template de variáveis de ambiente
├── .gitignore             # Arquivos ignorados pelo Git
├── package.json           # Dependências e scripts
└── README.md              # Documentação do projeto
```

---

## 🚀 Funcionalidades

✅ Exibição de filmes e séries
✅ Detalhes de filmes/séries (sinopse, elenco, trailers)  
✅ Interface responsiva e moderna  
✅ Gerenciamento de estado com Context API

---

## 🤝 Contribuição

Se quiser contribuir com o projeto:

1. **Faça um fork** do repositório
2. **Crie uma branch** para sua feature/fix
   ```sh
   git checkout -b minha-feature
   ```
3. **Faça commit das suas alterações**
   ```sh
   git commit -m "Adiciona nova funcionalidade"
   ```
4. **Envie para o repositório remoto**
   ```sh
   git push origin minha-feature
   ```
5. **Abra um Pull Request** 🚀

---

## 📜 Licença

Este projeto está sob a licença **MIT**. Sinta-se livre para utilizá-lo e modificá-lo. 😊
