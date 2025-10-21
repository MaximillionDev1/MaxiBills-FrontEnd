# 💰 MaxiBills – Controle Inteligente de Finanças Pessoais

O **MaxiBills** é um aplicativo web moderno voltado ao **gerenciamento de finanças pessoais e empresariais**, permitindo adicionar **despesas e receitas** categorizadas.  
Com uma interface fluida e responsiva, o usuário tem acesso a **gráficos em pizza e colunas**, auxiliando na visualização dos gastos e receitas para um controle financeiro mais assertivo.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **React 19** – Biblioteca principal para construção da interface  
- ⚡ **Vite** – Ferramenta de build ultrarrápida com suporte a TypeScript  
- 🎨 **TailwindCSS 4** – Framework de estilização baseado em utilitários  
- 🔥 **Firebase** – Autenticação e armazenamento de dados  
- 🌐 **Axios** – Comunicação com APIs REST  
- 🧭 **React Router 7** – Gerenciamento de rotas SPA  
- 📊 **Recharts** – Visualização de dados em gráficos interativos  
- 🔔 **React Toastify** – Exibição de alertas e notificações personalizadas  

---

## 📁 Estrutura do Projeto

```
src/
├── assets/        # Ícones, imagens e arquivos estáticos
├── components/    # Componentes reutilizáveis (botões, cards, modais, etc.)
├── config/        # Configurações globais (ex: Firebase, rotas, temas)
├── context/       # Contextos globais com React Context API (ex: Auth, Transações)
├── layout/        # Layouts base (Header, Sidebar, estrutura de páginas)
├── pages/         # Páginas principais do app (Dashboard, Login, Transações)
├── routes/        # Definição e controle das rotas
├── services/      # Lógica de comunicação com APIs e Firebase
├── types/         # Tipagens TypeScript centralizadas (interfaces e tipos globais)
├── utils/         # Funções utilitárias e helpers reutilizáveis
└── App.tsx        # Ponto principal da aplicação
```

---

## ⚙️ Instalação e Execução Local

Siga os passos abaixo para rodar o projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/MaximillionDev1/MaxiBills-FrontEnd.git

# Acesse a pasta do projeto
cd MaxiBills-FrontEnd

# Instale as dependências
yarn install
# ou
npm install

# Inicie o servidor de desenvolvimento
yarn dev
# ou
npm run dev
```

Acesse em: **http://localhost:5173**

---

## 📊 Funcionalidades Principais

- ✅ Cadastro e edição de **transações financeiras**  
- 🧩 Organização por **categorias de despesas e receitas**  
- 📈 **Gráficos interativos** de pizza e coluna para análise visual  
- 🔐 **Autenticação com Firebase**  
- 🔔 Notificações instantâneas com **React Toastify**  
- 💾 Persistência e consumo de dados via **Axios**  
- 🧭 Navegação dinâmica e fluida com **React Router**  

---

## 🧱 Boas Práticas e Arquitetura

O projeto foi desenvolvido seguindo princípios de:
- **Componentização** e **reutilização de código**
- **Context API** para gerenciamento de estados globais  
- **Responsividade** e **UX consistente** com TailwindCSS  
- **Separação clara de responsabilidades** entre camadas (UI, lógica e dados)
- **Tipagem forte com TypeScript**, garantindo previsibilidade e segurança  

Essa estrutura torna o projeto **escalável, legível e fácil de manter**, facilitando futuras evoluções e integrações com backends em Node.js.

---

## 🤝 Contribuindo

Quer colaborar? Siga os passos:

```bash
# Crie um branch para sua feature
git checkout -b minha-feature

# Faça o commit das alterações
git commit -m "feat: adiciona nova funcionalidade"

# Envie para o repositório remoto
git push origin minha-feature
```

Depois, abra um **Pull Request** explicando suas alterações.

---

## 🧑‍💻 Sobre o Desenvolvedor

**Matheus Vinicius Rodrigues da Silva** é um desenvolvedor **Full Stack** em transição de carreira, com ampla experiência em liderança, resolução de problemas e foco em produtos digitais que entregam valor real.  
Atua com **React, Node.js, TypeScript e integração de APIs**, criando soluções modernas, escaláveis e intuitivas.

🔗 [GitHub](https://github.com/MaximillionDev1) | [LinkedIn](https://www.linkedin.com/in/matheus-vinicius-dev/)

---

## 📜 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usar, modificar e compartilhar conforme os termos da licença.

---

> 💡 *“Controle suas finanças, visualize seus resultados e tome decisões com clareza — esse é o propósito do MaxiBills.”*
