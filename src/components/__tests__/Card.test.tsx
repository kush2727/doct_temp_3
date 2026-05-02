import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Card } from '../Card'

describe('Card Component', () => {
  it('renders card with children', () => {
    const { getByText } = render(<Card>Test content</Card>)
    expect(getByText('Test content')).toBeInTheDocument()
  })

  it('renders with default variant', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('div')
    expect(card).toHaveClass('bg-white')
    expect(card).toHaveClass('shadow-md')
  })

  it('renders with elevated variant', () => {
    const { container } = render(<Card variant="elevated">Content</Card>)
    const card = container.querySelector('div')
    expect(card).toHaveClass('shadow-lg')
  })

  it('renders with glass variant', () => {
    const { container } = render(<Card variant="glass">Content</Card>)
    const card = container.querySelector('div')
    expect(card).toHaveClass('glass')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.querySelector('div')
    expect(card).toHaveClass('custom-class')
  })

  it('renders with rounded corners', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('div')
    expect(card).toHaveClass('rounded-xl')
  })
})
