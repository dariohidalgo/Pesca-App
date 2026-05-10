import { render, screen } from '@testing-library/react'
import LoadingSkeleton from './LoadingSkeleton'

describe('LoadingSkeleton', () => {
  describe('rendering', () => {
    it('renders default 3 lines', () => {
      render(<LoadingSkeleton />)
      // Lines are divs with class "h-4 bg-slate-200 rounded-lg"
      const lines = document.querySelectorAll('[class*="bg-slate-200"][class*="h-4"]')
      expect(lines).toHaveLength(3)
    })

    it('renders custom line count', () => {
      render(<LoadingSkeleton lines={5} />)
      const lines = document.querySelectorAll('[class*="bg-slate-200"][class*="h-4"]')
      expect(lines).toHaveLength(5)
    })

    it('accepts custom className', () => {
      render(<LoadingSkeleton className="my-custom-class" />)
      const container = document.querySelector('[class*="my-custom-class"]')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('my-custom-class')
    })
  })

  describe('line widths', () => {
    it('line widths decrease progressively', () => {
      render(<LoadingSkeleton />)
      const lines = document.querySelectorAll('[class*="bg-slate-200"][class*="h-4"]')

      const getWidth = (el) => parseFloat(el.style.width)
      expect(getWidth(lines[0])).toBeGreaterThan(getWidth(lines[1]))
      expect(getWidth(lines[1])).toBeGreaterThan(getWidth(lines[2]))
    })

    it('first line has 100% width (index 0: 100-0*15=100)', () => {
      render(<LoadingSkeleton />)
      const lines = document.querySelectorAll('[class*="bg-slate-200"][class*="h-4"]')
      expect(lines[0].style.width).toBe('100%')
    })

    it('second line has 85% width (index 1: 100-1*15=85)', () => {
      render(<LoadingSkeleton lines={2} />)
      const lines = document.querySelectorAll('[class*="bg-slate-200"][class*="h-4"]')
      expect(lines[1].style.width).toBe('85%')
    })

    it('respects lines prop for count', () => {
      render(<LoadingSkeleton lines={7} />)
      const lines = document.querySelectorAll('[class*="bg-slate-200"][class*="h-4"]')
      expect(lines).toHaveLength(7)
    })
  })
})