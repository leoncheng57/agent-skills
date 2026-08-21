import { DEFAULT_BRANCH, REPO_SLUG, REPO_URL, TARBALL_ROOT } from './repo'

export interface InstallMethod {
  id: string
  label: string
  /** One line explaining the trade-off, rendered above the command. */
  note: string
  command: string
}

/**
 * The four verified ways to install a single skill. Every command targets
 * `~/.agents/skills/<skill>` because that is the highest-reach location — see
 * {@link INSTALL_SCOPES}.
 */
export function installMethods(skill: string): InstallMethod[] {
  return [
    {
      id: 'skills-cli',
      label: 'skills CLI',
      note: 'Recommended. Resolves the repo\u2019s skills/ directory for you; -g installs globally.',
      command: `npx skills add ${REPO_SLUG} --skill ${skill} -g`,
    },
    {
      id: 'degit',
      label: 'degit',
      note: 'Copies one directory with no git history attached.',
      command: `npx degit ${REPO_SLUG}/skills/${skill} ~/.agents/skills/${skill}`,
    },
    {
      id: 'curl',
      label: 'curl + tar',
      note: 'No Node required. Extracts a single directory out of the tarball.',
      command: [
        'mkdir -p ~/.agents/skills && \\',
        `curl -sL https://codeload.github.com/${REPO_SLUG}/tar.gz/refs/heads/${DEFAULT_BRANCH} \\`,
        '  | tar -xz -C ~/.agents/skills --strip-components=2 \\',
        `      ${TARBALL_ROOT}/skills/${skill}`,
      ].join('\n'),
    },
    {
      id: 'sparse-symlink',
      label: 'sparse clone + symlink',
      note: 'Stays updatable: git pull in ~/src/agent-skills refreshes the live skill.',
      command: [
        `git clone --filter=blob:none --sparse ${REPO_URL}.git ~/src/agent-skills`,
        `cd ~/src/agent-skills && git sparse-checkout set skills/${skill}`,
        `ln -s ~/src/agent-skills/skills/${skill} ~/.agents/skills/${skill}`,
      ].join('\n'),
    },
  ]
}

export interface InstallScope {
  path: string
  scope: 'Global' | 'Project'
  readBy: string
  note: string
}

/** Where a `SKILL.md` directory has to live for each agent family to see it. */
export const INSTALL_SCOPES: InstallScope[] = [
  {
    path: '~/.agents/skills/<skill>/',
    scope: 'Global',
    readBy: 'OpenCode, Cursor, Codex, Copilot, Gemini CLI, Amp, Roo, Zed',
    note: 'Highest reach — install here unless you have a reason not to.',
  },
  {
    path: '~/.claude/skills/<skill>/',
    scope: 'Global',
    readBy: 'Claude Code',
    note: 'The Claude Code variant of the same layout.',
  },
  {
    path: '.opencode/skills/<skill>/',
    scope: 'Project',
    readBy: 'OpenCode',
    note: 'Committed with the repo, so the skill only loads inside that project.',
  },
  {
    path: '.claude/skills/<skill>/',
    scope: 'Project',
    readBy: 'Claude Code',
    note: 'Project-scoped equivalent for Claude Code.',
  },
]
