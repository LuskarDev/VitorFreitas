# Vítor Freitas — Filmmaker

Website premium (Dark Luxury) para filmmaker, construído com React 19 + Vite + Tailwind CSS v4, com animações GSAP/ScrollTrigger, Framer Motion, Lenis (smooth scroll), Swiper e cursor customizado.

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:5173

## Build de produção

```bash
npm run build
npm run preview
```

## Stack

- React 19 + Vite
- Tailwind CSS v4 (tokens de design em `src/index.css` via `@theme`)
- GSAP + ScrollTrigger (reveals, parallax, timeline animada, count-up)
- Framer Motion (menu mobile, filtro de portfólio, toast de sucesso)
- Lenis (smooth scroll)
- Swiper (serviços, depoimentos)
- react-icons + lucide-react
- React Router (pronto para expansão em páginas de projeto individuais)

## Estrutura

```
src/
  components/
    Hero, Navbar, Footer, Services, Portfolio,
    Clients, About, Testimonials, Bastidores,
    CTA, Contact, Cursor
  pages/
    Home.jsx         -> landing page (todas as seções)
    ProjectPage.jsx   -> página de projeto individual (/projeto/:slug)
  hooks/          -> useLenis, useScrollReveal, useIsTouchDevice
  data/
    content.js    -> conteúdo geral do site (nav, stats, serviços, etc.)
    projects.js   -> conteúdo completo de cada case (problema/solução/
                     resultado, depoimento, galeria, projetos relacionados)
public/
  images/         -> hero, logo (bastidores/portfólio usam placeholders
                     em gradiente dourado — substitua por fotos/vídeos reais)
```

## Páginas de projeto

Cada card do Portfólio leva para `/projeto/:slug` (ex: `/projeto/editorial-beija-flor`),
uma página de case completa com:

- Hero em tela cheia com a capa do projeto
- Barra de metadados (cliente, ano, categoria, serviços)
- Blocos Problema / Solução / Resultado
- Vídeo principal do projeto (placeholder clicável)
- Galeria de fotos
- Making Of (bastidores da produção)
- Depoimento do cliente
- Projetos relacionados (mesma categoria primeiro)

Para adicionar um novo projeto: crie uma entrada em `portfolioItems`
(`src/data/content.js`, com `slug` único) e o case completo correspondente
em `projectDetails` (`src/data/projects.js`).

## Próximos passos sugeridos

- Substituir os placeholders em gradiente (Portfólio, Serviços, Bastidores,
  Galeria de projeto) por vídeos/fotos reais do portfólio de Vítor Freitas
  (formatos WebP/MP4, comprimidos).
- Conectar o formulário de contato a um backend/serviço de e-mail (ex.
  Formspree, Resend, ou API própria).
- Adicionar vídeo de fundo no Hero e na seção CTA (atualmente usa imagem
  estática com overlay).
