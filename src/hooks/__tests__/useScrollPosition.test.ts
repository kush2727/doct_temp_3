import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollPosition } from '../useScrollPosition'

describe('useScrollPosition Hook', () => {
  beforeEach(() => {
    window.scrollY = 0
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns initial scroll position', () => {
    const { result } = renderHook(() => useScrollPosition())
    expect(result.current).toBe(0)
  })

  it('updates scroll position on scroll', () => {
    const { result } = renderHook(() => useScrollPosition())

    act(() => {
      window.scrollY = 100
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(100)
  })

  it('updates scroll position multiple times', () => {
    const { result } = renderHook(() => useScrollPosition())

    act(() => {
      window.scrollY = 50
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(50)

    act(() => {
      window.scrollY = 150
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(150)
  })

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollPosition())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})
