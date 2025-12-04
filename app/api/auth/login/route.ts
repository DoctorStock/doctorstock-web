// const BACKEND_URL = process.env.BACKEND_API_URL;

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, userPassword } = await request.json();

    const response = await fetch("http://doctorstock.kr/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userId, password: userPassword }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json(
        {
          error: data.error?.message || "로그인 살패",
          code: data.error?.code,
        },
        { status: response.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("로그인 API 에러:", error);
  }
}
