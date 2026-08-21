import type { ReactElement } from 'react'
import CopyButton from './CopyButton'
import { INSTALL_SCOPES, installMethods } from '../lib/install'
import styles from './install-block.module.css'

interface InstallBlockProps {
  skill: string
  /** Heading level so the block fits both the catalog and a detail page. */
  headingId?: string
}

export default function InstallBlock({ skill, headingId = 'install' }: InstallBlockProps): ReactElement {
  return (
    <section className={styles.block} aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.heading}>
        Install <code>{skill}</code>
      </h2>

      <p className={styles.lede}>
        Pick one. Each drops the skill into <code>~/.agents/skills/{skill}/</code> — the highest-reach
        location, read by OpenCode, Cursor, Codex, Copilot, Gemini CLI, Amp, Roo and Zed. Claude Code reads
        the same layout under <code>~/.claude/skills/</code>, so swap the destination if that is your agent.
      </p>

      <ol className={styles.methods}>
        {installMethods(skill).map((method) => (
          <li key={method.id} className={styles.method}>
            <div className={styles.methodHead}>
              <h3 className={styles.methodLabel}>{method.label}</h3>
              <CopyButton value={method.command} label={`${method.label} command`} />
            </div>
            <p className={styles.methodNote}>{method.note}</p>
            <pre className={styles.command}>
              <code>{method.command}</code>
            </pre>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** The where-do-skills-live reference, rendered once on the catalog page. */
export function InstallScopeTable(): ReactElement {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>Where a skill directory has to live</caption>
        <thead>
          <tr>
            <th scope="col">Path</th>
            <th scope="col">Scope</th>
            <th scope="col">Read by</th>
          </tr>
        </thead>
        <tbody>
          {INSTALL_SCOPES.map((scope) => (
            <tr key={scope.path}>
              <th scope="row">
                <code>{scope.path}</code>
              </th>
              <td>{scope.scope}</td>
              <td>
                {scope.readBy}
                <span className={styles.scopeNote}>{scope.note}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
