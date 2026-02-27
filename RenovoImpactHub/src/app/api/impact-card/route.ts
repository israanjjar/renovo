import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month') ?? '';
  // Placeholder for @vercel/og image generation
  return NextResponse.json({
    message: 'Impact card image generation placeholder',
    month,
    note: 'Wire up @vercel/og (Satori) for real image generation',
  });
}
