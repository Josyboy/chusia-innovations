import { describe, expect, it } from "vitest";

import { readFileSync } from "node:fs";
import path from "node:path";

import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  validateContact,
} from "@/lib/contact-schema";

const valid = {
  name: "  Ada Lovelace ",
  email: "ada@example.com",
  service: "Web Design",
  budget: "£1k – £3k",
  timeline: "ASAP",
  details: "We need a new marketing site.",
};

describe("validateContact", () => {
  it("accepts a valid submission and trims text", () => {
    const result = validateContact(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Ada Lovelace");
  });

  it("returns one message per invalid field", () => {
    const result = validateContact({
      name: "",
      email: "nope",
      service: "",
      budget: "",
      timeline: "",
      details: "short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.errors).sort()).toEqual(
        ["budget", "details", "email", "name", "service", "timeline"].sort(),
      );
    }
  });

  it("rejects values outside the allowed option lists", () => {
    const result = validateContact({ ...valid, service: "Crypto mining", budget: "£1m" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.service).toBe("Choose a service");
      expect(result.errors.budget).toBe("Choose a budget");
    }
  });
});

describe("database constraints", () => {
  const sql = readFileSync(
    path.resolve(__dirname, "../../drizzle/migrations/0001_contact_submission_constraints.sql"),
    "utf8",
  );

  it.each([...SERVICE_OPTIONS, ...BUDGET_OPTIONS, ...TIMELINE_OPTIONS])(
    "allows option %s in the migration",
    (option) => {
      expect(sql).toContain(`'${option}'`);
    },
  );
});
