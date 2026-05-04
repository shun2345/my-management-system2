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

  let match: RegExpExecArray | null
  while ((match = headingRegex.exec(rawContent)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    const id = slugger.slug(text)
    entries.push({ id, text, level })
  }

  return entries
}
