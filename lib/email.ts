import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}


interface ContactEmailParams {
  name: string
  email: string
  subject: string
  body: string
}

export async function sendContactEmails(params: ContactEmailParams) {
  const { name, email, subject, body } = params
  const resend = getResend()
  const contactTo = process.env.CONTACT_TO_EMAIL ?? ''
  const contactFrom = process.env.CONTACT_FROM_EMAIL ?? 'noreply@example.com'

  // 運営者への通知メール
  const notificationResult = await resend.emails.send({
    from: contactFrom,
    to: contactTo,
    replyTo: email,
    subject: `[お問い合わせ] ${subject}`,
    text: [
      `お問い合わせを受信しました。`,
      ``,
      `お名前: ${name}`,
      `メールアドレス: ${email}`,
      `件名: ${subject}`,
      ``,
      `--- お問い合わせ内容 ---`,
      body,
      `--- ここまで ---`,
    ].join('\n'),
  })

  if (notificationResult.error) {
    throw new Error(
      `通知メール送信失敗: ${notificationResult.error.message}`
    )
  }

  // 送信者への自動返信メール
  const autoReplyResult = await resend.emails.send({
    from: contactFrom,
    to: email,
    subject: `【実家のしらべ】お問い合わせを受け付けました`,
    text: [
      `${name} 様`,
      ``,
      `お問い合わせいただきありがとうございます。`,
      `以下の内容で受け付けました。内容を確認のうえ、ご連絡いたします。`,
      ``,
      `件名: ${subject}`,
      `お問い合わせ内容:`,
      body,
      ``,
      `---`,
      `※このメールは自動送信です。`,
      `※本メールに直接ご返信いただくことはできません。`,
      `※本サイトは情報提供を目的としており、個別の状況に応じた助言は専門家にご相談ください。`,
    ].join('\n'),
  })

  if (autoReplyResult.error) {
    throw new Error(
      `自動返信メール送信失敗: ${autoReplyResult.error.message}`
    )
  }
}
