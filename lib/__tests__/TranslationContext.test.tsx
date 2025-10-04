import { render, screen, fireEvent } from '@testing-library/react'
import { TranslationProvider, useTranslation } from '../TranslationContext'

// Test component to use the translation context
const TestComponent = () => {
  const { t, language, setLanguage } = useTranslation()
  
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="title">{t('hero.title')}</span>
      <button onClick={() => setLanguage('en')}>Switch to EN</button>
      <button onClick={() => setLanguage('de')}>Switch to DE</button>
    </div>
  )
}

describe('TranslationContext', () => {
  it('should provide default German language', () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    )
    
    expect(screen.getByTestId('language')).toHaveTextContent('de')
    expect(screen.getByTestId('title')).toHaveTextContent('Self-Storage in Langelsheim')
  })

  it('should switch to English', () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    )
    
    fireEvent.click(screen.getByText('Switch to EN'))
    
    expect(screen.getByTestId('language')).toHaveTextContent('en')
    expect(screen.getByTestId('title')).toHaveTextContent('Self-Storage in Langelsheim')
  })

  it('should switch back to German', () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    )
    
    fireEvent.click(screen.getByText('Switch to EN'))
    fireEvent.click(screen.getByText('Switch to DE'))
    
    expect(screen.getByTestId('language')).toHaveTextContent('de')
    expect(screen.getByTestId('title')).toHaveTextContent('Self-Storage in Langelsheim')
  })

  it('should return key if translation not found', () => {
    const TestMissingKey = () => {
      const { t } = useTranslation()
      return <span data-testid="missing">{t('nonexistent.key')}</span>
    }

    render(
      <TranslationProvider>
        <TestMissingKey />
      </TranslationProvider>
    )
    
    expect(screen.getByTestId('missing')).toHaveTextContent('nonexistent.key')
  })
})
