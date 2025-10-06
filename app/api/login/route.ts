// /app/api/login/route.ts
import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });

    const pool = await getPool();
    // Query user. Adjust column names if different.
    const result = await pool.request()
      .input('username', username)
      .query(`SELECT TOP 1 Username, Password FROM [Users] WHERE Username = @username`);

    if (!result.recordset.length) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const user = result.recordset[0];
    const dbPassword = user.Password as string;

    // If DB contains hashed passwords: compare with bcrypt
    // If DB uses plaintext (temporary), compare directly, but **migrate** to hashes ASAP.
    let passwordMatches = false;
    if (dbPassword.startsWith('$2a$') || dbPassword.startsWith('$2b$')) {
      passwordMatches = await bcrypt.compare(password, dbPassword);
    } else {
      // fallback for legacy plaintext (temporary)
      passwordMatches = password === dbPassword;
    }

    if (!passwordMatches) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // create tokens
    const accessToken = signAccessToken({ username: user.Username });
    const refreshToken = signRefreshToken({ username: user.Username });

    // TODO: store hashed refreshToken in DB (recommended)
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7); // match REFRESH_EXPIRES_IN

    await pool.request()
      .input('username', user.Username)
      .input('tokenHash', hashedRefresh)
      .input('expiresAt', expireDate)
      .query(`
        INSERT INTO RefreshTokens (Username, TokenHash, ExpiresAt)
        VALUES (@username, @tokenHash, @expiresAt)
      `);

    // set refresh token cookie (HttpOnly, Secure in prod)
    const cookieSerialized = serialize('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({ success: true, accessToken }, {
      status: 200,
      headers: { 'Set-Cookie': cookieSerialized },
    });
  } catch (err) {
    console.error('Login Error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
