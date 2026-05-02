import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('renders with primary variant by default', () => {
    const { container } = render(<Button>Click me</Button>)
    const button = container.querySelector('button')
    expect(button).toHaveClass('bg-gradient-teal')
  })

  it('renders with secondary variant', () => {
    const { container } = render(<Button variant="secondary">Click me</Button>)
    const button = container.querySelector('button')
    expect(button).toHaveClass('bg-soft-blue')
  })

  it('renders with outline variant', () => {
    const { container } = render(<Button variant="outline">Click me</Button>)
    const button = container.querySelector('button')
    expect(button).toHaveClass('border-2')
  })

  it('shows loading state', () => {
    render(<Button isLoading>Click me</Button>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('disables button when loading', () => {
    render(<Button isLoading>Click me</Button>)
    const button = screen.getByText('Loading...').closest('button')
    expect(button).toBeDisabled()
  })

  it('renders different sizes', () => {
    const { container: smContainer } = render(<Button size="sm">Small</Button>)
    const { container: mdContainer } = render(<Button size="md">Medium</Button>)
    const { container: lgContainer } = render(<Button size="lg">Large</Button>)

    expect(smContainer.querySelector('button')).toHaveClass('px-4')
    expect(mdContainer.querySelector('button')).toHaveClass('px-6')
    expect(lgContainer.querySelector('button')).toHaveClass('px-8')
  })
})
