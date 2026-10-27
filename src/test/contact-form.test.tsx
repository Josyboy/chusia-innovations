import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const insert = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: () => ({ insert }) },
}));

import { ContactForm } from "@/components/ContactForm";

function fillValidForm() {
  fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Ada Lovelace" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
  fireEvent.click(screen.getByRole("button", { name: "Web Design" }));
  fireEvent.click(screen.getByRole("button", { name: "£1k – £3k" }));
  fireEvent.click(screen.getByRole("button", { name: "ASAP" }));
  fireEvent.change(screen.getByLabelText("Project details"), {
    target: { value: "We need a new marketing site." },
  });
}

const submit = () => fireEvent.click(screen.getByRole("button", { name: /send project details/i }));

describe("ContactForm", () => {
  beforeEach(() => {
    insert.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("shows field errors, marks fields invalid and focuses the first one", () => {
    render(<ContactForm />);
    submit();

    expect(screen.getByText("Please add your name")).toBeInTheDocument();
    expect(screen.getByText("Choose a service")).toBeInTheDocument();
    const name = screen.getByLabelText("Your name");
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveFocus();
    expect(insert).not.toHaveBeenCalled();
  });

  it("clears a field's error once it is edited", () => {
    render(<ContactForm />);
    submit();
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Ada" } });
    expect(screen.queryByText("Please add your name")).not.toBeInTheDocument();
  });

  it("marks the selected chip as pressed", () => {
    render(<ContactForm />);
    const chip = screen.getByRole("button", { name: "Brand Identity" });
    fireEvent.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
  });

  it("submits trimmed data and shows a confirmation", async () => {
    insert.mockResolvedValue({ error: null });
    render(<ContactForm />);
    fillValidForm();
    submit();

    expect(await screen.findByText("Thanks, Ada!")).toBeInTheDocument();
    expect(insert).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      service: "Web Design",
      budget: "£1k – £3k",
      timeline: "ASAP",
      details: "We need a new marketing site.",
    });
  });

  it("recovers from a network failure instead of hanging on 'Sending…'", async () => {
    insert.mockRejectedValue(new Error("network down"));
    render(<ContactForm />);
    fillValidForm();
    submit();

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send project details/i })).toBeEnabled();
  });

  it("silently drops submissions that fill the honeypot", async () => {
    render(<ContactForm />);
    fillValidForm();
    fireEvent.change(document.getElementById("cf-website")!, { target: { value: "spam.biz" } });
    submit();

    await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
    expect(insert).not.toHaveBeenCalled();
  });
});
