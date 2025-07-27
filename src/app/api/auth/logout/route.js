import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST() {
  const cookie = serialize('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: new Date(0), // 💔 Expire the cookie
    path: '/',
  })

  const response = NextResponse.json({ success: true, message: 'Logged out, baby 💖' })
  response.headers.set('Set-Cookie', cookie)
  return response
}