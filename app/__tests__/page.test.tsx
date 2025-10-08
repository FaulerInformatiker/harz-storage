import { render, screen, act } from "@testing-library/react";
import { vi } from "vitest";
import Home from "../page";
import { TranslationProvider } from "../../lib/TranslationContext";
import { ThemeProvider } from "../../lib/ThemeContext";

describe("Home Page", () => {
  const renderWithProvider = async () => {
    return await act(async () => {
      return render(
        <ThemeProvider>
          <TranslationProvider>
            <Home />
          </TranslationProvider>
        </ThemeProvider>,
      );
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders hero section with main heading", async () => {
    await renderWithProvider();

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("HarzStorage");
  });

  it("renders call-to-action button", async () => {
    await renderWithProvider();

    const ctaButton = screen.getByRole("link", {
      name: /jetzt lager anfragen/i,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "#kontakt");
  });

  it("renders pricing section", async () => {
    await renderWithProvider();

    const pricingSection = document.querySelector('#preise');
    expect(pricingSection).toBeInTheDocument();
  });

  it("renders contact form", async () => {
    await renderWithProvider();

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
});
