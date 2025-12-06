import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const BACKEND_URL = process.env.BACKEND_API_URL;
  // console.log(" 요청 받음");
  // console.log(" 백엔드 URL:", BACKEND_URL);

  try {
    const { userId, userPassword } = await request.json();
    // console.log(" 데이터 파싱 성공:", { userId });
    // console.log(" 백엔드로 요청 보내는 중...");

    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userId, password: userPassword }),
    });
    // console.log(" 백엔드 응답 받음:", response.status);

    const data = await response.json();

    if (response.ok || data.accessToken) {
      return NextResponse.json({
        success: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        exporesIn: data.expiresIn,
      });
    }
    return NextResponse.json(
      {
        success: false,
        error: data.error?.message || "로그인 실패",
        code: data.error?.code,
      },
      { status: response.status }
    );
  } catch (error) {
    console.error("로그인 API 에러:", error);
    return NextResponse.json(
      {
        success: false,
        error: "서버 오류",
      },
      { status: 500 }
    );
  }
}
