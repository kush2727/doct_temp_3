import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Button } from '../Button'
import { Card } from '../Card'

describe('Performance Tests', () => {
  let startTime: number
  let endTime: number

  beforeEach(() => {
    startTime = performance.now()
  })

  it('Button component renders quickly', () => {
    render(<Button>Click me</Button>)
    endTime = performance.now()
    const renderTime = endTime - startTime
    expect(renderTime).toBeLessThan(100) // Should render in less than 100ms
  })

  it('Card component renders quickly', () => {
    render(<Card>Content</Card>)
    endTime = performance.now()
    const renderTime = endTime - startTime
    expect(renderTime).toBeLessThan(100)
  })

  it('Multiple components render efficiently', () => {
    const { rerender } = render(
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Card>Card 1</Card>
        <Card>Card 2</Card>
      </>
    )
    endTime = performance.now()
    const renderTime = endTime - startTime
    expect(renderTime).toBeLessThan(200)

    // Re-render should be fast
    startTime = performance.now()
    rerender(
      <>
        <Button>Button 1 Updated</Button>
        <Button>Button 2 Updated</Button>
        <Card>Card 1 Updated</Card>
        <Card>Card 2 Updated</Card>
      </>
    )
    endTime = performance.now()
    const rerenderTime = endTime - startTime
    expect(rerenderTime).toBeLessThan(100)
  })
})
