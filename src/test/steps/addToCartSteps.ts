import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { pageFixtures } from "../../hooks/pageFixtures";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 2 * 1000);

When("user search for a {string}", async function (book) {
  await pageFixtures.page.locator("input[type='search']").type(book);
  await pageFixtures.page.waitForTimeout(2000);
  await pageFixtures.page.locator("mat-option[role='option'] span").click();
});

When("user add the book to the cart", async function () {
  await pageFixtures.page.locator("button[color='primary']").click();
});

Then("the cart badge should get updated", async function () {
  const badgeCount = await pageFixtures.page.locator("span#mat-badge-content-0").textContent();
  expect(Number(badgeCount?.length)).toBeGreaterThan(0);
});
