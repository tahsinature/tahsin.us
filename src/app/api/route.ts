export async function POST(req: Request) {
  const body = await req.json();

  const data = { success: true };

  return Response.json(data);
}
