import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

describe('useTheme hook', () => {
  beforeEach(() => {
    localStorage.getItem.mockClear()
    localStorage.setItem.mockClear()
  })

  it('defaults to light when no localStorage and no system preference', () => {
    localStorage.getItem.mockReturnValue(null)
    window.matchMedia.mockReturnValue({ matches: false })
    
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('loads theme from localStorage', () => {
    localStorage.getItem.mockReturnValue('dark')
    
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('toggles from light to dark', () => {
    localStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
    
    act(() => { result.current.toggleTheme() })
    expect(result.current.theme).toBe('dark')
  })

  it('toggles from dark to light', () => {
    localStorage.getItem.mockReturnValue('dark')
    
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    
    act(() => { result.current.toggleTheme() })
    expect(result.current.theme).toBe('light')
  })

  it('persists theme to localStorage on change', () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => { result.current.toggleTheme() })
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('defaults to dark when system prefers dark and no stored theme', () => {
    localStorage.getItem.mockReturnValue(null)
    window.matchMedia.mockReturnValue({ matches: true })
    
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })
})