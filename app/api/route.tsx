// Import NextResponse from next/server
import { NextResponse } from "next/server";

// Define a constant variable
export const dynamic = "force-dynamic";

// GET request handler function
export async function GET(req: Request) {
  // Extract query parameters from the request URL
  const url = new URL(req.url);
  const page = url.searchParams.get("start"); // Page number
  const userId = url.searchParams.get("userId"); // User ID
  const size = url.searchParams.get("limit"); // Limit of items per page

  // Fetch data from the API based on the query parameters
  const data = await fetch(`
    http://api.sarika.hischoolkh.com/get_texts_by_user/${userId}?start=${page}&limit=${size}
    `).then((res) => res.json()); // Convert response to JSON

  // Return the fetched data as a JSON response
  return NextResponse.json(data);
}
