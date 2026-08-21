import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SimulationPanel from './SimulationPanel'
import type { Simulation } from '../lib/simulation'

const SIMULATION: Simulation = {
  title: 'Stress-testing a cache plan',
  trigger: 'grill me',
  caveat: 'Round 1 only; a real session runs three to five rounds.',
  turns: [
    { role: 'user', body: 'Grill me on this caching plan.' },
    { role: 'assistant', body: 'Four questions on the **frontier**.' },
    { role: 'tool', label: 'bash', body: '```\n$ rg -n cache server/\n```' },
    { role: 'note', body: 'The whole frontier goes out in one round.' },
  ],
}

function renderPanel() {
  return render(<SimulationPanel skillName="grill-me" simulation={SIMULATION} />)
}

describe('SimulationPanel', () => {
  it('renders one list item per turn, in order', () => {
    renderPanel()

    const turns = screen.getAllByRole('listitem')
    expect(turns).toHaveLength(4)
    expect(turns[0]).toHaveTextContent('Grill me on this caching plan.')
    expect(turns[3]).toHaveTextContent('The whole frontier goes out in one round.')
  })

  it('announces every speaker as real text, not a CSS decoration', () => {
    renderPanel()

    const turns = screen.getAllByRole('listitem')
    expect(turns[0]).toHaveTextContent('user')
    expect(turns[1]).toHaveTextContent('assistant')
    expect(turns[2]).toHaveTextContent('tool')
    expect(turns[3]).toHaveTextContent('note')
  })

  it('shows the tool label beside the role', () => {
    renderPanel()

    expect(screen.getAllByRole('listitem')[2]).toHaveTextContent('bash')
  })

  it('marks a note as an aside so it is not read as part of the reply', () => {
    renderPanel()

    const note = screen.getByRole('complementary')
    expect(note).toHaveTextContent('The whole frontier goes out in one round.')

    const assistant = screen.getAllByRole('listitem')[1]
    expect(within(assistant).queryByRole('complementary')).toBeNull()
  })

  it('renders markdown inside a turn', () => {
    renderPanel()

    expect(screen.getByText('frontier')).toBeInTheDocument()
  })

  it('always shows the caveat, labelled for screen readers', () => {
    renderPanel()

    expect(screen.getByText(/Caveat:/)).toBeInTheDocument()
    expect(screen.getByText(/a real session runs three to five rounds/)).toBeInTheDocument()
  })

  it('names the source file and links to it', () => {
    renderPanel()

    expect(screen.getByText('skills/grill-me/SIMULATION.md')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'source' })).toHaveAttribute(
      'href',
      expect.stringContaining('skills/grill-me/SIMULATION.md')
    )
  })
})
