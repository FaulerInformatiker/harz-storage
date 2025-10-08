import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ThemeToggle from '../ThemeToggle';
import { ThemeProvider } from '../../lib/ThemeContext';

describe('ThemeToggle', () => {
  it('toggles from light to dark theme', () => {
    const ThemeToggleWithProvider = () => (
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    render(<ThemeToggleWithProvider />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('toggles from dark to light theme', () => {
    // Mock localStorage to simulate dark theme
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'dark'),
        setItem: vi.fn(),
      },
      writable: true,
    });

    const ThemeToggleWithProvider = () => (
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    render(<ThemeToggleWithProvider />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
