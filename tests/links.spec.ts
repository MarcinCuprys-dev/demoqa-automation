import { test, expect } from "@playwright/test";
import { LinksPage } from "../pages/links/links.page";

test.describe("DemoQA Links", () => {
  let linksPage: ReturnType<typeof LinksPage>;

  test.beforeEach(async ({ page }) => {
    linksPage = LinksPage(page);
    await linksPage.goto();
  });

  test.only("Created link returns 201", async () => {
    const response = await linksPage.clickAndWaitForResponse({
      link: linksPage.createdLink,
      endpoint: "/created",
      expectedStatus: 201,
    });

    expect(response.url()).toContain("https://demoqa.com/created");
    expect(response.status()).toBe(201);
    expect(response.statusText()).toBe("Created");
    expect(response.request().method()).toBe("GET");

    const text = await linksPage.getResponseText();
    expect(text).toContain(
      "Link has responded with staus 201 and status text Created"
    );
  });

  test.only("No content link returns 204", async () => {
    const response = await linksPage.clickAndWaitForResponse({
      link: linksPage.noContentLink,
      endpoint: "/no-content",
      expectedStatus: 204,
    });

    expect(response.url()).toContain("https://demoqa.com/no-content");
    expect(response.status()).toBe(204);
    expect(response.statusText()).toBe("No Content");
    expect(response.request().method()).toBe("GET");

    const text = await linksPage.getResponseText();
    expect(text).toContain(
      "Link has responded with staus 204 and status text No Content"
    );
  });

  test("Moved link returns 301", async () => {
    const response = await linksPage.clickAndWaitForResponse({
      link: linksPage.movedLink,
      endpoint: "/moved",
      expectedStatus: 301,
    });

    expect(response.url()).toContain("https://demoqa.com/moved");
    expect(response.status()).toBe(301);
    expect(response.statusText()).toBe("Moved Permanently");
    expect(response.request().method()).toBe("GET");

    const text = await linksPage.getResponseText();
    expect(text).toContain(
      "Link has responded with staus 301 and status text Moved Permanently"
    );
  });

  test("Bad request link returns 400", async () => {
    const response = await linksPage.clickAndWaitForResponse({
      link: linksPage.badRequestLink,
      endpoint: "/bad-request",
      expectedStatus: 400,
    });

    expect(response.url()).toContain("https://demoqa.com/bad-request");
    expect(response.status()).toBe(400);
    expect(response.statusText()).toBe("Bad Request");
    expect(response.request().method()).toBe("GET");

    const text = await linksPage.getResponseText();
    expect(text).toContain(
      "Link has responded with staus 400 and status text Bad Request"
    );
  });

  test("Unauthorized link returns 401", async () => {
    const response = await linksPage.clickAndWaitForResponse({
      link: linksPage.unauthorizedLink,
      endpoint: "/unauthorized",
      expectedStatus: 401,
    });

    expect(response.url()).toContain("https://demoqa.com/unauthorized");
    expect(response.status()).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");
    expect(response.request().method()).toBe("GET");

    const text = await linksPage.getResponseText();
    expect(text).toContain(
      "Link has responded with staus 401 and status text Unauthorized"
    );
  });

  test("Forbiden link returns 403", async () => {
    const response = await linksPage.clickAndWaitForResponse({
      link: linksPage.forbiddenLink,
      endpoint: "/forbidden",
      expectedStatus: 403,
    });

    expect(response.url()).toContain("https://demoqa.com/forbidden");
    expect(response.status()).toBe(403);
    expect(response.statusText()).toBe("Forbidden");
    expect(response.request().method()).toBe("GET");

    const text = await linksPage.getResponseText();
    expect(text).toContain(
      "Link has responded with staus 403 and status text Forbidden"
    );
  });

  test("Not found link returns 404", async () => {
    const response = await linksPage.clickAndWaitForResponse({
      link: linksPage.notFoundLink,
      endpoint: "/invalid-url",
      expectedStatus: 404,
    });

    expect(response.url(),"Message").toContain("https://demoqa.com/invalid-url");
    expect(response.status()).toBe(404);
    expect(response.statusText()).toBe("Not Found");
    expect(response.request().method()).toBe("GET");

    const text = await linksPage.getResponseText();
    expect(text).toContain(
      "Link has responded with staus 404 and status text Not Found"
    );
  });

  test("Random link returns correct status", async () => {
    const links = [
      {
        link: linksPage.createdLink,
        endpoint: "/created",
        status: 201,
        statusText: "Created",
      },
      {
        link: linksPage.noContentLink,
        endpoint: "/no-content",
        status: 204,
        statusText: "No Content",
      },
      {
        link: linksPage.movedLink,
        endpoint: "/moved",
        status: 301,
        statusText: "Moved Permanently",
      },
      {
        link: linksPage.badRequestLink,
        endpoint: "/bad-request",
        status: 400,
        statusText: "Bad Request",
      },
      {
        link: linksPage.unauthorizedLink,
        endpoint: "/unauthorized",
        status: 401,
        statusText: "Unauthorized",
      },
      {
        link: linksPage.forbiddenLink,
        endpoint: "/forbidden",
        status: 403,
        statusText: "Forbidden",
      },
      {
        link: linksPage.notFoundLink,
        endpoint: "/invalid-url",
        status: 404,
        statusText: "Not Found",
      },
    ];

    const random = links[Math.floor(Math.random() * links.length)];

    const response = await linksPage.clickAndWaitForResponse({
      link: random.link,
      endpoint: random.endpoint,
      expectedStatus: random.status,
    });

    expect(response.url()).toContain(`https://demoqa.com${random.endpoint}`);
    expect(response.status()).toBe(random.status);
    expect(response.statusText()).toBe(random.statusText);
    expect(response.request().method()).toBe("GET");

    const text = await linksPage.getResponseText();
    expect(text).toContain(
      `Link has responded with staus ${random.status} and status text ${random.statusText}`
    );
  });
});


//demo qa się powtarz 
// tablica do przeniesienia -> helper 
// i random do przeniesienia -> global utils 
// soft expect  
// message expect 
// .env z base url 
// 