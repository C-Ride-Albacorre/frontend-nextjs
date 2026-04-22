'use server';
import { clearVerificationCookies } from '@/utils/cookies';

export async function completeVerificationAction() {
  await clearVerificationCookies();
}
