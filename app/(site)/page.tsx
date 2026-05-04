import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
}

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex flex-col gap-8">
        <section className="text-center">
          <h1>介護とお金の制度ガイド</h1>
          <p className="mt-4 text-muted-foreground">
            親の介護・相続・終活・家計に関する公的制度をわかりやすく解説
          </p>
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h2>カテゴリ</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>介護</Badge>
            <Badge variant="secondary">相続</Badge>
            <Badge variant="outline">終活</Badge>
            <Badge variant="secondary">お金</Badge>
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h2>新着記事</h2>
          <Card>
            <CardHeader>
              <CardTitle>介護保険制度の基本</CardTitle>
              <CardDescription>
                40歳以上の方が加入する介護保険の仕組みを解説
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                介護保険制度は、介護が必要になった方を社会全体で支える仕組みです。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>相続税の基礎控除</CardTitle>
              <CardDescription>
                相続税がかかるかどうかの目安となる基礎控除額について
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                基礎控除額は「3,000万円 + 600万円 x
                法定相続人の数」で計算されます。
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h2>ボタンスタイル</h2>
          <div className="flex flex-wrap gap-3">
            <Button>詳しく見る</Button>
            <Button variant="secondary">カテゴリ一覧</Button>
            <Button variant="outline">お問い合わせ</Button>
            <Button variant="ghost">もっと読む</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
