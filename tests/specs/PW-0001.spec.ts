import {test} from "@playwright/test";
import {LoginPageMethods} from "../page/pages-methods/login-methods.page";
import {SupportFactory} from "../utils/support-factory.utils";
import {readFileSync} from "fs";

const storyParentId = "PW-0001";

const testDataTestCase_1 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0003.json`, "utf-8"));
test(`Test case: ${testDataTestCase_1["testCase"]} |
Description: ${testDataTestCase_1["testDescription"]} |
Tags: ${testDataTestCase_1["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_1;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
});

const testDataTestCase_2 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0004.json`, "utf-8"));
test(`Test case: ${testDataTestCase_2["testCase"]} |
Description: ${testDataTestCase_2["testDescription"]} |
Tags: ${testDataTestCase_2["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_2;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
});

const testDataTestCase_3 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0005.json`, "utf-8"));
test(`Test case: ${testDataTestCase_3["testCase"]} |
Description: ${testDataTestCase_3["testDescription"]} |
Tags: ${testDataTestCase_3["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_3;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
});

const testDataTestCase_4 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0006.json`, "utf-8"));
test(`Test case: ${testDataTestCase_4["testCase"]} |
Description: ${testDataTestCase_4["testDescription"]} |
Tags: ${testDataTestCase_4["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_4;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
});

const testDataTestCase_5 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0007.json`, "utf-8"));
test(`Test case: ${testDataTestCase_5["testCase"]} |
Description: ${testDataTestCase_5["testDescription"]} |
Tags: ${testDataTestCase_5["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_5;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
});

const testDataTestCase_6 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0008.json`, "utf-8"));
test(`Test case: ${testDataTestCase_6["testCase"]} |
Description: ${testDataTestCase_6["testDescription"]} |
Tags: ${testDataTestCase_6["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_6;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
});
