import { describe, expect, it } from 'vitest'
import { INSTALL_SCOPES, installMethods } from './install'
import { DEFAULT_BRANCH, REPO_NAME, TARBALL_ROOT } from './repo'

describe('installMethods', () => {
  const methods = installMethods('cmux-browser')
  const commandFor = (id: string): string => methods.find((method) => method.id === id)!.command

  it('offers the four documented install paths with unique ids', () => {
    expect(methods.map((method) => method.id)).toEqual(['skills-cli', 'degit', 'curl', 'sparse-symlink'])
  })

  it('renders the skills CLI command', () => {
    expect(commandFor('skills-cli')).toBe('npx skills add leoncheng57/agent-skills --skill cmux-browser -g')
  })

  it('renders the degit command', () => {
    expect(commandFor('degit')).toBe(
      'npx degit leoncheng57/agent-skills/skills/cmux-browser ~/.agents/skills/cmux-browser'
    )
  })

  it('renders the curl command', () => {
    expect(commandFor('curl')).toBe(
      [
        'mkdir -p ~/.agents/skills && \\',
        'curl -sL https://codeload.github.com/leoncheng57/agent-skills/tar.gz/refs/heads/main \\',
        '  | tar -xz -C ~/.agents/skills --strip-components=2 \\',
        '      agent-skills-main/skills/cmux-browser',
      ].join('\n')
    )
  })

  it('renders the sparse clone + symlink command', () => {
    expect(commandFor('sparse-symlink')).toBe(
      [
        'git clone --filter=blob:none --sparse https://github.com/leoncheng57/agent-skills.git ~/src/agent-skills',
        'cd ~/src/agent-skills && git sparse-checkout set skills/cmux-browser',
        'ln -s ~/src/agent-skills/skills/cmux-browser ~/.agents/skills/cmux-browser',
      ].join('\n')
    )
  })

  it('substitutes the skill name everywhere it appears', () => {
    for (const method of installMethods('another-skill')) {
      expect(method.command).toContain('another-skill')
      expect(method.command).not.toContain('cmux-browser')
    }
  })

  // Guards the coupling documented on DEFAULT_BRANCH: the tarball's top-level
  // directory is <repo>-<branch>, so a branch rename must update both halves.
  it('derives the tarball root from the branch instead of hardcoding it', () => {
    expect(TARBALL_ROOT).toBe(`${REPO_NAME}-${DEFAULT_BRANCH}`)
    expect(commandFor('curl')).toContain(`refs/heads/${DEFAULT_BRANCH}`)
    expect(commandFor('curl')).toContain(`${TARBALL_ROOT}/skills/`)
  })
})

describe('INSTALL_SCOPES', () => {
  it('lists ~/.agents/skills first as the highest-reach location', () => {
    expect(INSTALL_SCOPES[0].path).toBe('~/.agents/skills/<skill>/')
    expect(INSTALL_SCOPES[0].readBy).toContain('OpenCode')
  })

  it('covers both global and project scopes', () => {
    expect(new Set(INSTALL_SCOPES.map((scope) => scope.scope))).toEqual(new Set(['Global', 'Project']))
  })
})
