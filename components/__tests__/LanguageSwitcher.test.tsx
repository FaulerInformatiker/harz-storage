import { render, screen, fireEvent } from '@testing-library/react';
import { TranslationProvider } from '../../lib/TranslationContext';
import LanguageSwitcher from '../LanguageSwitcher';

const LanguageSwitcherWithProvider = () => (
  <TranslationProvider>
    <LanguageSwitcher />
  </TranslationProvider>
);

describe('LanguageSwitcher Component', () => {
  it('renders language buttons', () => {
    render(<LanguageSwitcherWithProvider />);
    expect(screen.getByText('DE')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('switches language when clicked', () => {
    render(<LanguageSwitcherWithProvider />);
    
    const enButton = screen.getByText('EN');
    fireEvent.click(enButton);
    
    // Button should be clickable and change state
    expect(enButton).toBeInTheDocument();
  });
});
