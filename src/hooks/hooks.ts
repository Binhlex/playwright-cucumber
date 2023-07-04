import { Before, After, BeforeAll, AfterAll, Status, AfterStep } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "@playwright/test";
import { pageFixtures } from "./pageFixtures";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixtures.page = page;
});

// AfterStep(async function ({ pickle, result }) {
//   const img = pageFixtures.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: "png" });
//   this.attach(await img, "image/png");
// });

After(async function ({ pickle, result }) {
  console.log(result?.status);

  //screenshot
  if (result?.status == Status.FAILED) {
    const img = pageFixtures.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: "png" });
    this.attach(await img, "image/png");
  }

  await pageFixtures.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
