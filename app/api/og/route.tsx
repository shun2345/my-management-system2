import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

const CATEGORY_COLORS: Record<string, string> = {
  介護: '#1a3a5c',
  相続: '#c1492f',
  終活: '#1a1a1a',
  お金: '#2c5b4a',
}

const DEFAULT_BAND_COLOR = '#1a3a5c'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') ?? '実家のしらべ'
  const category = searchParams.get('category') ?? ''
  const author = searchParams.get('author') ?? '運営者'

  const bandColor = CATEGORY_COLORS[category] ?? DEFAULT_BAND_COLOR

  // Fetch fonts from Google Fonts
  const [notoSansJpData, notoSerifJpData] = await Promise.all([
    fetch(
      'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap',
    )
      .then((res) => res.text())
      .then((css) => {
        const url = css.match(/src: url\((.+?)\)/)?.[1]
        if (!url) throw new Error('Noto Sans JP font URL not found')
        return fetch(url).then((res) => res.arrayBuffer())
      }),
    fetch(
      'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&display=swap',
    )
      .then((res) => res.text())
      .then((css) => {
        const url = css.match(/src: url\((.+?)\)/)?.[1]
        if (!url) throw new Error('Noto Serif JP font URL not found')
        return fetch(url).then((res) => res.arrayBuffer())
      }),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#f5ede0',
        }}
      >
        {/* Category color band (top 8px) */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '8px',
            backgroundColor: bandColor,
          }}
        />

        {/* Main content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
            padding: '48px 56px',
          }}
        >
          {/* Site name with Vermilion bookmark motif */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '4px',
                height: '28px',
                backgroundColor: '#c1492f',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontFamily: '"Noto Sans JP"',
                fontSize: '22px',
                fontWeight: 700,
                color: '#1a1a1a',
              }}
            >
              実家のしらべ
            </span>
          </div>

          {/* Title (max 2 lines) */}
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              paddingTop: '24px',
              paddingBottom: '24px',
            }}
          >
            <span
              style={{
                fontFamily: '"Noto Serif JP"',
                fontSize: '48px',
                fontWeight: 700,
                color: '#1a1a1a',
                lineHeight: 1.4,
                overflow: 'hidden',
                lineClamp: 2,
              }}
            >
              {title}
            </span>
          </div>

          {/* Bottom row: category + author */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {category ? (
              <span
                style={{
                  fontFamily: '"Noto Sans JP"',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: bandColor,
                }}
              >
                {category}
              </span>
            ) : (
              <span />
            )}
            <span
              style={{
                fontFamily: '"Noto Sans JP"',
                fontSize: '18px',
                fontWeight: 700,
                color: '#666666',
              }}
            >
              {author}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: notoSansJpData,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Noto Serif JP',
          data: notoSerifJpData,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )
}
