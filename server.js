/**
 * Express server for ellenengineer.com
 * Handles static files, API endpoints, and SPA routing.
 */
const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '8497319941:AAG2PX1Ll3uU9ctKLxLTtBpLHqAJZnC20O0';
const CHAT_ID = '7993207864';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

/** Sends a message to Telegram. */
function sendTelegram(text) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ chat_id: CHAT_ID, text });
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve());
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/** Gets location from IP address. */
async function getLocation(ip) {
  return new Promise((resolve) => {
    if (!ip || ip === '127.0.0.1' || ip === '::1') {
      resolve('Localhost');
      return;
    }
    https.get(`https://ipapi.co/${ip}/json/`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const geo = JSON.parse(data);
          if (geo.city) {
            resolve(`${geo.city}, ${geo.region || geo.country_name || ''}`);
          } else {
            resolve('Okänd plats');
          }
        } catch {
          resolve('Okänd plats');
        }
      });
    }).on('error', () => resolve('Okänd plats'));
  });
}

/** API: Visitor notification. */
app.post('/api/notify', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
               req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
    const device = isMobile ? '📱 Mobil' : '💻 Dator';
    const location = await getLocation(ip);

    const text = `👋 Besökare på ellenengineer.com!

${device}
📍 ${location}
🌐 ${ip}`;

    await sendTelegram(text);
    res.json({ ok: true });
  } catch (error) {
    console.error('Notify error:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

/** API: Bug report. */
app.post('/api/report-bug', async (req, res) => {
  try {
    const { category, page, description } = req.body;

    const text = `🐛 Buggrapport från ellenengineer.com!

📁 Kategori: ${category || 'Ej angiven'}
📄 Sida: ${page || 'Ej angiven'}
📝 Beskrivning: ${description || 'Ingen beskrivning'}`;

    await sendTelegram(text);
    res.json({ ok: true });
  } catch (error) {
    console.error('Report bug error:', error);
    res.status(500).json({ error: 'Failed to send report' });
  }
});

/** SPA fallback - serves index.html for all other routes. */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
