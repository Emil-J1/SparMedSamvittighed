const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("@jest/globals");
const chrome = require("selenium-webdriver/chrome");

describe("E2E Test: Login, Select Store, Select Product", () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments("headless");
    options.addArguments("disable-gpu");
    options.addArguments("no-sandbox");
    options.addArguments("disable-dev-shm-usage");
    options.addArguments("remote-debugging-port=9222");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    jest.setTimeout(30000); // Increase timeout for the entire test suite
  }, 20000);

  afterAll(async () => {
    if (driver) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await driver.quit();
    }
  }, 20000);

  it("should login, select a store, and then select a product", async () => {
    try {
      console.log("Opened login page");
      await driver.get("http://localhost:3000/auth/login");

      await driver.findElement(By.name("email")).sendKeys("test@test.dk");
      await driver.findElement(By.name("password")).sendKeys("test5555");
      await driver.findElement(By.css("button[type='submit']")).click();
      console.log("Submitted login form");

      await driver.wait(until.urlContains("/"), 30000);
      console.log("Navigated to store selection page");

      const storeLinkSelector = 'a[href^="stores/"]';
      await driver.wait(until.elementLocated(By.css(storeLinkSelector)), 60000);

      // Adding an explicit wait to ensure element is visible and clickable
      await driver.wait(
        until.elementIsVisible(driver.findElement(By.css(storeLinkSelector))),
        10000
      );
      await driver.wait(
        until.elementIsEnabled(driver.findElement(By.css(storeLinkSelector))),
        10000
      );

      const storeElement = await driver.findElement(By.css(storeLinkSelector));
      const storeId = new URL(await storeElement.getAttribute("href")).pathname
        .split("/")
        .pop();
      await storeElement.click();

      await driver.wait(until.urlContains(`/stores/${storeId}`), 30000);
      console.log("Navigated to store's product page with ID:", storeId);

      const productListSelector =
        ".grid.grid-cols-1.gap-4.sm\\:grid-cols-2.lg\\:grid-cols-3";
      await driver.wait(
        until.elementLocated(By.css(productListSelector)),
        10000
      );
      const productList = await driver.findElement(By.css(productListSelector));
      expect(productList).toBeDefined();
      console.log("Verified product list is rendered");

      const productSelector = `${productListSelector} li a`;
      await driver.wait(until.elementLocated(By.css(productSelector)), 30000);
      const product = await driver.findElement(By.css(productSelector));
      await product.click();
      console.log("Selected product");

      await driver.wait(until.urlContains("/products/"), 30000);
      console.log("Navigated to product details page");
    } catch (error) {
      console.error("Test failed with error:", error);
      throw error;
    }
  }, 90000);
});
