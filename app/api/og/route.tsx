import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') ?? '介護とお金の制度ガイド';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        {title}
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
