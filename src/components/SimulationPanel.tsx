import type { ReactElement } from 'react'
import SkillMarkdown from './SkillMarkdown'
import TerminalPanel from './TerminalPanel'
import { simulationSourceUrl } from '../lib/repo'
import type { Simulation, TurnRole } from '../lib/simulation'
import styles from './simulation-panel.module.css'

interface SimulationPanelProps {
  skillName: string
  simulation: Simulation
}

/**
 * How each role is announced. These are real text nodes rather than CSS
 * content, so a screen reader reads "assistant" before the reply instead of
 * an unattributed wall of prose.
 */
const ROLE_LABEL: Record<TurnRole, string> = {
  user: 'user',
  assistant: 'assistant',
  tool: 'tool',
  note: 'note',
}

const ROLE_CLASS: Record<TurnRole, string> = {
  user: styles.user,
  assistant: styles.assistant,
  tool: styles.tool,
  note: styles.note,
}

/**
 * The one renderer for every skill's worked example.
 *
 * There is deliberately no per-skill component and no registry keyed by skill
 * name: the transcript is content, discovered by a glob, and this walks
 * whatever the parser produced. Adding a worked example to a skill must never
 * mean writing React.
 */
export default function SimulationPanel({
  skillName,
  simulation,
}: SimulationPanelProps): ReactElement {
  return (
    <TerminalPanel
      as="section"
      path={`skills/${skillName}/SIMULATION.md`}
      className={styles.panel}
      action={
        <a className={styles.source} href={simulationSourceUrl(skillName)}>
          source
        </a>
      }
    >
      <ol className={styles.turns}>
        {simulation.turns.map((turn, index) => {
          const isNote = turn.role === 'note'
          // Notes are editorial: they explain why the assistant did that.
          // Marking them up as an aside keeps them out of the reply itself.
          const Body = isNote ? 'aside' : 'div'

          return (
            <li key={index} className={`${styles.turn} ${ROLE_CLASS[turn.role]}`}>
              <p className={styles.speaker}>
                <span className={styles.marker} aria-hidden="true">
                  {isNote ? '←' : '▌'}
                </span>
                <span className={styles.role}>{ROLE_LABEL[turn.role]}</span>
                {turn.label ? <span className={styles.label}>{turn.label}</span> : null}
              </p>
              <Body className={styles.body}>
                <SkillMarkdown content={turn.body} className={styles.prose} />
              </Body>
            </li>
          )
        })}
      </ol>

      {/* Every static transcript compresses something. Saying what, in the
          panel rather than in frontmatter, is what stops the example being
          read as a promise. */}
      <p className={styles.caveat}>
        <span className={styles.caveatLabel} aria-hidden="true">
          ⚠
        </span>
        <span className={styles.srOnly}>Caveat: </span>
        {simulation.caveat}
      </p>
    </TerminalPanel>
  )
}
