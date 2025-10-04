import { render, screen } from "@testing-library/react";
import Home from "../page";
import { TranslationProvider } from "../../lib/TranslationContext";

describe("Home Page", () => {
  const renderWithProvider = () => {
    return render(
      <TranslationProvider>
        <Home />
      </TranslationProvider>,
    );
  };

  it("renders hero section with main heading", () => {
    renderWithProvider();

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("LAGERRAUMin Langelsheim");
  });

  it("renders call-to-action button", () => {
    renderWithProvider();

    const ctaButton = screen.getByRole("link", {
      name: /jetzt lager anfragen/i,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "#contact");
  });

  it("renders pricing section", () => {
    renderWithProvider();

    const pricingHeading = screen.getByRole("heading", {
      name: /lager preise/i,
    });
    expect(pricingHeading).toBeInTheDocument();
  });

  it("renders contact form", () => {
    renderWithProvider();

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
});
