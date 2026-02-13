/**
 * Serverless function to send bug reports to Telegram.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category, page, message } = req.body;

  if (!category || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BUG_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Missing Telegram environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const pageInfo = page ? `\nSida: ${page}` : '';
  const text = `🐛 Buggrapport från ellenengineer.com

Kategori: ${category}${pageInfo}

${message}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    if (!response.ok) {
      throw new Error('Telegram API error');
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send to Telegram:', error);
    return res.status(500).json({ error: 'Failed to send report' });
  }
}
