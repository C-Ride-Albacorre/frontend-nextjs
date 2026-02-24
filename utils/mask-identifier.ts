export function maskIdentifier(identifier: string, method: 'email' | 'phone') {
  if (method === 'email') {
    const [name, domain] = identifier.split('@');
    return `${name.slice(0, 2)}****@${domain}`;
  }
  return `${identifier.slice(0, 4)}****${identifier.slice(-2)}`;
}
