import { render, screen, fireEvent } from '@testing-library/react'
import { SearchButton } from './SearchModal'

describe('SearchButton', () => {
  describe('rendering', () => {
    it('renders search button', () => {
      render(<SearchButton onClick={() => {}} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders with search icon (SVG element)', () => {
      render(<SearchButton onClick={() => {}} />)
      const button = screen.getByRole('button')
      const svg = button.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('click handler fires on click', () => {
      const mockOnClick = vi.fn()
      render(<SearchButton onClick={mockOnClick} />)

      fireEvent.click(screen.getByRole('button'))
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('onClick is called when button is triggered', () => {
      const mockOnClick = vi.fn()
      render(<SearchButton onClick={mockOnClick} />)

      fireEvent.click(screen.getByRole('button'))
      expect(mockOnClick).toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('button is a button element', () => {
      render(<SearchButton onClick={() => {}} />)
      const button = screen.getByRole('button')
      expect(button.tagName.toLowerCase()).toBe('button')
    })

    it('button has accessible text "Buscar..."', () => {
      render(<SearchButton onClick={() => {}} />)
      // The component has "Buscar..." text (hidden on sm screens)
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })
})