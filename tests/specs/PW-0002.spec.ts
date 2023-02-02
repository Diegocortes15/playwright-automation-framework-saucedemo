import {test} from "@playwright/test";
import {LoginPageMethods} from "../page/pages-methods/login-methods.page";
import {ProductsPageMethods} from "../page/pages-methods/products-methods.page";
import {SupportFactory} from "../utils/support-factory.utils";
import {readFileSync} from "fs";

const storyParentId = "PW-0002";

const testDataTestCase_1 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0010.json`, "utf-8"));
test(`Test case: ${testDataTestCase_1["testCase"]} |
Description: ${testDataTestCase_1["testDescription"]} |
Tags: ${testDataTestCase_1["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_1;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const productsPageMethods = new ProductsPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
  await productsPageMethods.getHeaderComponent.logout();
  await loginPageMethods.verifyURL();
});

const testDataTestCase_2 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0011.json`, "utf-8"));
test(`Test case: ${testDataTestCase_2["testCase"]} |
Description: ${testDataTestCase_2["testDescription"]} |
Tags: ${testDataTestCase_2["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_2;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const productsPageMethods = new ProductsPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
  await productsPageMethods.getHeaderComponent.logout();
  await loginPageMethods.verifyURL();
});

const testDataTestCase_3 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0012.json`, "utf-8"));
test(`Test case: ${testDataTestCase_3["testCase"]} |
Description: ${testDataTestCase_3["testDescription"]} |
Tags: ${testDataTestCase_3["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_3;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const productsPageMethods = new ProductsPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
  await productsPageMethods.getHeaderComponent.logout();
  await loginPageMethods.verifyURL();
});
