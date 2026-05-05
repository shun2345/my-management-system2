import type { PostSource } from '@/content-types/post'
import { ExternalLink } from 'lucide-react'

type SourceListProps = {
  sources: PostSource[]
}

export function SourceList({ sources }: SourceListProps) {
  if (sources.length === 0) return null

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="font-heading text-lg font-semibold">出典・参考資料</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-muted-foreground">
        {sources.map((source, i) => (
          <li key={i}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-navy dark:text-primary underline underline-offset-2 transition-colors hover:opacity-80"
            >
              {source.title}
              <ExternalLink
                className="h-3 w-3 shrink-0"
                aria-hidden="true"
              />
            </a>
            <span className="ml-2 text-xs text-muted-foreground">
              ({source.accessedAt} アクセス)
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
