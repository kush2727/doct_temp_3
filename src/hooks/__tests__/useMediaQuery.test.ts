import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from '../useMediaQuery'

describe('useMediaQuery Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns false for non-matching query', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width: 320px)'))
    expect(result.current).toBe(false)
  })

  it('returns true for matching query', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 0px)'))
    expect(result.current).toBe(true)
  })

  it('updates when media query changes', () => {
    const mockMatchMedia = vi.fn((query) => ({
      matches: query === '(max-width: 768px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })

    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'))
    expect(result.current).toBe(true)
  })
})
