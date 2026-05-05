import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations/contact'
import { checkRateLimit } from '@/lib/rate-limit'
import { isValidOrigin } from '@/lib/origin-check'
import { sendContactEmails } from '@/lib/email'

export async function POST(request: Request) {
  // 1. Origin検証
  const origin = request.headers.get('origin')
  if (!isValidOrigin(origin)) {
    return NextResponse.json(
      { errors: ['不正なリクエストです'] },
      { status: 403 }
    )
  }

  // 2. レートリミット
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown'
  const rateLimit = checkRateLimit(ip)
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { errors: ['送信回数の上限に達しました。しばらく時間をおいて再度お試しください。'] },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
      }
    )
  }

  // 3. Zodバリデーション
  let data: unknown
  try {
    data = await request.json()
  } catch {
    return NextResponse.json(
      { errors: ['リクエストの形式が正しくありません'] },
      { status: 400 }
    )
  }

  const result = contactSchema.safeParse(data)
  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message)
    return NextResponse.json({ errors }, { status: 400 })
  }

  // ハニーポットチェック（値が入っていたらボット）
  if (result.data._hp) {
    // ボットには成功を返して静かに無視
    return NextResponse.json({ success: true })
  }

  // 4. メール送信
  try {
    await sendContactEmails({
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
      body: result.data.body,
    })
  } catch (error) {
    console.error('[Contact API] メール送信エラー:', error)
    return NextResponse.json(
      { errors: ['送信に失敗しました。時間をおいて再度お試しください。'] },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
