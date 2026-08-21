# Credits

Some skills in this repository are vendored from other open-source projects.
Original authors retain copyright; their licence terms are reproduced below.

---

## mattpocock/skills

- **Upstream:** <https://github.com/mattpocock/skills>
- **Licence:** MIT (verified via the GitHub API — `license.spdx_id == "MIT"`)
- **Vendored from commit:** `0ab1b63a410a03d3627979a109c8695de27af954` (branch `main`)
- **Copyright:** © 2026 Matt Pocock

### What was vendored

| This repo | Upstream path @ `0ab1b63` | Changes made |
|---|---|---|
| [`skills/tdd/SKILL.md`](skills/tdd/SKILL.md) | `skills/engineering/tdd/SKILL.md` | Frontmatter normalised to `name` + `description`; trigger phrases added to the description; the delegation to the `codebase-design` skill replaced with a pointer to the inlined `vocabulary.md`. |
| [`skills/tdd/tests.md`](skills/tdd/tests.md) | `skills/engineering/tdd/tests.md` | Verbatim, plus a vendor header comment. |
| [`skills/tdd/mocking.md`](skills/tdd/mocking.md) | `skills/engineering/tdd/mocking.md` | Verbatim, plus a vendor header comment. |
| [`skills/tdd/vocabulary.md`](skills/tdd/vocabulary.md) | `skills/engineering/codebase-design/SKILL.md` (glossary excerpt) | Glossary section excerpted and inlined, because `tdd` delegates to `codebase-design` for this vocabulary and that skill is not vendored here. Closing section rewritten to connect the vocabulary to seam placement in tests. |
| [`skills/diagnosing-bugs/SKILL.md`](skills/diagnosing-bugs/SKILL.md) | `skills/engineering/diagnosing-bugs/SKILL.md` | Description widened with trigger phrases; body verbatim. |
| [`skills/diagnosing-bugs/scripts/hitl-loop.template.sh`](skills/diagnosing-bugs/scripts/hitl-loop.template.sh) | `skills/engineering/diagnosing-bugs/scripts/hitl-loop.template.sh` | Verbatim. |
| [`skills/code-review/SKILL.md`](skills/code-review/SKILL.md) | `skills/engineering/code-review/SKILL.md` | The `/setup-matt-pocock-skills` delegation and the hard dependency on `docs/agents/issue-tracker.md` replaced with self-contained `gh` / `glab` issue-fetching guidance, because that setup skill is not vendored here. Body otherwise verbatim. |
| [`skills/skill-smith/references/writing-for-agents.md`](skills/skill-smith/references/writing-for-agents.md) | `skills/productivity/writing-for-agents/SKILL.md` | Frontmatter stripped — vendored as a **reference document** for `skill-smith`, not as a standalone skill. Internal links repointed at the renamed sibling. |
| [`skills/skill-smith/references/writing-for-agents-mechanics.md`](skills/skill-smith/references/writing-for-agents-mechanics.md) | `skills/productivity/writing-for-agents/SKILL-MECHANICS.md` | Internal links repointed; an OpenCode note added at the top recording that `disable-model-invocation` is ignored by OpenCode, so the invocation choice the section describes does not exist here. |

### Adapted, not vendored

[`skills/grill-me/SKILL.md`](skills/grill-me/SKILL.md) is an original rewrite that
adopts the rounds-and-frontier model from upstream
`skills/productivity/grilling/SKILL.md` @ `0ab1b63`, including its round output
format. It differs deliberately:

- Upstream ships a `grill-me` → `grilling` wrapper pair, where `grill-me` sets
  `disable-model-invocation: true`. OpenCode ignores that key, so the split
  would produce two always-loaded descriptions for one behaviour. This repo
  ships **one** model-invoked skill named `grill-me`.
- A closing step offering to emit the outcome as a handoff document or an ADR is
  added; upstream has no equivalent.

### MIT Licence

```
MIT License

Copyright (c) 2026 Matt Pocock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Updating vendored content

Re-fetch from the pinned commit, or bump to a newer one and re-apply the changes
listed above:

```bash
SHA=<new-commit-sha>
curl -sSL "https://raw.githubusercontent.com/mattpocock/skills/$SHA/skills/engineering/tdd/SKILL.md"
```

Every vendored file carries an HTML comment naming its upstream path and commit,
so a diff against upstream is always reproducible. Update the SHAs in this file
when you re-vendor.
