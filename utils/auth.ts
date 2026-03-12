// utils/auth.ts
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

type JWTPayload = {
  sub: string
  email: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'VENDOR' | 'CUSTOMER'
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) return null

  try {
    const payload = jwtDecode<JWTPayload>(token)

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    }
  } catch {
    return null
  }
}