import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessCode } = body;

    const expectedCode = process.env.BHG_EDGE_ACCESS_CODE || 'bhg-demo-2025';

    if (accessCode === expectedCode) {
      const response = NextResponse.json({ success: true });

      // Set cookie for 30 days
      response.cookies.set('bhg_edge_access', 'granted', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid access code' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
