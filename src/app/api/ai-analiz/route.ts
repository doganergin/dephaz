import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  try {
    const { buyukluk, konum, derinlik, tarih, lang } = await req.json();
    const EN = lang === 'EN';

    if (!buyukluk || !konum) {
      return NextResponse.json({ error: 'Eksik veri' }, { status: 400 });
    }

    const prompt = EN
      ? `You are an earthquake and seismology expert. Analyze the following earthquake data and provide a short, clear assessment in English.

Earthquake Data:
- Magnitude: M${buyukluk}
- Location: ${konum}
- Depth: ${derinlik} km
- Date: ${tarih}

Evaluate the following (4-5 sentences total, plain language):
1. Risk level (will it be felt? any damage risk?)
2. Effect of the depth
3. Aftershock expectation
4. Brief advice for the public

Avoid technical jargon. Write so anyone can understand.`
      : `Sen bir deprem ve sismoloji uzmanısın. Aşağıdaki deprem verilerini analiz et ve Türkçe olarak kısa, sade bir değerlendirme yap.

Deprem Bilgileri:
- Büyüklük: M${buyukluk}
- Konum: ${konum}
- Derinlik: ${derinlik} km
- Tarih: ${tarih}

Şunları değerlendir (toplam 4-5 cümle, sade ve anlaşılır):
1. Bu depremin risk seviyesi (hissedilir mi, hasar riski var mı?)
2. Derinliğinin etkisi
3. Artçı sarsıntı beklentisi
4. Vatandaşlar için kısa öneri

Teknik jargon kullanma, herkesin anlayacağı dilde yaz.`;

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ analiz: text });
  } catch (err) {
    console.error('[ai-analiz]', err);
    return NextResponse.json({ error: 'Analiz yapılamadı' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
