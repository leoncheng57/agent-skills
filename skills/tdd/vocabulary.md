<!-- VENDORED, MIT. Source: mattpocock/skills
     skills/engineering/codebase-design/SKILL.md (glossary section)
     @ 0ab1b63a410a03d3627979a109c8695de27af954
     Inlined here because the upstream `tdd` skill delegates to the
     `codebase-design` skill for this vocabulary, and `codebase-design` is not
     vendored in this repo. Excerpt only. See CREDITS.md at the repo root. -->

# Deep-module vocabulary

The terms `tdd` uses when the shape of the interface under test is itself in
question — how deep the module is, where the seam belongs, what the interface
should expose. Use these terms exactly; do not substitute "component",
"service", "API", or "boundary". Consistent language is the point.

**Module**: anything with an interface and an implementation. Deliberately
scale-agnostic: a function, class, package, or tier-spanning slice. *Avoid*:
unit, component, service.

**Interface**: everything a caller must know to use the module correctly: the
type signature, but also invariants, ordering constraints, error modes, required
configuration, and performance characteristics. *Avoid*: API, signature (too
narrow — they refer only to the type-level surface).

**Implementation**: what's inside a module, its body of code. Distinct from
**Adapter**: a thing can be a small adapter with a large implementation (a
Postgres repo) or a large adapter with a small implementation (an in-memory
fake). Reach for "adapter" when the seam is the topic; "implementation"
otherwise.

**Depth**: leverage at the interface. The amount of behaviour a caller (or test)
can exercise per unit of interface they have to learn. A module is **deep** when
a large amount of behaviour sits behind a small interface, **shallow** when the
interface is nearly as complex as the implementation.

**Seam** *(Michael Feathers)*: a place where you can alter behaviour without
editing in that place; the *location* at which a module's interface lives. Where
to put the seam is its own design decision, distinct from what goes behind it.
*Avoid*: boundary (overloaded with DDD's bounded context).

**Adapter**: a concrete thing that satisfies an interface at a seam. Describes
*role* (what slot it fills), not substance (what's inside).

**Leverage**: what callers get from depth. More capability per unit of interface
they learn. One implementation pays back across N call sites and M tests.

**Locality**: what maintainers get from depth. Change, bugs, knowledge, and
verification concentrate in one place rather than spreading across callers. Fix
once, fixed everywhere.

## Why this matters for tests

Depth is a property of the **interface**, not the implementation. A deep module
can be internally composed of small, mockable, swappable parts; they just are
not part of the interface. A module can have **internal seams** (private to its
implementation, used by its own tests) as well as the **external seam** at its
interface.

Tests belong at the external seam. Reaching for an internal seam is how a test
becomes implementation-coupled.

When designing the interface, ask:

- Can I reduce the number of methods?
- Can I simplify the parameters?
- Can I hide more complexity inside?
