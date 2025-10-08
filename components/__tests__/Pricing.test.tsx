import { render, screen, act, waitFor } from '@testing-library/react';
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
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
      },
      writable: true
    });
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn(() => ({ matches: false })),
      writable: true
    });
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

  it('shows loading state initially', async () => {
    global.fetch = vi.fn(() => new Promise(() => {})); // Never resolves
    
    await act(async () => {
      render(<PricingWithProvider />);
    });

    expect(screen.getByText('Lade Preise...')).toBeInTheDocument();
  });

  it('renders box data after successful API call', async () => {
    const mockBoxes = [
      { 
        id: 1, 
        size: '5m²', 
        price: '25€', 
        currency: '/Monat', 
        description: 'Test box', 
        icon: '📦', 
        popular: false, 
        available: true 
      }
    ];

    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockBoxes),
      } as Response)
    );

    const { container } = render(<PricingWithProvider />);

    await waitFor(() => {
      expect(screen.getByText('5m²')).toBeInTheDocument();
    }, { container });
  });

  it('handles API error gracefully', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('API Error')));

    const { container } = render(<PricingWithProvider />);

    // Should show loading initially, then hide after error
    await waitFor(() => {
      expect(screen.queryByText('Lade Preise...')).not.toBeInTheDocument();
    }, { container });
  });

  it('renders popular badge for popular boxes', async () => {
    const mockBoxes = [
      { 
        id: 1, 
        size: '10m²', 
        price: '45€', 
        currency: '/Monat', 
        description: 'Popular box', 
        icon: '🏠', 
        popular: true, 
        available: true 
      }
    ];

    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockBoxes),
      } as Response)
    );

    const { container } = render(<PricingWithProvider />);

    await waitFor(() => {
      expect(screen.getByText('Beliebt')).toBeInTheDocument();
    }, { container });
  });

  it('renders sold out state for unavailable boxes', async () => {
    const mockBoxes = [
      { 
        id: 1, 
        size: '5m²', 
        price: '25€', 
        currency: '/Monat', 
        description: 'Sold out box', 
        icon: '📦', 
        popular: false, 
        available: false 
      }
    ];

    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockBoxes),
      } as Response)
    );

    const { container } = render(<PricingWithProvider />);

    await waitFor(() => {
      expect(screen.getAllByText('Ausgebucht')).toHaveLength(3); // Badge, availability text, and button
    }, { container });
  });
});
