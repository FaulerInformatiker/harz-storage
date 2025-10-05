import { render, screen } from "@testing-library/react";
import Home from "../page";
import { TranslationProvider } from "../../lib/TranslationContext";
import { ThemeProvider } from "../../lib/ThemeContext";

describe("Home Page", () => {
  const renderWithProvider = () => {
    return render(
      <ThemeProvider>
        <TranslationProvider>
          <Home />
        </TranslationProvider>
      </ThemeProvider>,
    );
  };

  it("renders hero section with main heading", () => {
    renderWithProvider();

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("HarzStorage");
  });

  it("renders call-to-action button", () => {
    renderWithProvider();

    const ctaButton = screen.getByRole("link", {
      name: /jetzt lager anfragen/i,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "#kontakt");
  });

  it("renders pricing section", () => {
    renderWithProvider();

    // Since fetch is not available in test environment, pricing component shows loading state
    const loadingText = screen.getByText(/lade preise/i);
    expect(loadingText).toBeInTheDocument();
  });

  it("renders contact form", () => {
    renderWithProvider();

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
});
