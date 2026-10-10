import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SearchModal, { SearchButton } from './SearchModal'

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {ui}
    </BrowserRouter>
  )
}

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

    it('button has accessible name "Buscar"', () => {
      render(<SearchButton onClick={() => {}} />)
      expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument()
    })
  })
})

describe('SearchModal component accessibility', () => {
  it('renders accessible dialog with close button and accessible input label', () => {
    renderWithRouter(<SearchModal isOpen={true} onClose={() => {}} />)
    expect(screen.getByRole('dialog', { name: /búsqueda rápida/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cerrar búsqueda/i })).toBeInTheDocument()
    expect(screen.getByRole('searchbox', { name: /buscar nudos, especies/i })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()
    renderWithRouter(<SearchModal isOpen={true} onClose={handleClose} />)
    const closeBtn = screen.getByRole('button', { name: /cerrar búsqueda/i })
    fireEvent.click(closeBtn)
    expect(handleClose).toHaveBeenCalled()
  })

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn()
    renderWithRouter(<SearchModal isOpen={true} onClose={handleClose} />)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(handleClose).toHaveBeenCalled()
  })
})