import { render, screen } from '@testing-library/react';
import { TranslationProvider } from '../../lib/TranslationContext';
import Advantages from '../Advantages';

const AdvantagesWithProvider = () => (
  <TranslationProvider>
    <Advantages />
  </TranslationProvider>
);

describe('Advantages Component', () => {
  it('renders advantages section', () => {
    render(<AdvantagesWithProvider />);
    expect(screen.getByText(/24\/7 Zugang/)).toBeInTheDocument();
    expect(screen.getByText(/Videoüberwacht/)).toBeInTheDocument();
    expect(screen.getByText(/Transparente Preise/)).toBeInTheDocument();
    expect(screen.getByText(/Flexible Laufzeiten/)).toBeInTheDocument();
  });
});
