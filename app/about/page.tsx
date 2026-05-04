import type { Metadata } from 'next'
import Link from 'next/link'
import { generateSeoMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = generateSeoMetadata({
  title: '運営者情報',
  description:
    '当サイトの運営方針・運営者の立場・情報発信のポリシーについてご案内します',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: '運営者情報' },
        ]}
      />

      <h1 className="mt-4 text-2xl font-semibold">運営者情報</h1>

      <div className="mt-8 space-y-10">
        {/* サイトについて */}
        <section>
          <h2 className="text-xl font-semibold">サイトについて</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            {SITE_NAME}
            は、40〜50代の方を主な読者として、親の介護・相続・終活・家計に関する公的制度と一般情報をわかりやすく整理するメディアです。
          </p>
          <p className="mt-3 leading-relaxed text-foreground/80">
            厚生労働省・国税庁・内閣府などの公的機関が公表している一次情報をもとに、制度の概要や手続きの流れを解説しています。
          </p>
        </section>

        {/* 運営者の立場 */}
        <section>
          <h2 className="text-xl font-semibold">運営者の立場</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            当サイトの運営者は、特定の士業（弁護士・税理士・司法書士など）や金融商品の販売者ではありません。公的資料をもとに情報を整理し、読者の方がご自身の状況に合った選択肢を見つけるための手がかりを提供する「情報整理者」として発信しています。
          </p>
          <p className="mt-3 leading-relaxed text-foreground/80">
            個別の法律相談・税務相談・金融商品の推奨は行っておりません。具体的なご判断が必要な場合は、各分野の専門家にご相談ください。
          </p>
        </section>

        {/* 保有資格 */}
        <section>
          <h2 className="text-xl font-semibold">保有資格</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            取得次第、こちらに追記いたします。
          </p>
        </section>

        {/* 情報発信の方針 */}
        <section>
          <h2 className="text-xl font-semibold">情報発信の方針</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            当サイトでは、以下の方針に基づいて情報を発信しています。
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-foreground/80">
            <li>
              個人の体験談ではなく、公的資料に基づいた制度解説に徹します
            </li>
            <li>
              数値やデータを引用する場合は、出典元を必ず明記します
            </li>
            <li>
              個別具体的な金融・税務・法律の助言は行わず、専門家への相談を促します
            </li>
            <li>
              「必ず」「絶対」「確実に」などの断定表現は使用しません
            </li>
            <li>
              アフィリエイト広告を含む記事には、景品表示法に基づきPR表記を明示します
            </li>
          </ul>
        </section>

        {/* 出典と情報の正確性 */}
        <section>
          <h2 className="text-xl font-semibold">出典と情報の正確性</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            当サイトの記事では、厚生労働省・国税庁・内閣府・地域包括支援センターなどの公的機関が公表する一次情報を出典としています。各記事の末尾に出典一覧を掲載しています。
          </p>
          <p className="mt-3 leading-relaxed text-foreground/80">
            制度は改正されることがあります。最新の情報については、各公的機関の公式サイトをご確認ください。記事の内容に誤りを見つけた場合は、
            <Link
              href="/contact"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              お問い合わせページ
            </Link>
            よりご連絡ください。
          </p>
        </section>
      </div>
    </div>
  )
}
