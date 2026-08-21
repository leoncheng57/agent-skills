import { useEffect, type ReactElement } from 'react'
import { Link, useParams } from 'react-router-dom'
import CopyButton from '../components/CopyButton'
import InstallBlock from '../components/InstallBlock'
import SkillMarkdown from '../components/SkillMarkdown'
import TerminalPanel from '../components/TerminalPanel'
import { skillSourceUrl } from '../lib/repo'
import { findSkill } from '../lib/skillsSource'
import styles from './skill.module.css'

const SITE_TITLE = 'agent-skills'

export default function SkillRoute(): ReactElement {
  const { name = '' } = useParams()
  const skill = findSkill(name)

  useEffect(() => {
    document.title = skill ? `${skill.title} — ${SITE_TITLE}` : `Not found — ${SITE_TITLE}`
    return () => {
      document.title = SITE_TITLE
    }
  }, [skill])

  if (!skill) {
    return (
      <div className={styles.page}>
        <p className={styles.back}>
          <Link to="/">&larr; all skills</Link>
        </p>
        <h1 className={styles.title}>No skill called “{name}”</h1>
        <p className={styles.notFound}>
          It may have been renamed. The catalog lists everything currently in the repository.
        </p>
      </div>
    )
  }

  return (
    <article className={styles.page}>
      <p className={styles.back}>
        <Link to="/">&larr; all skills</Link>
      </p>

      <header className={styles.header}>
        <h1 className={styles.title}>{skill.title}</h1>

        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>name</dt>
            <dd>
              <code>{skill.name}</code>
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>read</dt>
            <dd>{skill.readingTimeMinutes} min</dd>
          </div>
          {skill.license ? (
            <div className={styles.fact}>
              <dt>license</dt>
              <dd>{skill.license}</dd>
            </div>
          ) : null}
          {skill.compatibility ? (
            <div className={styles.fact}>
              <dt>compatibility</dt>
              <dd>{skill.compatibility}</dd>
            </div>
          ) : null}
          <div className={styles.fact}>
            <dt>source</dt>
            <dd>
              <a href={skillSourceUrl(skill.name)}>SKILL.md</a>
            </dd>
          </div>
        </dl>

        {skill.tags.length > 0 ? (
          <ul className={styles.tagRow} aria-label="Tags">
            {skill.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                #{tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {skill.description ? (
        <TerminalPanel
          path="frontmatter: description"
          className={styles.descriptionPanel}
          action={<CopyButton value={skill.description} label="description" />}
        >
          {/* This is the only text always in the agent's context — it is what
              decides whether the skill gets loaded, so it is shown in full
              rather than summarised. */}
          <p className={styles.description}>{skill.description}</p>
        </TerminalPanel>
      ) : null}

      <InstallBlock skill={skill.name} />

      <section className={styles.bodySection} aria-labelledby="instructions">
        <h2 id="instructions" className={styles.bodyHeading}>
          Instructions
        </h2>
        <SkillMarkdown content={skill.body} />
      </section>
    </article>
  )
}
