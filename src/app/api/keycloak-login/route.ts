import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(
    "http://localhost:3000/api/auth/keycloakProvider/signin",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  console.log({ headers: res.headers });

  const data = await res.json();
  const setCookie = res.headers.get("set-cookie");

  console.log({ setCookie });

  const response = NextResponse.json(data, { status: res.status });

  // 👇 Forward all cookies (both session_token + session_data)

  if (setCookie?.length) {
    response.headers.append("set-cookie", setCookie);
  }

  // CORS if needed
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Origin",
    req.headers.get("origin") || "*"
  );

  return response;
}
