import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  try {
    const { buyukluk, konum, derinlik, tarih } = await req.json();

    if (!buyukluk || !konum) {
      return NextResponse.json({ error: 'Eksik veri' }, { status: 400 });
    }

    const prompt = `Sen bir deprem ve sismoloji uzmanısın. Aşağıdaki deprem verilerini analiz et ve Türkçe olarak kısa, sade bir değerlendirme yap.

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
