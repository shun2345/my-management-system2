import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'

type AuthorBoxProps = {
  author: string
}

export function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <section className="mt-12 rounded-lg border bg-card p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {SITE_NAME}{' '}
            運営者。親の介護・相続・終活・家計に関する公的制度を、一次情報に基づいて整理・発信しています。
          </p>
          <Link
            href="/about"
            className="mt-2 inline-block text-sm text-primary underline underline-offset-2"
          >
            運営者情報を見る
          </Link>
        </div>
      </div>
    </section>
  )
}
