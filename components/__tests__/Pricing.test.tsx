import { render, screen } from '@testing-library/react';
import Pricing from '../Pricing';
import { TranslationProvider } from '../../lib/TranslationContext';

const PricingWithProvider = () => (
  <TranslationProvider>
    <Pricing />
  </TranslationProvider>
);

describe('Pricing Component', () => {
  it('renders loading state when fetch is not available', () => {
    render(<PricingWithProvider />);
    
    // Since fetch is not available in test environment, component shows loading state
    expect(screen.getByText(/lade preise/i)).toBeInTheDocument();
    
    // Check for loading spinner
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('renders pricing section container', () => {
    render(<PricingWithProvider />);
    
    // Check that the pricing section exists with correct ID
    const pricingSection = document.querySelector('#preise');
    expect(pricingSection).toBeInTheDocument();
  });

  it('renders loading message in German', () => {
    render(<PricingWithProvider />);
    
    // Verify the loading message is displayed
    expect(screen.getByText('Lade Preise...')).toBeInTheDocument();
  });
});
