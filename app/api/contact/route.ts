import { NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateBody(data: unknown): string[] {
  const errors: string[] = []

  if (typeof data !== 'object' || data === null) {
    return ['リクエストの形式が正しくありません']
  }

  const { name, email, subject, body } = data as Record<string, unknown>

  if (typeof name !== 'string' || name.length < 1 || name.length > 100) {
    errors.push('お名前は1〜100文字で入力してください')
  }

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    errors.push('有効なメールアドレスを入力してください')
  }

  if (
    typeof subject !== 'string' ||
    subject.length < 1 ||
    subject.length > 200
  ) {
    errors.push('件名は1〜200文字で入力してください')
  }

  if (
    typeof body !== 'string' ||
    body.length < 10 ||
    body.length > 5000
  ) {
    errors.push('お問い合わせ内容は10〜5000文字で入力してください')
  }

  return errors
}

export async function POST(request: Request) {
  let data: unknown
  try {
    data = await request.json()
  } catch {
    return NextResponse.json(
      { errors: ['リクエストの形式が正しくありません'] },
      { status: 400 }
    )
  }

  const errors = validateBody(data)
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  const { name, email, subject, body } = data as Record<string, string>

  // TODO: メールサービス（Resend / SendGrid）を統合する
  // ここで送信処理を実装する
  console.log('[Contact Form]', { name, email, subject, body })

  return NextResponse.json({ success: true })
}
