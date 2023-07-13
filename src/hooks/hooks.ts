import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import {
  chromium,
  webkit,
  firefox,
  Browser,
  BrowserContext,
} from "@playwright/test";
import { pageFixtures } from "./pageFixtures";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
const jiraProjectKey = "LP";
const cyclekey = "LP-CY-Adhoc";

import * as config from "../../testconfig.json";
// const config = JSON.parse(fs.readFileSync("./testconfig.json", "utf8"));

BeforeAll(async function () {
  if (config.browser == "chrome") {
    browser = await chromium.launch({ headless: config.headless });
  }
});

Before(async function () {
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixtures.page = page;
});

After(async function ({ pickle, result }) {
  console.log(result?.status);

  //screenshot
  if (result?.status == Status.FAILED) {
    const img = pageFixtures.page.screenshot({
      path: `./test-result/screenshots/${pickle.name}.png`,
      type: "png",
    });
    this.attach(await img, "image/png");
  }

  await pageFixtures.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
