'use server';

import { logoutService } from '../services/logout';
import {
  clearAuthCookies,
  deleteCookie,
  getCookie,
} from '@/utils/cookies';
import { jwtDecode } from 'jwt-decode';

type Role = 'CUSTOMER' | 'VENDOR' | 'ADMIN' | 'SUPER_ADMIN';

export async function logoutAction() {
  const refreshToken = await getCookie('refreshToken');
  const accessToken = await getCookie('accessToken');

  let role: Role | null = null;

  // -------------------------
  // Decode role safely (for redirect decision)
  // -------------------------
  try {
    if (accessToken) {
      const payload = jwtDecode<{ role: Role }>(accessToken);
      role = payload.role;
    }
  } catch {
    role = null;
  }

  // -------------------------
  // Revoke session on backend
  // -------------------------
  try {
    if (refreshToken) {
      await logoutService(refreshToken);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Logout API error:', error);
    }
  }

  // -------------------------
  // Clear all client-side auth state
  // -------------------------
  await deleteCookie('verify_identifier');
  await deleteCookie('registration_method');

  await clearAuthCookies();

  // -------------------------
  // Role-based redirect target
  // -------------------------
  let redirectTo = '/user/login';

  if (role === 'VENDOR') {
    redirectTo = '/vendor/login';
  }

  if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
    redirectTo = '/admin/login';
  }

  return {
    status: 'success',
    redirectTo,
  };
}