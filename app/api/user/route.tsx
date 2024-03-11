// Import NextResponse from next/server
import { NextResponse } from "next/server";

// Define a constant variable
export const dynamic = "force-dynamic";

// GET request handler function
export async function GET(req: Request) {
  // Extract query parameters from the request URL
  const url = new URL(req.url);
  const page = url.searchParams.get("start"); // Get the value of the 'start' query parameter
  const size = url.searchParams.get("limit"); // Get the value of the 'limit' query parameter

  // Fetch data from the external API using the extracted query parameters
  const data = await fetch(
    `http://api.sarika.hischoolkh.com/get_users?start=${page}&limit=${size}`
  ).then((res) => res.json()); // Convert the response to JSON format

  // Return the fetched data as a JSON response
  return NextResponse.json(data);
}
