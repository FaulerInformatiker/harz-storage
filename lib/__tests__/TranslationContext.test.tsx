import { render, screen, fireEvent } from '@testing-library/react';
import { TranslationProvider, useTranslation } from '../TranslationContext';

const TestComponent = () => {
  const { t, language, setLanguage } = useTranslation();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="translation">{t('hero.title')}</span>
      <span data-testid="missing-key">{t('nonexistent.key')}</span>
      <button onClick={() => setLanguage('en')}>Switch to English</button>
      <button onClick={() => setLanguage('de')}>Switch to German</button>
    </div>
  );
};

describe('TranslationContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default German language', () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );
    
    expect(screen.getByTestId('language')).toHaveTextContent('de');
    expect(screen.getByTestId('translation')).toHaveTextContent('Self-Storage in Langelsheim');
  });

  it('switches to English', () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );
    
    fireEvent.click(screen.getByText('Switch to English'));
    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('translation')).toHaveTextContent('Self-Storage in Langelsheim');
  });

  it('persists language in localStorage', () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );
    
    fireEvent.click(screen.getByText('Switch to English'));
    expect(localStorage.getItem('language')).toBe('en');
  });

  it('loads language from localStorage', () => {
    localStorage.setItem('language', 'en');
    
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );
    
    expect(screen.getByTestId('language')).toHaveTextContent('en');
  });

  it('handles missing translation keys', () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );
    
    expect(screen.getByTestId('missing-key')).toHaveTextContent('nonexistent.key');
  });

  it('handles invalid localStorage data', () => {
    localStorage.setItem('language', 'invalid');
    
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );
    
    // Should fallback to default language
    expect(screen.getByTestId('language')).toHaveTextContent('de');
  });

  it('provides fallback when used outside provider', () => {
    // Component that uses useTranslation outside provider
    function FallbackTestComponent() {
      const { language, setLanguage, t } = useTranslation();
      return (
        <div>
          <span data-testid="fallback-language">{language}</span>
          <span data-testid="fallback-translation">{t('test.key')}</span>
          <button onClick={() => setLanguage('en')} data-testid="fallback-button">
            Change Language
          </button>
        </div>
      );
    }

    // Render without provider to test fallback
    render(<FallbackTestComponent />);
    
    expect(screen.getByTestId('fallback-language')).toHaveTextContent('de');
    expect(screen.getByTestId('fallback-translation')).toHaveTextContent('test.key');
    
    // setLanguage should be a no-op function
    const button = screen.getByTestId('fallback-button');
    fireEvent.click(button);
    expect(screen.getByTestId('fallback-language')).toHaveTextContent('de'); // Should remain unchanged
  });
});
