export interface ExternalSkillSource {
  name: string
  url: string
  license: string
  /** What the skills in that repo actually do. */
  blurb: string
  /** Named skills worth calling out. */
  highlights: string[]
}

/**
 * Third-party skill collections that are linked, never vendored.
 *
 * cmux is GPL-3.0-or-later; copying its skills into this MIT repository would
 * mean relicensing them, so they stay upstream where their own licence applies.
 * The same rule holds for anything else added here: link it, do not fork it.
 */
export const EXTERNAL_SKILL_SOURCES: ExternalSkillSource[] = [
  {
    name: 'manaflow-ai/cmux',
    url: 'https://github.com/manaflow-ai/cmux',
    license: 'GPL-3.0-or-later',
    blurb:
      'Skills that ship with the cmux terminal multiplexer, for driving its own windows, panes and browser surfaces.',
    highlights: [
      'cmux — window, pane and focus control',
      'cmux-browser — browser automation against a cmux surface',
    ],
  },
  {
    name: 'microsoft/azure-skills',
    url: 'https://github.com/microsoft/azure-skills',
    license: 'See repository',
    blurb: 'Microsoft\u2019s own skills for Azure and Foundry workflows: deployment, quota, evaluation.',
    highlights: ['Azure deployment and provisioning', 'Foundry model and agent workflows'],
  },
]
