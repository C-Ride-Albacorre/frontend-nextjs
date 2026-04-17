'use server';

import { logoutService } from '../services/logout';
import { clearAuthCookies, deleteCookie, getCookie } from '@/utils/cookies';

export async function logoutAction(redirectTo: string = '/user/login') {
  const refreshToken = await getCookie('refreshToken');

  try {
    if (refreshToken) {
      await logoutService(refreshToken);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Logout API error:', error);
    }
  } finally {
    await deleteCookie('verify_identifier');
    await deleteCookie('registration_method');
    await clearAuthCookies();
  }
}
