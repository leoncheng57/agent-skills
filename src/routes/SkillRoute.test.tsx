import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import SkillRoute from './SkillRoute'

describe('SkillRoute', () => {
  it('labels the collapsed instructions disclosure with its visible heading', () => {
    render(
      <MemoryRouter initialEntries={['/s/grill-me']}>
        <Routes>
          <Route path="/s/:name" element={<SkillRoute />} />
        </Routes>
      </MemoryRouter>,
    )

    const heading = screen.getByRole('heading', { level: 2, name: 'Full Instructions' })
    const disclosure = heading.closest('details')

    expect(heading).toHaveAttribute('id', 'instructions')
    expect(disclosure).toHaveAttribute('aria-labelledby', 'instructions')
    expect(disclosure).not.toHaveAttribute('open')
  })
})
