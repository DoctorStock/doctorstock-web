import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const BACKEND_URL = process.env.BACKEND_API_URL;

  try {
    const { userId, userPassword } = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userId, password: userPassword }),
    });

    const data = await response.json();

    // 성공
    if (response.ok && data.data?.accessToken) {
      return NextResponse.json({
        success: true,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
        expiresIn: data.data.expiresIn,
      });
    }

    return NextResponse.json(
      {
        success: false,
        errorCode: data.error?.code,
      },
      { status: response.status }
    );
  } catch (error) {
    console.error('로그인 API 에러:', error);

    return NextResponse.json(
      {
        success: false,
        errorCode: 'SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}
