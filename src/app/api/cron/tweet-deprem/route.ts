import { NextResponse } from 'next/server';
import crypto from 'crypto';

const LAST_TWEET_KEY = 'last_tweeted_eq';
const MIN_MAG = 4.0;

// Twitter OAuth 1.0a imzalama
function oauthSign(method: string, url: string, params: Record<string, string>, secrets: { apiSecret: string; tokenSecret: string }) {
  const sorted = Object.entries(params).sort(([a], [b]) => a.localeCompare(b));
  const paramStr = sorted.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
  const base = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(paramStr)}`;
  const signingKey = `${encodeURIComponent(secrets.apiSecret)}&${encodeURIComponent(secrets.tokenSecret)}`;
  return crypto.createHmac('sha1', signingKey).update(base).digest('base64');
}

async function postTweet(text: string) {
  const apiKey        = process.env.TWITTER_API_KEY!;
  const apiSecret     = process.env.TWITTER_API_SECRET!;
  const accessToken   = process.env.TWITTER_ACCESS_TOKEN!;
  const accessSecret  = process.env.TWITTER_ACCESS_SECRET!;

  const url = 'https://api.twitter.com/2/tweets';
  const nonce = crypto.randomBytes(16).toString('hex');
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const oauthParams: Record<string, string> = {
    oauth_consumer_key:     apiKey,
    oauth_nonce:            nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp:        timestamp,
    oauth_token:            accessToken,
    oauth_version:          '1.0',
  };

  const signature = oauthSign('POST', url, oauthParams, { apiSecret, tokenSecret: accessSecret });
  oauthParams.oauth_signature = signature;

  const authHeader = 'OAuth ' + Object.entries(oauthParams)
    .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
    .join(', ');

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error(`Twitter API: ${res.status} ${await res.text()}`);
  return res.json();
}

// Vercel KV yerine basit in-memory cache (process restart'ta sıfırlanır, yeterli)
const tweetedIds = new Set<string>();

export async function GET(req: Request) {
  // Cron güvenliği
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Önce Deprem Ağı (en hızlı), fallback Kandilli
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://depremhatti.com';
    let eq: Record<string, unknown> | null = null;
    let kaynak = 'Deprem Ağı';

    const daRes = await fetch(`${base}/api/depremagi?limit=5&minmag=${MIN_MAG}`, { cache: 'no-store' });
    if (daRes.ok) {
      const daData = await daRes.json();
      if (Array.isArray(daData) && daData.length > 0) eq = daData[0];
    }

    if (!eq) {
      kaynak = 'Kandilli';
      const kRes = await fetch(`${base}/api/kandilli?limit=5&minmag=${MIN_MAG}`, { cache: 'no-store' });
      if (!kRes.ok) return NextResponse.json({ skipped: 'veri alınamadı' });
      const kData = await kRes.json();
      if (!Array.isArray(kData) || kData.length === 0) return NextResponse.json({ skipped: 'veri yok' });
      eq = kData[0];
    }

    if (!eq) return NextResponse.json({ skipped: 'veri yok' });
    const id = `${eq.tarih}-${eq.konum}-${eq.buyukluk}`;

    if (tweetedIds.has(id)) return NextResponse.json({ skipped: 'zaten tweetlendi' });

    const mag = Number(eq.buyukluk).toFixed(1);
    const emoji = Number(eq.buyukluk) >= 6 ? '🔴' : Number(eq.buyukluk) >= 5 ? '🟠' : '🟡';

    const tweet = `${emoji} DEPREM | M${mag}
📍 ${eq.konum}
⏱ ${eq.tarih}
🔽 Derinlik: ${eq.derinlik} km
Kaynak: ${kaynak}

🔗 depremhatti.com/harita
#deprem #depremhatti #AFAD`;

    await postTweet(tweet);
    tweetedIds.add(id);

    // Seti fazla büyümesin
    if (tweetedIds.size > 100) {
      const first = tweetedIds.values().next().value;
      if (first) tweetedIds.delete(first);
    }

    return NextResponse.json({ tweeted: true, mag, konum: eq.konum });
  } catch (err) {
    console.error('[tweet-deprem]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
