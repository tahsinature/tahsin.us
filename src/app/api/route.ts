import {} from "zod";

export async function POST(req: Request) {
  return Response.json({
    error: null,
    data: null,
    message: "Hello from Root API!",
  });
}
