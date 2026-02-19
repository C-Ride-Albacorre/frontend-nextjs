export function getTokenExpiry(token: string): number {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );

    const secondsFromNow = payload.exp - Math.floor(Date.now() / 1000);

    return Math.max(secondsFromNow, 0);
  } catch {
    return 0;
  }
}
