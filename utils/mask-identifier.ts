export function maskIdentifier(identifier: string, method: 'email' | 'phone number'): string {
  if (method === 'email') {
    const [name, domain] = identifier.split('@');
    return `${name.slice(0, 4)}****@${domain}`;
  }
  return `${identifier.slice(0, 6)}*****${identifier.slice(-4)}`;
}
