import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { projectId } = body;
  // Mock: just return success
  return NextResponse.json({ success: true, projectId });
}
