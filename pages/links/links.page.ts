import { Page, Locator, Response, expect } from "@playwright/test";
import { linksSelectors } from "./selectors.page";

export const LinksPage = (page: Page) => {
  const createdLink: Locator = page.locator(linksSelectors.createdLink);
  const linkResponse: Locator = page.locator(linksSelectors.linkResponse);
  const noContentLink: Locator = page.locator(linksSelectors.noContentLink);
  const movedLink: Locator = page.locator(linksSelectors.movedLink);
  const badRequestLink: Locator = page.locator(linksSelectors.badRequestLink);
  const unauthorizedLink: Locator = page.locator(
    linksSelectors.unauthorizedLink
  );
  const forbiddenLink: Locator = page.locator(linksSelectors.forbiddenLink);
  const notFoundLink: Locator = page.locator(linksSelectors.notFoundLink);

  const goto = async (): Promise<void> => {
    await page.goto("/links");
  };

  const clickAndWaitForResponse = async (data: {
    link: Locator;
    endpoint: string;
    expectedStatus: number;
  }): Promise<Response> => {
    const { link, endpoint, expectedStatus } = data;

    const [response] = await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes(endpoint) && resp.status() === expectedStatus
      ),
      link.click(),
    ]);

    return response;
  };

  const getResponseText = async (): Promise<string | null> => {
    return linkResponse.textContent();
  };

  return {
    page,
    createdLink,
    noContentLink,
    movedLink,
    badRequestLink,
    unauthorizedLink,
    forbiddenLink,
    notFoundLink,
    linkResponse,
    goto,
    clickAndWaitForResponse,
    getResponseText,
  };
};
