import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixtures } from "../../hooks/pageFixtures";

setDefaultTimeout(60 * 2 * 1000);

Given("User navigates to the application", async function () {
  await pageFixtures.page.goto("https://bookcart.azurewebsites.net/");
});

Given("User click on the login link", async function () {
  await pageFixtures.page.locator("//span[text()='Login']").click();
});

Given("User enter the username as {string}", async function (username) {
  await pageFixtures.page
    .locator("input[data-placeholder='Username']")
    .type(username);
});

Given("User enter the password as {string}", async function (password) {
  await pageFixtures.page.locator("input[type='password']").type(password);
});

When("User click on the login button", async function () {
  await pageFixtures.page.locator("button[color='primary']").click();
  await pageFixtures.page.waitForLoadState();
  await pageFixtures.page.waitForTimeout(2000);
});

Then("The Username should be displayed in homepage", async function () {
  const text = await pageFixtures.page
    .locator(
      "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]"
    )
    .textContent();
  console.log("Username: " + text);
});

When("Error message should be displayed", async function () {
  const failureMessage = pageFixtures.page.locator("mat-error[role='alert']");
  await expect(failureMessage).toBeVisible();
});
