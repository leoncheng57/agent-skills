import type { ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import styles from './skill-markdown.module.css'

interface SkillMarkdownProps {
  content: string
}

/**
 * Same rendering stack as leoncheng.dev: remark-gfm for tables and task lists,
 * rehype-raw because SKILL.md bodies use raw <details> blocks, rehype-slug so
 * headings are linkable.
 */
export default function SkillMarkdown({ content }: SkillMarkdownProps): ReactElement {
  return (
    <div className={styles.body}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
