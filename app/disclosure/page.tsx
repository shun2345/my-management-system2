import type { Metadata } from 'next'
import Link from 'next/link'
import { generateSeoMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = generateSeoMetadata({
  title: '広告表記',
  description:
    '当サイトの広告掲載ポリシーおよびアフィリエイト広告に関する表記について説明しています',
  path: '/disclosure',
})

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: '広告表記' },
        ]}
      />

      <h1 className="mt-4 font-heading text-2xl font-semibold">広告についての表記</h1>

      <div className="mt-8 space-y-10">
        {/* アフィリエイト広告について */}
        <section>
          <h2 className="font-heading text-xl font-semibold">アフィリエイト広告について</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            {SITE_NAME}
            （以下「当サイト」）は、一部の記事においてアフィリエイト広告（成果報酬型広告）を掲載しています。
          </p>
          <p className="mt-3 leading-relaxed text-foreground/80">
            アフィリエイト広告とは、当サイト内のリンクを経由して商品やサービスにお申し込みいただいた場合に、広告主から当サイト運営者に報酬が支払われる仕組みです。読者の方に追加の費用が発生することはありません。
          </p>
        </section>

        {/* 景品表示法に基づく表記 */}
        <section>
          <h2 className="font-heading text-xl font-semibold">
            景品表示法に基づく表記
          </h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            当サイトは、2023年10月施行の景品表示法に基づくステルスマーケティング規制に対応しています。広告主から報酬を受け取る可能性のあるリンクを含む記事には、読者の方が広告であることを明確に認識できるよう表記を行っています。
          </p>
        </section>

        {/* 広告の表示方法 */}
        <section>
          <h2 className="font-heading text-xl font-semibold">広告の表示方法</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            アフィリエイト広告を含む記事には、以下の方法で広告であることを明示しています。
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-foreground/80">
            <li>
              記事冒頭に「PR」バッジを表示します
            </li>
            <li>
              広告リンクを含むカード型のコンポーネントには「PR」ラベルを付記します
            </li>
            <li>
              動画コンテンツの場合は、冒頭テロップおよび概要欄に広告である旨を記載します
            </li>
          </ul>
        </section>

        {/* コンテンツの独立性 */}
        <section>
          <h2 className="font-heading text-xl font-semibold">コンテンツの独立性</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            広告の有無にかかわらず、当サイトの記事は公的資料に基づいた客観的な情報提供を目的としています。広告収入が記事の内容や評価に影響を与えることはありません。
          </p>
          <p className="mt-3 leading-relaxed text-foreground/80">
            サービスの比較記事においては、公的機関の資料や各サービスが公表している情報をもとに客観的な情報を整理しており、特定のサービスへの誘導を目的とした記述は行っていません。
          </p>
        </section>

        {/* 免責事項 */}
        <section>
          <h2 className="font-heading text-xl font-semibold">免責事項</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            当サイトの記事は情報提供を目的としており、個別の状況に応じた金融・税務・法律上の助言を行うものではありません。具体的なご判断が必要な場合は、各分野の専門家にご相談ください。
          </p>
          <p className="mt-3 leading-relaxed text-foreground/80">
            掲載している情報の正確性には細心の注意を払っていますが、制度の改正等により内容が変更される場合があります。最新の情報は各公的機関の公式サイトをご確認ください。
          </p>
          <p className="mt-3 leading-relaxed text-foreground/80">
            広告表記に関するご質問は、
            <Link
              href="/contact"
              className="text-brand-navy dark:text-primary underline underline-offset-4 hover:opacity-80"
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
