import { render, screen, fireEvent } from '@testing-library/react'
import LanguageSwitcher from '../LanguageSwitcher'
import { TranslationProvider } from '../../lib/TranslationContext'

const renderWithProvider = () => {
  return render(
    <TranslationProvider>
      <LanguageSwitcher />
    </TranslationProvider>
  )
}

describe('LanguageSwitcher Component', () => {
  it('renders both language buttons', () => {
    renderWithProvider()
    
    expect(screen.getByRole('button', { name: 'DE' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument()
  })

  it('shows German as active by default', () => {
    renderWithProvider()
    
    const deButton = screen.getByRole('button', { name: 'DE' })
    const enButton = screen.getByRole('button', { name: 'EN' })
    
    expect(deButton).toHaveClass('bg-primary-600', 'text-white')
    expect(enButton).toHaveClass('bg-gray-200', 'text-gray-700')
  })

  it('switches to English when EN button is clicked', () => {
    renderWithProvider()
    
    const enButton = screen.getByRole('button', { name: 'EN' })
    fireEvent.click(enButton)
    
    const deButton = screen.getByRole('button', { name: 'DE' })
    
    expect(enButton).toHaveClass('bg-primary-600', 'text-white')
    expect(deButton).toHaveClass('bg-gray-200', 'text-gray-700')
  })

  it('switches back to German when DE button is clicked', () => {
    renderWithProvider()
    
    // Switch to English first
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    
    // Switch back to German
    const deButton = screen.getByRole('button', { name: 'DE' })
    fireEvent.click(deButton)
    
    const enButton = screen.getByRole('button', { name: 'EN' })
    
    expect(deButton).toHaveClass('bg-primary-600', 'text-white')
    expect(enButton).toHaveClass('bg-gray-200', 'text-gray-700')
  })
})
