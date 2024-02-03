export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  const data = { success: true };

  return Response.json(data);
}
