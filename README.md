# agent-skills

Portable [agent skills](https://opencode.ai/docs) — reusable workflow instructions
that a coding agent loads on demand when a task matches the skill's description.

Written for [OpenCode](https://opencode.ai), and compatible with any agent that
reads `SKILL.md` files with YAML frontmatter (Claude Code included).

Website: <https://leoncheng.dev/agent-skills/>

## Skills

| Skill | What it does |
|---|---|
| [`grill-me`](skills/grill-me/SKILL.md) | Interview the user in rounds about a plan or design, asking the whole frontier of the decision tree at once, until no branch is left silently assumed. |
| [`parallel-research-handoff`](skills/parallel-research-handoff/SKILL.md) | Research several independent feature ideas in parallel with read-only subagents, compile the findings into self-contained handoff prompts, and fire those prompts off as parallel agent sessions in fresh git worktrees. |
| [`red-team-this`](skills/red-team-this/SKILL.md) | Argue against a plan, design, or diff the agent just produced — six fixed objection classes, every objection cited to `file:line`, ranked by expected cost, closing on a verdict. |
| [`worktree-up`](skills/worktree-up/SKILL.md) | Set up a git worktree for new work: sibling `<repo>.worktrees/<topic>`, branch off origin's default, install deps, and check fixed-port collisions before starting a stack. |

## Install

Clone anywhere, then symlink the skills you want into your agent's skills
directory:

```bash
git clone https://github.com/leoncheng57/agent-skills.git ~/Documents/Projects/agent-skills

NAME=parallel-research-handoff

# OpenCode
cd ~/.agents/skills && ln -s ../../Documents/Projects/agent-skills/skills/$NAME $NAME

# Claude Code
cd ~/.claude/skills && ln -s ../../Documents/Projects/agent-skills/skills/$NAME $NAME
```

Symlinks mean `git pull` updates the live skill. Use **relative** targets, as
above — `../../` from `~/.agents/skills` resolves to your home directory, so the
link survives a different username or machine. An absolute target bakes in
`/Users/<you>` and breaks on the next machine.

**Restart OpenCode after installing.** Skills are read at startup and are not
hot-reloaded, so a newly symlinked skill is invisible to the running session.

Project-scoped alternative: drop a skill under `.opencode/skills/<name>/SKILL.md`
inside a repo so it only loads there.

## Format

```
skills/<name>/SKILL.md
```

```markdown
---
name: <name>
description: <what it does> + <when to use it, including trigger phrases>
---

<the instructions>
```

The `description` is the only part always in the agent's context — it is what
decides whether the skill gets loaded. Write it for retrieval: say what the
skill does *and* name the situations and phrases that should trigger it.

Keep the body imperative and specific. Concrete commands, real file paths, and a
failure-mode table beat general advice.

## Credits

One skill here is adapted from another MIT-licensed project. See
[`CREDITS.md`](CREDITS.md) for which upstream commit it derives from, what was
changed, and the original licence text.

## License

MIT
