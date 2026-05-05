import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'お名前は1〜100文字で入力してください')
    .max(100, 'お名前は1〜100文字で入力してください'),
  email: z
    .string()
    .email('有効なメールアドレスを入力してください'),
  subject: z
    .string()
    .min(1, '件名は1〜200文字で入力してください')
    .max(200, '件名は1〜200文字で入力してください'),
  body: z
    .string()
    .min(10, 'お問い合わせ内容は10〜5000文字で入力してください')
    .max(5000, 'お問い合わせ内容は10〜5000文字で入力してください'),
  _hp: z
    .string()
    .max(0, 'リクエストが無効です')
    .optional()
    .default(''),
})

export type ContactInput = z.infer<typeof contactSchema>
