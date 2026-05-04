import type { TocEntry } from '@/lib/toc'

type TableOfContentsProps = {
  entries: TocEntry[]
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  if (entries.length === 0) return null

  const nav = (
    <nav aria-label="目次">
      <ul className="space-y-1.5 text-sm">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${entry.id}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <>
      {/* モバイル: 折りたたみ */}
      <details className="mb-8 rounded-lg border bg-card p-4 lg:hidden">
        <summary className="cursor-pointer font-semibold">目次</summary>
        <div className="mt-3">{nav}</div>
      </details>

      {/* デスクトップ: sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="mb-3 text-sm font-semibold">目次</p>
          {nav}
        </div>
      </aside>
    </>
  )
}
