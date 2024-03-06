import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("start");
  const userId = url.searchParams.get("userId");
  const size = url.searchParams.get("limit");

  const data = await fetch(`
    http://api.sarika.hischoolkh.com/get_texts_by_user/${userId}?start=${page}&limit=${size}
    `).then((res) => res.json());

  return NextResponse.json(data);
}
