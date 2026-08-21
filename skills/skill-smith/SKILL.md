---
name: skill-smith
description: Author, review, and install agent skills. Use when the user says "write a skill", "create a skill", "turn this into a skill", "make this reusable", "review my SKILL.md", "install this skill", asks where a piece of guidance belongs (AGENTS.md vs hook vs skill), or wants skill frontmatter made portable across OpenCode and Claude Code.
---

# Skill-smith

Most requests to "write a skill" should not produce a skill. Work the gate and
the triage before writing a single line of frontmatter.

Reference for the craft of the prose itself:
[`references/writing-for-agents.md`](references/writing-for-agents.md) and
[`references/writing-for-agents-mechanics.md`](references/writing-for-agents-mechanics.md).
Read them during the self-review pass at the end.

---

## 1. The gate: does this change behaviour?

**The test: does this change the agent's behaviour versus its default?**

A skill's `description` sits in the agent's context on *every single turn*, in
every session, forever. That is the price. An instruction a capable model
already follows unprompted buys nothing and charges rent.

Apply the test sentence by sentence, not document by document. Candidates that
fail:

| Proposed skill | Why it is a no-op |
|---|---|
| "Write clean, readable code" | The default. No behaviour changes. |
| "Use TypeScript strict mode" | A fact about one repo → `AGENTS.md`, not a skill. |
| "Run the tests before committing" | Either the default, or a hook. |
| "Be thorough when reviewing" | Adjective with no procedure attached. |
| "Explain your reasoning" | Models already do this; it is a style preference. |

Candidates that pass, and why:

| Proposed skill | Why it changes behaviour |
|---|---|
| "Build a red-capable feedback loop *before* forming a hypothesis" | Default is to read code and theorise immediately. |
| "Ask the whole frontier in one round, not one question at a time" | Default is conversational one-at-a-time. |
| "Cite `file:line` for every objection or bucket it as speculative" | Default is unsourced prose criticism. |

The test is **model-relative, not reader-relative**. Two people disagreeing over
whether something is a no-op are disagreeing about the model's default, and the
way to settle it is to run the document without the skill and look at what
happens — not to argue.

If the request fails the gate, say so plainly and propose the right home
instead. Do not write the skill anyway to be agreeable.

---

## 2. Triage: three homes

Most requests are category errors — the content is real and worth capturing,
but a skill is the wrong container.

**Always-true rule → `AGENTS.md`.**
A constraint that holds on every turn in this repo (or globally, in
`~/.config/opencode/AGENTS.md`). "Never add runtime dependencies." "Ports 8010
and 3210 are fixed, only one worktree may run the stack." No trigger condition
exists, so there is nothing for a `description` to match on. Keep these lines
brutally short: the global file is loaded on every turn in *every* repo.

**Deterministic behaviour → plugin, hook, or CI.**
If the correct action is mechanical and admits no judgement — run the formatter,
block a dangerous `git` invocation, reject a commit that fails typecheck — then
a skill is the wrong mechanism because a model may or may not comply. Code
always complies. Route it to a git hook, a CI job, or an OpenCode plugin.

**Multi-step procedure you'd otherwise re-paste → skill.**
This is the only case that earns a skill. The signal is concrete: you have
pasted roughly this same set of instructions into a chat more than once, it has
ordered steps or a body of rules to apply exhaustively, and there is a
recognisable trigger condition you can name in a `description`.

Ask the user which of the three they want if it is genuinely ambiguous. Do not
guess and do not silently write all three.

---

## 3. Frontmatter: portable keys only

OpenCode recognises exactly five frontmatter keys and **silently ignores**
everything else — no warning, no error, the key is simply dropped:

```
name  description  license  compatibility  metadata
```

