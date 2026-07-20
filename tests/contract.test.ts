import { describe, expect, it } from "vitest";
import { findModelForAction, validateInputRules, validateParams } from "@runapi.ai/mcp-core";
import { readContract } from "../src/data.js";

describe("Seedream embedded contract", () => {
  it("rejects Seedream 5 Pro v4-only controls", () => {
    const contract = readContract();

    for (const [action, model] of [
      ["text_to_image", "seedream-5-pro-text-to-image"],
      ["edit_image", "seedream-5-pro-edit"]
    ] as const) {
      const info = findModelForAction("seedream", action, model, contract);

      expect(info).toBeDefined();
      expect(info!.fields).not.toHaveProperty("output_resolution");
      expect(info!.fields).not.toHaveProperty("output_count");
      expect(info!.fields).not.toHaveProperty("seed");

      const params = validateParams(info!.fields, {
        model,
        prompt: "Create a polished product image",
        aspect_ratio: "1:1",
        output_quality: "high",
        ...(action === "edit_image" ? { source_image_urls: ["https://cdn.runapi.ai/example.png"] } : {}),
        output_resolution: "2k"
      });
      const contractAction = contract.actions[`seedream/${action.replaceAll("_", "-")}`];
      expect(validateInputRules(contractAction?.rules ?? [], params))
        .toBe(`model=${model} must not include output_resolution.`);
    }
  });
});
