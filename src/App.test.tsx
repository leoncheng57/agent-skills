import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App migration notice', () => {
  it('keeps the deprecation notice and destination visible in the app shell', () => {
    vi.stubGlobal('scrollTo', vi.fn())

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('complementary', { name: 'Catalog migration in progress' }),
    ).toHaveTextContent('This catalog is no longer maintained here.')
    expect(screen.getByRole('link', { name: 'Go to custom-dca-opencode' })).toHaveAttribute(
      'href',
      'https://github.com/leoncheng57/custom-dca-opencode',
    )
  })
})
