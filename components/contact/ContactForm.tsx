'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      body: formData.get('body') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        setErrorMessage(
          json.errors?.join('\n') ?? '送信に失敗しました。時間をおいて再度お試しください。'
        )
        setStatus('error')
        return
      }

      setStatus('success')
      e.currentTarget.reset()
    } catch {
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-muted/50 px-6 py-10 text-center">
        <CheckCircle className="size-10 text-semantic-success" />
        <p className="text-lg font-medium">送信が完了しました</p>
        <p className="text-sm text-muted-foreground">
          お問い合わせいただきありがとうございます。内容を確認のうえ、ご連絡いたします。
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => setStatus('idle')}
        >
          新しいお問い合わせ
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* お名前 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          お名前
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* 件名 */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium">
          件名
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          maxLength={200}
          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* お問い合わせ内容 */}
      <div>
        <label htmlFor="body" className="block text-sm font-medium">
          お問い合わせ内容
        </label>
        <textarea
          id="body"
          name="body"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          10文字以上でご記入ください
        </p>
      </div>

      {/* エラーメッセージ */}
      {status === 'error' && errorMessage && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      {/* 送信ボタン */}
      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto"
      >
        {status === 'submitting' ? '送信中...' : '送信する'}
      </Button>
    </form>
  )
}
