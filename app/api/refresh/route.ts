// /app/api/refresh/route.ts
import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { verifyRefreshToken, signAccessToken, verifyAccessToken } from '@/lib/jwt';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.split(';').map(c => c.trim()).find(c => c.startsWith('refreshToken='));
    const refreshToken = match ? decodeURIComponent(match.split('=')[1]) : null;

    if (!refreshToken) return NextResponse.json({ error: 'No refresh token' }, { status: 401 });

    // verify signature
    let payload: any;
    try {
      payload = verifyRefreshToken(refreshToken) as any;
    } catch (e) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    const pool = await getPool();
    const username = payload.username;

    // fetch stored hashed token
    const rows = await pool.request()
      .input('username', username)
      .query(`SELECT TOP 1 TokenHash, ExpiresAt FROM RefreshTokens WHERE Username = @username ORDER BY Id DESC`);

    if (!rows.recordset.length) {
      return NextResponse.json({ error: 'Refresh token not found' }, { status: 401 });
    }

    const { TokenHash: tokenHash, ExpiresAt } = rows.recordset[0];

    // check expiry
    if (new Date(ExpiresAt) < new Date()) {
      return NextResponse.json({ error: 'Refresh token expired' }, { status: 401 });
    }

    // compare hashed tokens
    const ok = await bcrypt.compare(refreshToken, tokenHash);
    if (!ok) return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });

    // issue new access token (optionally rotate refresh tokens here)
    const newAccessToken = signAccessToken({ username });

    return NextResponse.json({ success: true, accessToken: newAccessToken });
  } catch (err) {
    console.error('Refresh Error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
