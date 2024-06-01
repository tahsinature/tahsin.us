import services from "@/services";
import { NextRequest } from "next/server";

// import {} from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.name || !body.message) {
    return Response.json({ data: null, error: "name and message are required." }, { status: 400 });
  }

  const modRes = await services.ai.checkUserInput(body.name, body.message);
  if (modRes.error) {
    return Response.json({ data: null, error: modRes.error }, { status: 400 });
  }

  const saveResult = await services.guestBook.saveComment(modRes.data.name, modRes.data.message);

  return Response.json({
    error: null,
    data: { record: saveResult, reply: modRes.reply },
  });
}
