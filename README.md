# agent-skills

Portable [agent skills](https://opencode.ai/docs) — reusable workflow instructions
that a coding agent loads on demand when a task matches the skill's description.

Written for [OpenCode](https://opencode.ai), and compatible with any agent that
reads `SKILL.md` files with YAML frontmatter (Claude Code included).

## Skills

| Skill | What it does |
|---|---|
| [`parallel-research-handoff`](skills/parallel-research-handoff/SKILL.md) | Research several independent feature ideas in parallel with read-only subagents, compile the findings into self-contained handoff prompts, and fire those prompts off as parallel agent sessions in fresh git worktrees. |

## Install

Clone anywhere, then symlink the skills you want into your agent's skills
directory:

```bash
git clone https://github.com/leoncheng57/agent-skills.git ~/Documents/Projects/agent-skills

# OpenCode
ln -s ~/Documents/Projects/agent-skills/skills/parallel-research-handoff ~/.agents/skills/parallel-research-handoff

# Claude Code
ln -s ~/Documents/Projects/agent-skills/skills/parallel-research-handoff ~/.claude/skills/parallel-research-handoff
```

Symlinks mean `git pull` updates the live skill.

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

## License

MIT
