export async function GET() {
  return Response.json({
    baseUrl: process.env.BASE_URL ? 'set' : 'MISSING',
    env: process.env.NODE_ENV,
  });
}