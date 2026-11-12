import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";

describe("SiteHeader", () => {
  const html = renderToStaticMarkup(<SiteHeader />);

  it("shows the product name", () => {
    expect(html).toContain("WorkBot");
  });

  it("links to the home page", () => {
    expect(html).toContain('href="/"');
  });

  it("links to settings", () => {
    expect(html).toContain('href="/settings"');
  });
});
