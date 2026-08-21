import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import TerminalPanel from './TerminalPanel'
import styles from './skill-card.module.css'
import type { Skill } from '../lib/skills'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps): ReactElement {
  const skillPath = `/s/${skill.name}`

  return (
    <TerminalPanel as="article" path={`skills/${skill.name}/SKILL.md`}>
      <h2 className={styles.title}>
        <span className={styles.prompt} aria-hidden="true">
          $
        </span>
        <Link to={skillPath}>{skill.title}</Link>
      </h2>

      {/* The card shows the first sentence only: the full frontmatter
          description is written for an agent's retrieval step, not for a
          human skimming a list. */}
      <p className={styles.summary}>{skill.summary || 'No description in the frontmatter.'}</p>

      <p className={styles.meta}>
        <span>{skill.name}</span>
        <span className={styles.separator} aria-hidden="true">
          ·
        </span>
        <span>{skill.readingTimeMinutes} min read</span>
        {skill.license ? (
          <>
            <span className={styles.separator} aria-hidden="true">
              ·
            </span>
            <span>{skill.license}</span>
          </>
        ) : null}
      </p>

      {skill.tags.length > 0 ? (
        <ul className={styles.tagRow} aria-label={`Tags for ${skill.title}`}>
          {skill.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              #{tag}
            </li>
          ))}
        </ul>
      ) : null}

      <p className={styles.cta}>
        <Link to={skillPath}>read skill &rarr;</Link>
      </p>
    </TerminalPanel>
  )
}
