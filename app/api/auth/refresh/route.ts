import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const BACKEND_URL = process.env.BACKEND_API_URL;

  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          errorCode: 'MISSING_REFRESH_TOKEN',
        },
        { status: 400 }
      );
    }
    const response = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

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
    console.error('토큰 갱신 API 에러:', error);

    return NextResponse.json(
      {
        success: false,
        errorCode: 'SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}
