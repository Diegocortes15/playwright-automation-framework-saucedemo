import {expect, test} from "@playwright/test";
import {LoginPageMethods} from "../page/pages-methods/login-methods.page";
import {SupportFactory} from "../utils/support-factory.utils";
import {readFileSync} from "fs";
import AxeBuilder from "@axe-core/playwright";

const storyParentId = "Accessibility-Testing";

const testDataTestCase_1 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-ACC-Login.json`, "utf-8"));
test(`Test case: ${testDataTestCase_1["testCase"]} |
Description: ${testDataTestCase_1["testDescription"]} |
Tags: ${testDataTestCase_1["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_1;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  const accessibilityScanResults = await new AxeBuilder({page}).analyze();
  await test.info().attach("Accessibility-scan-results", {
    body: JSON.stringify(accessibilityScanResults, null, 2),
    contentType: "application/json",
  });
  expect(accessibilityScanResults.violations).toEqual([]);
});
