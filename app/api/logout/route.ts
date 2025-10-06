// /app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.split(';').map(c => c.trim()).find(c => c.startsWith('refreshToken='));
    const refreshToken = match ? decodeURIComponent(match.split('=')[1]) : null;

    if (refreshToken) {
      const pool = await getPool();
      // Optionally delete refresh token rows for the user.
      // For demo we search by username embedded in JWT; in practice verify token.
      // Here we simply clear all tokens (or better: delete matching token hash)
      // await pool.request().query(`DELETE FROM RefreshTokens WHERE ...`);
    }

    const cookieSerialized = serialize('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return NextResponse.json({ success: true }, { status: 200, headers: { 'Set-Cookie': cookieSerialized } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
