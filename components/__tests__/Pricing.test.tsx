import { render, screen } from '@testing-library/react';
import { TranslationProvider } from '../../lib/TranslationContext';
import Pricing from '../Pricing';

const PricingWithProvider = () => (
  <TranslationProvider>
    <Pricing />
  </TranslationProvider>
);

describe('Pricing Component', () => {
  it('renders all pricing tiers', () => {
    render(<PricingWithProvider />);
    
    expect(screen.getByText('5m²')).toBeInTheDocument();
    expect(screen.getByText('10m²')).toBeInTheDocument();
    expect(screen.getByText('20m²')).toBeInTheDocument();
    
    expect(screen.getByText('25€')).toBeInTheDocument();
    expect(screen.getByText('45€')).toBeInTheDocument();
    expect(screen.getByText('80€')).toBeInTheDocument();
  });

  it('renders pricing section title', () => {
    render(<PricingWithProvider />);
    expect(screen.getByText('LAGER')).toBeInTheDocument();
    expect(screen.getByText('PREISE')).toBeInTheDocument();
  });

  it('renders popular badge', () => {
    render(<PricingWithProvider />);
    expect(screen.getByText(/beliebt/i)).toBeInTheDocument();
  });
});
