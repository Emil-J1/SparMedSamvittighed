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

    // Opret en WebDriver-instantiering til Chrome-browseren
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    jest.setTimeout(20000); // Sæt en højere timeout for hele test-suiten
  }, 10000); // Sæt en timeout for beforeAll

  afterAll(async () => {
    if (driver) {
      // Tilføj en 3-sekunders forsinkelse, før browseren lukkes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await driver.quit(); // Luk browseren
    }
  }, 20000); // Sæt en timeout for afterAll

  it("should login, select a store, and then select a product", async () => {
    try {
      // Åbn login-siden
      console.log("Opened login page");
      await driver.get("http://localhost:3000/auth/login");

      // Udfør login
      await driver.findElement(By.name("email")).sendKeys("test@test.dk");
      await driver.findElement(By.name("password")).sendKeys("test5555");
      await driver.findElement(By.css("button[type='submit']")).click();
      console.log("Submitted login form");

      // Vent på navigation til siden for valg af butik
      await driver.wait(until.urlContains("/"), 30000);
      console.log("Navigated to store selection page");

      // Vent på at butikslinket er synligt og vælg en butik
      const storeLinkSelector = 'a[href^="stores/"]';
      await driver.wait(until.elementLocated(By.css(storeLinkSelector)), 60000);
      const storeElement = await driver.findElement(By.css(storeLinkSelector));
      const storeId = new URL(await storeElement.getAttribute("href")).pathname
        .split("/")
        .pop();
      await storeElement.click();

      // Vent på navigation til butikkens produktside
      await driver.wait(until.urlContains(`/stores/${storeId}`), 30000);
      console.log("Navigated to store's product page with ID:", storeId);

      // Vent på at produktlisten er synlig og verificer den
      const productListSelector =
        ".grid.grid-cols-1.gap-4.sm\\:grid-cols-2.lg\\:grid-cols-3";
      await driver.wait(
        until.elementLocated(By.css(productListSelector)),
        10000
      );
      const productList = await driver.findElement(By.css(productListSelector));
      expect(productList).toBeDefined();
      console.log("Verified product list is rendered");

      // Vent på at det første produkt er synligt og vælg et produkt
      const productSelector = `${productListSelector} li a`;
      await driver.wait(until.elementLocated(By.css(productSelector)), 30000);
      const product = await driver.findElement(By.css(productSelector));
      await product.click();
      console.log("Selected product");

      // Verificer navigation til produktets detaljeside
      await driver.wait(until.urlContains("/products/"), 30000);
      console.log("Navigated to product details page");
    } catch (error) {
      console.error("Test failed with error:", error);
      throw error; // Kast fejlen igen for at sikre, at Jest markerer testen som mislykket
    }
  }, 90000); // Sæt en timeout for denne specifikke test
});
