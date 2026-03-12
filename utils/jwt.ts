import { jwtDecode } from "jwt-decode";

export function getTokenExpiry(token: string): number {
  try {
   const payload = jwtDecode<{ exp: number }>(token)
    const secondsFromNow = payload.exp - Math.floor(Date.now() / 1000);
    return Math.max(secondsFromNow, 0);
  } catch {
    return 0;
  }
}