The portable [Agent Skills spec](https://agentskills.io/specification) adds
`allowed-tools`.

**House style: emit `name` and `description` only.** Reach past those two
exactly when you have a concrete reason and can state it.

```yaml
---
name: my-skill
description: <what it does> + <the literal phrases that should trigger it>
---
```

### Keys to reject, and why

| Key | Verdict |
|---|---|
| `argument-hint` | Claude-Code-only. Ignored by OpenCode. Hard-fails claude.ai packaging. |
| `disable-model-invocation` | Claude-Code-only. In OpenCode the skill stays model-invoked regardless, so a "user-invoked" skill designed around this key behaves the *opposite* of intended. |
| `user-invocable` | Claude-Code-only. Ignored. |
| `allowed-tools` | In the portable spec but ignored by OpenCode; it reads as a security control that is not actually enforced. Omit unless targeting a runtime that honours it. |
| `context: fork` | Claude-Code-only. Ignored. |
| `hooks` | Claude-Code-only, and a hook is a *different home* — see triage above. |

The failure mode with all of these is silence. The skill loads, appears to work,
and the key you were relying on does nothing.

### `name`

- 1–64 characters, matching `^[a-z0-9]+(-[a-z0-9]+)*$`.
- **Must exactly equal the directory name.** `skills/red-team-this/SKILL.md`
  must declare `name: red-team-this`. A mismatch is the single most common
  validation failure when vendoring a skill from a nested upstream layout.

---

## 4. Writing the `description`

1–1024 characters, third person, written **for retrieval**. This is the only
part of the skill that is always in context; it is what decides whether the body
ever loads.

Structure it as two halves:

1. **What it does** — front-load the leading keyword. The first few words do the
   triggering work.
2. **When to use it** — the literal phrases a user would actually type, plus the
   distinct situations that should fire it.

```
description: Argue against a plan, design, or diff the agent just produced …
             Use when the user says "red team this", "argue against it",
             "poke holes in this diff", or wants an adversarial review of work
             the agent itself authored.
```

Rules:

- **One trigger per branch.** Synonyms that rename a single situation are one
  branch written twice. `"grill me"` / `"grill-me"` is a spelling variant worth
  keeping; `"grill me"` / `"interrogate me"` / `"question me hard"` is one
  branch inflated to three.
- **Cut identity the body already carries.** The description says when to load,
  not what the body says.
- Third person and declarative. `Review the changes since…`, not `I will review…`.
- Do not append a `Do NOT use for:` clause unless a *sibling skill in the same
  repo* would otherwise steal the trigger. Negation drags the excluded concept
  into context and makes it more available, not less.

---

## 5. The body

- **Imperative and specific.** Concrete commands, real file paths, failure-mode
  tables. "Be careful with ports" is worthless; `lsof -nP -iTCP:8010 -sTCP:LISTEN`
  is a skill.
- **Well under 500 lines.** Past that, attention thins across the excess.
- **Progressive disclosure.** Push reference material that only *some* runs need
  into a sibling file, and point at it explicitly with a line that says when to
  read it:

  ```markdown
  See [<sibling>.md](<sibling>.md) for <the material>, when <the condition>.
  ```

  Inline what every branch needs; disclose what only some branches reach. The
  `tdd` skill in this repo is the worked example: the loop's rules stay in
  `SKILL.md`, while `tests.md`, `mocking.md`, and `vocabulary.md` sit behind
  one-line pointers that name when to read them.
- **Prompt the positive.** State the target behaviour rather than banning its
  opposite. A prohibition earns its place only as a hard guardrail you cannot
  phrase positively.
- **Single source of truth.** One meaning, one place. Do not restate in the body
  what the `description` already says.

---

## 6. Scaffold and install

```bash
REPO=~/Documents/Projects/agent-skills
NAME=<skill-name>

mkdir -p "$REPO/skills/$NAME"
$EDITOR "$REPO/skills/$NAME/SKILL.md"
```

Then symlink it into the agent's skills directory. **Use a relative symlink** —
an absolute one bakes in `/Users/<you>` and breaks the moment the repo is cloned
on another machine or under a different home directory:

```bash
cd ~/.agents/skills
ln -s ../../Documents/Projects/agent-skills/skills/$NAME $NAME

# Claude Code, if also in use:
cd ~/.claude/skills
ln -s ../../Documents/Projects/agent-skills/skills/$NAME $NAME
```

`../../` from `~/.agents/skills` lands on `~`, so the target resolves relative
to the home directory rather than to an absolute path.

Verify the link resolves and the body is readable through it:

```bash
readlink ~/.agents/skills/$NAME
head -3 ~/.agents/skills/$NAME/SKILL.md
```

Then add the row to the `## Skills` table in the repo `README.md`, keeping the
table alphabetical.

**Tell the user to restart OpenCode.** Skills are read at startup and are not
hot-reloaded; a newly symlinked skill is invisible to the running session,
including the one that just wrote it. Say this explicitly — the most common
"my skill doesn't work" report is a session that was never restarted.

Project-scoped alternative, when a skill is only meaningful inside one repo:
`.opencode/skills/<name>/SKILL.md`, committed with that repo, no symlink needed.

---

## 7. Self-review pass

Before declaring the skill done, read
[`references/writing-for-agents.md`](references/writing-for-agents.md) and walk
the new skill against it. Check, in order:

- [ ] **No-ops hunted sentence by sentence.** Every sentence beats the model's
      default, or it is deleted whole (not trimmed).
- [ ] **Frontmatter is `name` + `description` only**, `name` equals the directory
      name, `description` ≤ 1024 characters.
- [ ] **Description carries distinct trigger branches**, no synonym padding, keyword front-loaded.
- [ ] **Duplication removed** — each meaning has one home.
- [ ] **Environment not cached.** Do not restate what `package.json`, `--help`,
      or the directory layout already says; those go stale. Cache only what the
      agent cannot discover by looking: unwritten conventions, the reason behind
      a choice, the gotcha no config confesses.
- [ ] **Completion criteria are checkable.** "Understanding reached" is fuzzy;
      "every remaining element is load-bearing — removing any one makes the loop
      go green" is checkable.
- [ ] **Body well under 500 lines**, reference disclosed to siblings with explicit pointers.

Then validate mechanically:

```bash
npx skills-ref validate ./skills/<name>
```

If `skills-ref` is unavailable, hand-check the four hard constraints (frontmatter
parses as YAML, `name` matches the directory, `name` matches
`^[a-z0-9]+(-[a-z0-9]+)*$`, `description` is 1–1024 chars) and **say in your
report that the check was manual**.

---

## Failure modes

| Symptom | Cause | Fix |
|---|---|---|
| Skill never fires | `description` describes the body instead of the trigger | Rewrite as what-it-does + literal trigger phrases |
| Skill fires on everything | Description too broad, or padded with synonyms | One trigger per distinct branch |
| Frontmatter key silently does nothing | Claude-Code-only key in an OpenCode skill | Drop to `name` + `description` |
| Validator: name mismatch | Vendored from a nested path, `name` left as upstream | Set `name` to the new flat directory name |
| Skill loads but agent ignores half of it | Body over-long, or steps buried under reference | Disclose reference to a sibling file |
| New skill invisible after install | OpenCode not restarted | Restart; skills load at startup only |
| Symlink dead on another machine | Absolute symlink target | Relink with a relative path |
| Skill duplicates an `AGENTS.md` rule | Triage skipped | Delete one; always-true rules live in `AGENTS.md` |
