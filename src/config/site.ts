// Configuração central do site — altere aqui telefone, redes sociais, e-mail e mensagens.
// Todo o restante do site consome estes valores, então uma alteração aqui já reflete em todo lugar.

export const siteConfig = {
  name: "Júlia Pinheiro",
  fullName: "Júlia Pinheiro da Cunha",
  role: "Nutricionista",
  crn: "CRN 1: 28621",
  location: "Goiânia - GO",
  // TODO: trocar pelo domínio próprio assim que for registrado (ex: https://juliapinheironutri.com.br)
  url: "https://site-julia-pinheiro.vercel.app",

  // Telefone em formato internacional (usado no link do WhatsApp) e formatado (exibição)
  whatsappNumber: "5562996006949",
  phoneDisplay: "(62) 99600-6949",

  instagramHandle: "@juliapinheiro_nutri",
  instagramUrl: "https://instagram.com/juliapinheiro_nutri",

  email: "juliacunhapinheiro@gmail.com",
} as const;

type WhatsappTopic = "geral" | "mensal" | "trimestral" | "semestral" | "metodo" | "agendar";

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
};

export function getWhatsappLink(topic: WhatsappTopic = "geral") {
  const message = encodeURIComponent(whatsappMessages[topic]);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}
