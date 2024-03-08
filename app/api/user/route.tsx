
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const page = url.searchParams.get("start");
    const size = url.searchParams.get("limit");
    const data = await fetch(`http://api.sarika.hischoolkh.com/get_users?start=${page}&limit=${size}`).then(res => res.json());

    return NextResponse.json(data);
}