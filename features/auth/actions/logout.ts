'use server';

import { redirect } from 'next/navigation';
import { logoutService } from '../services/logout';
import { clearAuthCookies, getCookie } from '@/utils/cookies';

export async function logoutAction(redirectTo: string = '/user/login') {
  const accessToken = await getCookie('accessToken');

  try {
    if (accessToken) {
      await logoutService(accessToken);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Logout API error:', error);
    }
  } finally {
    // ✅ always clear cookies regardless of API response
    await clearAuthCookies();
  }

  redirect(redirectTo);
}
