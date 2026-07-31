import fs from 'node:fs'
import path from 'node:path'
import fm from 'front-matter'

export type NewsItem = {
  title: string
  date: string
  displayDate: string
  category: string
  summary: string
  url: string
  externalLink?: string
}

export default {
  watch: ['pages/news-items/*.md'],
  load(watchedFiles: string[]): NewsItem[] {
    return watchedFiles
      .map((file) => {
        const source = fs.readFileSync(file, 'utf-8')
        const parsed = fm(source) as { attributes: Record<string, string> }
        const frontmatter = parsed.attributes
        const slug = path.basename(file, '.md')

        return {
          title: frontmatter.title || '',
          date: frontmatter.date || '',
          displayDate: frontmatter.displayDate || frontmatter.date || '',
          category: frontmatter.category || 'News',
          summary: frontmatter.summary || '',
          externalLink: frontmatter.externalLink || '',
          url: `/pages/news-items/${slug}`,
        }
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  },
}
