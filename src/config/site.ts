// Configuração central do site — altere aqui telefone, redes sociais, e-mail e mensagens.
// Todo o restante do site consome estes valores, então uma alteração aqui já reflete em todo lugar.

export const siteConfig = {
  name: "Júlia Pinheiro",
  fullName: "Júlia Pinheiro da Cunha",
  role: "Nutricionista",
  crn: "CRN 1: 28621",
  location: "Goiânia - GO",
  url: "https://juliapinheironutri.com.br",

  // Telefone em formato internacional (usado no link do WhatsApp) e formatado (exibição)
  whatsappNumber: "5562996006949",
  phoneDisplay: "(62) 99600-6949",

  instagramHandle: "@juliapinheiro_nutri",
  instagramUrl: "https://instagram.com/juliapinheiro_nutri",

  email: "juliacunhapinheiro@gmail.com",

  // TODO: trocar pelo link direto do perfil do Google Business assim que estiver disponível.
  googleReviewsUrl:
    "https://www.google.com/search?q=J%C3%BAlia+Pinheiro+Nutricionista+Goi%C3%A2nia+avalia%C3%A7%C3%B5es",

  // Endpoint do Formspree que recebe as respostas do formulário de pré-consulta
  // e envia por e-mail. Configurado via variável de ambiente na Vercel — veja
  // PreConsultForm.tsx para instruções de configuração.
  formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "",
} as const;

type WhatsappTopic =
  | "geral"
  | "mensal"
  | "trimestral"
  | "semestral"
  | "metodo"
  | "agendar"
  | "preconsulta";

const whatsappMessages: Record<WhatsappTopic, string> = {
  geral:
    "Olá, Júlia! Conheci seu trabalho pelo site e gostaria de saber mais sobre o acompanhamento nutricional.",
  mensal:
    "Olá, Júlia! Conheci seu trabalho pelo site e gostaria de saber mais sobre o acompanhamento mensal.",
  trimestral:
    "Olá, Júlia! Conheci seu trabalho pelo site e gostaria de saber mais sobre o acompanhamento trimestral.",
  semestral:
    "Olá, Júlia! Conheci seu trabalho pelo site e gostaria de saber mais sobre o acompanhamento semestral.",
  metodo:
    "Olá, Júlia! Vi o Método eStrat+ no seu site e gostaria de entender melhor como funciona o acompanhamento.",
  agendar:
    "Olá, Júlia! Gostaria de agendar meu acompanhamento nutricional. Pode me passar mais informações?",
  preconsulta:
    "Olá, Júlia! Acabei de preencher o formulário de pré-consulta no site.",
};

export function getWhatsappLink(topic: WhatsappTopic = "geral") {
  const message = encodeURIComponent(whatsappMessages[topic]);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}
