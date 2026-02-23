if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is not set');
}

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;