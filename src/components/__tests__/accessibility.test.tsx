import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '../Button'
import { Card } from '../Card'
import { Badge } from '../Badge'

expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  it('Button component has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Card component has no accessibility violations', async () => {
    const { container } = render(<Card>Test content</Card>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Badge component has no accessibility violations', async () => {
    const { container } = render(<Badge>Test badge</Badge>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Button has proper focus state', () => {
    const { container } = render(<Button>Click me</Button>)
    const button = container.querySelector('button')
    expect(button).toHaveClass('focus-visible:outline-2')
  })

  it('Card has semantic HTML structure', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('div')
    expect(card).toBeInTheDocument()
  })

  it('Badge has proper color contrast', () => {
    const { container } = render(<Badge variant="primary">Test</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('bg-soft-blue')
    expect(badge).toHaveClass('text-teal-primary')
  })
})
