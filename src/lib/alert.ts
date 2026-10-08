const ALERT_TO_EMAIL = 'juliacunhapinheiro@gmail.com';

// Avisa por e-mail quando um fluxo crítico falha de verdade. Nunca deixa um
// problema no envio do alerta derrubar a ação que estava sendo executada.
export async function sendErrorAlert(context: string, error: unknown) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Área eStrat+ <onboarding@resend.dev>',
        to: ALERT_TO_EMAIL,
        subject: `Erro na Área eStrat+: ${context}`,
        text: `Contexto: ${context}\n\nErro: ${message}\n\n${stack ?? ''}\n\nHorário: ${new Date().toISOString()}`,
      }),
    });
  } catch {
    // o alerta é um bônus — nunca deve quebrar o fluxo principal
  }
}
