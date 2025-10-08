import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeProvider, useTheme } from '../ThemeContext';

// Test component to use the theme context
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock localStorage properly
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it('provides light theme by default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('loads dark theme from localStorage', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'dark'),
        setItem: vi.fn(),
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('switches to dark theme', () => {
    const setItem = vi.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem,
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('switches to light theme', () => {
    const setItem = vi.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'dark'),
        setItem,
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('throws error when useTheme is used outside provider', () => {
    const TestComponentWithoutProvider = () => {
      try {
        useTheme();
        return <div>No error</div>;
      } catch (error) {
        return <div>{(error as Error).message}</div>;
      }
    };

    render(<TestComponentWithoutProvider />);
    expect(screen.getByText('useTheme must be used within a ThemeProvider')).toBeInTheDocument();
  });
});
