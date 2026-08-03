import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PiCoatHangerLight, PiDroneLight, PiFlowerLotusLight } from "react-icons/pi";
import { LuCamera } from "react-icons/lu";

// ⚠️ TROQUE pelo número real do WhatsApp (formato E.164, só dígitos, com DDI 55).
// Usado tanto para exibir o número formatado quanto para montar o link wa.me
// do formulário de contato.
export const whatsappNumber = "5521970270000";
export const whatsappNumberDisplay = "(21) 97027-0000";

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Clientes", href: "#clientes" },
  { label: "Bastidores", href: "#bastidores" },
  { label: "Contato", href: "#contato" },
];

export const stats = [
  { value: 6, suffix: "+", label: "Anos de\nExperiência" },
  { value: 300, suffix: "+", label: "Projetos\nRealizados" },
  { value: 150, suffix: "+", label: "Marcas\nAtendidas" },
];

export const services = [
  {
    id: "moda",
    icon: PiCoatHangerLight,
    title: "Moda & Lifestyle",
    desc: "Editoriais autorais e campanhas com direção de arte cinematográfica.",
    image: "/images/services/moda.jpg",
  },
  {
    id: "empresas",
    icon: HiOutlineBuildingOffice2,
    title: "Empresas & Institucional",
    desc: "Filmes corporativos que traduzem propósito de marca em imagem.",
    image: "/images/services/empresas.jpg",
  },
  {
    id: "beleza",
    icon: PiFlowerLotusLight,
    title: "Beleza & Saúde",
    desc: "Fotografia sensorial para clínicas, cosméticos e wellness.",
    image: "/images/services/beleza.jpg",
  },
  {
    id: "eventos",
    icon: LuCamera,
    title: "Eventos & Coberturas",
    desc: "Cobertura completa com narrativa em tempo real e entrega ágil.",
    image: "/images/services/eventos.jpg",
  },
  {
    id: "drone",
    icon: PiDroneLight,
    title: "Drone & Aéreas",
    desc: "Tomadas aéreas certificadas que ampliam a escala da sua história.",
    image: "/images/services/drone.jpg",
  },
];

export const portfolioCategories = [
  "Todos",
  "Moda",
  "Empresas",
  "Beleza",
  "Eventos",
  "Editorial",
];

export const portfolioItems = [
  {
    id: 1,
    slug: "editorial-beija-flor",
    title: "Editorial Beija-Flor",
    category: "Moda",
    tag: "MODA",
    image: "/images/portfolio/editorial-beija-flor.jpg",
  },
  {
    id: 2,
    slug: "campanha-la-vie-est-belle",
    title: "Campanha La Vie Est Belle",
    category: "Beleza",
    tag: "BELEZA",
    image: "/images/portfolio/campanha-la-vie-est-belle.jpg",
  },
  {
    id: 3,
    slug: "institucional-clinica-care",
    title: "Institucional Clínica Care",
    category: "Empresas",
    tag: "EMPRESAS",
    image: "/images/portfolio/institucional-clinica-care.jpg",
  },
  {
    id: 4,
    slug: "show-vibes",
    title: "Show Vibes",
    category: "Eventos",
    tag: "EVENTOS",
    image: "/images/portfolio/show-vibes.jpg",
  },
  {
    id: 5,
    slug: "riviera-de-sao-lourenco",
    title: "Riviera de São Lourenço",
    category: "Editorial",
    tag: "DRONE",
    image: "/images/portfolio/riviera-de-sao-lourenco.jpg",
  },
  {
    id: 6,
    slug: "renner-verao-26",
    title: "Renner Verão 26",
    category: "Moda",
    tag: "EDITORIAL",
    image: "/images/portfolio/renner-verao-26.jpg",
  },
];

export const process = [
  {
    n: "01",
    title: "Estratégia",
    desc: "Entendemos sua marca e o objetivo do projeto.",
  },
  {
    n: "02",
    title: "Planejamento",
    desc: "Roteiro, moodboard e planejamento técnico.",
  },
  {
    n: "03",
    title: "Produção",
    desc: "Captação com equipamentos profissionais e equipe.",
  },
  {
    n: "04",
    title: "Pós-Produção",
    desc: "Edição, color grading e entrega impecável.",
  },
];

export const clients = [
  "SEBRAE",
  "L'ORÉAL",
  "brMalls",
  "dasa",
  "RENNER",
  "vivo",
  "BTG Pactual",
  "Amil",
];

export const testimonials = [
  {
    name: "Marina Costa",
    role: "Diretora de Marketing, Renner",
    quote:
      "O Vítor entende de narrativa como poucos. Cada entrega elevou o padrão das nossas campanhas.",
    stars: 5,
  },
  {
    name: "Rafael Nogueira",
    role: "Head de Branding, BTG Pactual",
    quote:
      "Processo extremamente profissional, do roteiro à entrega final. Resultado impecável.",
    stars: 5,
  },
  {
    name: "Juliana Prado",
    role: "CMO, L'Oréal Brasil",
    quote:
      "Sensibilidade visual rara. As imagens comunicam exatamente o que a marca precisa dizer.",
    stars: 5,
  },
];
