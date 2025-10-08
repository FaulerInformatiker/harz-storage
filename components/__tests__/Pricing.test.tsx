import { render, screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import Pricing from '../Pricing';
import { TranslationProvider } from '../../lib/TranslationContext';

const PricingWithProvider = () => (
  <TranslationProvider>
    <Pricing />
  </TranslationProvider>
);

describe('Pricing Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pricing section container', async () => {
    await act(async () => {
      render(<PricingWithProvider />);
    });
    
    const pricingSection = document.querySelector('#preise');
    expect(pricingSection).toBeInTheDocument();
  });

  it('renders pricing title', async () => {
    await act(async () => {
      render(<PricingWithProvider />);
    });
    
    expect(screen.getByText('Größen & Preise')).toBeInTheDocument();
  });

  it('renders pricing subtitle', async () => {
    await act(async () => {
      render(<PricingWithProvider />);
    });
    
    expect(screen.getByText('Finden Sie die passende Box für Ihre Bedürfnisse')).toBeInTheDocument();
  });
});
