const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("@jest/globals");

describe("E2E Test: Login, Select Store, Select Product", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    jest.setTimeout(10000); // Set a higher timeout for the entire test suite
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await driver.quit(); // Close browser
  });

  it("should login, select a store, and then select a product", async () => {
    try {
      await driver.get("http://localhost:3000/auth/login");
      await driver.findElement(By.name("email")).sendKeys("test@test.dk");
      await driver.findElement(By.name("password")).sendKeys("test5555");
      await driver.findElement(By.css("button[type='submit']")).click();

      await driver.wait(until.urlContains("/"), 20000);

      const storeLinkSelector = 'a[href^="stores/"]';
      await driver.wait(until.elementLocated(By.css(storeLinkSelector)), 20000);
      const storeElement = await driver.findElement(By.css(storeLinkSelector));
      const storeId = new URL(await storeElement.getAttribute("href")).pathname
        .split("/")
        .pop();
      await storeElement.click();

      await driver.wait(until.urlContains(`/stores/${storeId}`), 20000);

      const productListSelector =
        ".grid.grid-cols-1.gap-4.sm\\:grid-cols-2.lg\\:grid-cols-3";
      await driver.wait(
        until.elementLocated(By.css(productListSelector)),
        20000
      );
      const productList = await driver.findElement(By.css(productListSelector));
      expect(productList).toBeDefined();

      const productSelector = `${productListSelector} li a`;
      await driver.wait(until.elementLocated(By.css(productSelector)), 20000);
      const product = await driver.findElement(By.css(productSelector));
      await product.click();

      await driver.wait(until.urlContains("/products/"), 20000);
    } catch (error) {
      console.error("Test failed with error:", error);
      throw error;
    }
  }, 40000);
});
