import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const plan = (user.unsafeMetadata?.familyPlan ?? null) as FamilyPlan | null;
  return NextResponse.json(plan);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const plan: FamilyPlan = await req.json();
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    unsafeMetadata: { familyPlan: plan },
  });
  return NextResponse.json({ ok: true });
}

export interface FamilyPlan {
  contacts: { isim: string; telefon: string; iliski: string }[];
  uyeler?: { isim: string; iliski: string; konum: string; telefon: string }[];
  bulusmaNoktasi: string;
  bulusmaAdresi: string;
  bulusmaLat?: number;
  bulusmaLon?: number;
  notlar: string;
  guncellendi: string;
}
