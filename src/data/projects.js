import { portfolioItems } from "./content";

// Reuses the base info from portfolioItems (id, slug, title, category, tag)
// and layers on the full case-study content shown on the project page.
export const projectDetails = {
  "editorial-beija-flor": {
    client: "Beija-Flor Moda",
    year: "2025",
    services: ["Direção Criativa", "Fotografia", "Filmagem"],
    cover: "/images/hero/photographer-1.png",
    problem:
      "A marca precisava de um editorial que rompesse com o catálogo tradicional e comunicasse a nova coleção como uma experiência sensorial, não apenas um produto.",
    solution:
      "Construímos um roteiro visual com luz natural, movimento e locações que dialogam com a identidade da coleção — unindo still e vídeo numa única captação.",
    result:
      "O editorial se tornou a peça central da campanha de lançamento, usado em mídia paga, e-commerce e vitrines físicas em todo o Brasil.",
    testimonial: {
      quote:
        "As imagens capturaram exatamente a atmosfera que buscávamos. Elevou o padrão de tudo que fazemos depois.",
      name: "Marina Costa",
      role: "Diretora de Marketing, Beija-Flor",
    },
    galleryCount: 8,
  },
  "campanha-la-vie-est-belle": {
    client: "L'Oréal Brasil",
    year: "2025",
    services: ["Fotografia de Beleza", "Direção de Arte"],
    cover: "/images/hero/photographer-2.png",
    problem:
      "Lançamento de fragrância exigia imagens que comunicassem sofisticação e emoção em poucos segundos de scroll.",
    solution:
      "Sessão em estúdio com iluminação dramática e color grading autoral, priorizando textura, pele e luz dourada como assinatura visual.",
    result:
      "Campanha com maior taxa de engajamento do trimestre nos canais digitais da marca no Brasil.",
    testimonial: {
      quote:
        "Sensibilidade visual rara. As imagens comunicam exatamente o que a marca precisa dizer.",
      name: "Juliana Prado",
      role: "CMO, L'Oréal Brasil",
    },
    galleryCount: 6,
  },
  "institucional-clinica-care": {
    client: "Clínica Care",
    year: "2024",
    services: ["Vídeo Institucional", "Fotografia Corporativa"],
    cover: "/images/hero/photographer-1.png",
    problem:
      "A clínica precisava transmitir confiança e humanidade num setor onde a comunicação costuma ser fria e genérica.",
    solution:
      "Documentamos rotinas reais da equipe médica com uma linguagem intimista, priorizando close-ups e som ambiente natural.",
    result:
      "O filme institucional passou a abrir todas as apresentações comerciais da clínica e aumentou em 30% os agendamentos vindos do site.",
    testimonial: {
      quote:
        "Processo extremamente profissional, do roteiro à entrega final. Resultado impecável.",
      name: "Rafael Nogueira",
      role: "Head de Branding, BTG Pactual",
    },
    galleryCount: 7,
  },
  "show-vibes": {
    client: "Show Vibes Produções",
    year: "2025",
    services: ["Cobertura de Evento", "Edição Same-Day"],
    cover: "/images/hero/photographer-2.png",
    problem:
      "Evento de grande porte precisava de conteúdo pronto para redes sociais ainda durante a madrugada do show.",
    solution:
      "Equipe dedicada de captação simultânea (foto + vídeo) com fluxo de edição paralelo para entrega em tempo recorde.",
    result:
      "Primeiras peças no ar 40 minutos após o encerramento do evento, gerando pico de alcance orgânico nas redes do cliente.",
    testimonial: {
      quote:
        "O Vítor entende de narrativa como poucos. Cada entrega elevou o padrão das nossas campanhas.",
      name: "Marina Costa",
      role: "Diretora de Marketing, Renner",
    },
    galleryCount: 9,
  },
  "riviera-de-sao-lourenco": {
    client: "Riviera de São Lourenço",
    year: "2024",
    services: ["Drone & Aéreas", "Filmagem Institucional"],
    cover: "/images/hero/photographer-1.png",
    problem:
      "O empreendimento precisava mostrar escala e localização de um jeito que fotos terrestres não conseguiam transmitir.",
    solution:
      "Planejamento de voo certificado com múltiplas janelas de luz (golden hour e blue hour) para capturar a extensão do litoral.",
    result:
      "Material aéreo usado em todo o funil de vendas, do anúncio digital ao stand de vendas físico.",
    testimonial: {
      quote:
        "Sensibilidade visual rara e execução técnica impecável do início ao fim.",
      name: "Juliana Prado",
      role: "CMO, L'Oréal Brasil",
    },
    galleryCount: 6,
  },
  "renner-verao-26": {
    client: "Renner",
    year: "2026",
    services: ["Campanha de Moda", "Direção Criativa"],
    cover: "/images/hero/photographer-2.png",
    problem:
      "A coleção Verão 26 precisava de uma campanha nacional que funcionasse tanto em outdoor quanto em formato vertical para redes sociais.",
    solution:
      "Produção multi-formato num único set, com direção de movimento pensada para recortes 16:9, 1:1 e 9:16 sem perder composição.",
    result:
      "Campanha veiculada em mídia nacional com aproveitamento de 100% do material em todos os formatos planejados.",
    testimonial: {
      quote:
        "O Vítor entende de narrativa como poucos. Cada entrega elevou o padrão das nossas campanhas.",
      name: "Marina Costa",
      role: "Diretora de Marketing, Renner",
    },
    galleryCount: 10,
  },
};

export function getProjectBySlug(slug) {
  const base = portfolioItems.find((p) => p.slug === slug);
  if (!base) return null;
  return { ...base, ...projectDetails[slug] };
}

export function getRelatedProjects(slug, count = 3) {
  const current = portfolioItems.find((p) => p.slug === slug);
  const pool = portfolioItems.filter((p) => p.slug !== slug);
  const sameCategory = pool.filter((p) => p.category === current?.category);
  const rest = pool.filter((p) => p.category !== current?.category);
  return [...sameCategory, ...rest].slice(0, count);
}
