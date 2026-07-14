// Telegram notifications for new leads.
// Token + chat id live in server-only env vars (never exposed to the client).

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_LEADS_CHAT_ID

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export type LeadNotification = {
  name?: string | null
  phone: string
  email?: string | null
  source?: string | null
}

/**
 * Send a lead to the Telegram chat. Fire-and-forget: never throws,
 * so a Telegram outage can't break lead capture.
 */
export async function notifyLead(lead: LeadNotification): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_LEADS_CHAT_ID not set — skipping notify')
    return
  }

  const lines = [
    '🎓 <b>Новая заявка — KIM AI School</b>',
    lead.name ? `👤 Имя: ${escapeHtml(lead.name)}` : null,
    `📞 Телефон: ${escapeHtml(lead.phone)}`,
    lead.email ? `✉️ Email: ${escapeHtml(lead.email)}` : null,
    lead.source ? `🔗 Источник: ${escapeHtml(lead.source)}` : null,
  ].filter(Boolean)

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    if (!res.ok) {
      console.error('[telegram] sendMessage failed:', res.status, await res.text())
    }
  } catch (err) {
    console.error('[telegram] notify error:', err)
  }
}
