import { describe, expect, it } from "vitest";
import { cn, money } from "./utils";

describe("shared utilities", () => {
  it("merges Tailwind class conflicts", () => expect(cn("px-2", "px-4")).toBe("px-4"));
  it("formats Argentine pesos", () => expect(money.format(125000)).toContain("125.000"));
});
