import GithubSlugger from 'github-slugger'

export type TocEntry = {
  id: string
  text: string
  level: 2 | 3
}

export function extractToc(rawContent: string): TocEntry[] {
  const slugger = new GithubSlugger()
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const entries: TocEntry[] = []

  // frontmatter を除去
  const content = rawContent.replace(/^---[\s\S]*?---\n/, '')

  // コードブロック内の行を除外
  const lines = content.split('\n')
  const nonCodeLines: string[] = []
  let inCodeBlock = false

  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (!inCodeBlock) {
      nonCodeLines.push(line)
    }
  }

  const filtered = nonCodeLines.join('\n')

  let match: RegExpExecArray | null
  while ((match = headingRegex.exec(filtered)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    const id = slugger.slug(text)
    entries.push({ id, text, level })
  }

  return entries
}
