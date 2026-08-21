import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import SkillRoute from './SkillRoute'
import { skills } from '../lib/skillsSource'

function renderSkill(name: string) {
  return render(
    <MemoryRouter initialEntries={[`/s/${name}`]}>
      <Routes>
        <Route path="/s/:name" element={<SkillRoute />} />
      </Routes>
    </MemoryRouter>,
  )
}

const WITH_SIMULATION = skills.find((skill) => skill.simulation)!
const WITHOUT_SIMULATION = skills.find((skill) => !skill.simulation)!

describe('SkillRoute', () => {
  it('labels the collapsed instructions disclosure with its visible heading', () => {
    renderSkill('grill-me')

    const heading = screen.getByRole('heading', { level: 2, name: 'Full Instructions' })
    const disclosure = heading.closest('details')

    expect(heading).toHaveAttribute('id', 'instructions')
    expect(disclosure).toHaveAttribute('aria-labelledby', 'instructions')
    expect(disclosure).not.toHaveAttribute('open')
  })
})

describe('SkillRoute worked example', () => {
  it('shows a collapsed disclosure for a skill that ships one', () => {
    renderSkill(WITH_SIMULATION.name)

    const heading = screen.getByRole('heading', { level: 2, name: 'Simulation Example' })
    const disclosure = heading.closest('details')

    expect(heading).toHaveAttribute('id', 'simulation')
    expect(disclosure).toHaveAttribute('aria-labelledby', 'simulation')
    expect(disclosure).not.toHaveAttribute('open')
  })

  it('summarises the scenario so the section is worth opening', () => {
    renderSkill(WITH_SIMULATION.name)

    expect(screen.getByText(WITH_SIMULATION.simulation!.title)).toBeInTheDocument()
  })

  it('renders the transcript itself', () => {
    renderSkill(WITH_SIMULATION.name)

    expect(screen.getByText(`skills/${WITH_SIMULATION.name}/SIMULATION.md`)).toBeInTheDocument()
    expect(screen.getByText(WITH_SIMULATION.simulation!.caveat)).toBeInTheDocument()
  })

  it('renders nothing at all for a skill without one', () => {
    renderSkill(WITHOUT_SIMULATION.name)

    expect(screen.queryByRole('heading', { level: 2, name: 'Simulation Example' })).toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: 'Full Instructions' })).toBeInTheDocument()
  })

  it('runs cheapest question first: example, then instructions, then install', () => {
    renderSkill(WITH_SIMULATION.name)

    // Only the disclosure headings: a collapsed <details> still renders its
    // contents, so the instruction body's own H2s are in the document too.
    const order = screen
      .getAllByRole('heading', { level: 2 })
      .filter((heading) => heading.closest('summary'))
      .map((heading) => heading.getAttribute('id'))

    expect(order).toEqual(['simulation', 'instructions', 'install'])
  })
})
