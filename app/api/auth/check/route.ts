// app/api/auth/check/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  return NextResponse.json({
    authenticated: !!accessToken,
    canRefresh: !accessToken && !!refreshToken,
  });
}