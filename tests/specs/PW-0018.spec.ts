import {test} from "@playwright/test";
import {LoginPageMethods} from "../page/pages-methods/login-methods.page";
import {ProductsPageMethods} from "../page/pages-methods/products-methods.page";
import {CartPageMethods} from "../page/pages-methods/cart-methods.page";
import {CheckoutInformationPageMethods} from "../page/pages-methods/checkout-information-methods.page";
import {CheckoutOverviewPageMethods} from "../page/pages-methods/checkout-overview-methods.page";
import {CheckoutCompletePageMethods} from "../page/pages-methods/checkout-complete-methods.page";
import {SupportFactory} from "../utils/support-factory.utils";
import {readFileSync} from "fs";

const storyParentId = "PW-0018";

const testDataTestCase_1 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0019.json`, "utf-8"));
test(`Test case: ${testDataTestCase_1["testCase"]} |
Description: ${testDataTestCase_1["testDescription"]} |
Tags: ${testDataTestCase_1["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_1;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const productsPageMethods = new ProductsPageMethods(page, test.info());
  const cartPageMethods = new CartPageMethods(page, test.info());
  const checkoutInformationPageMethods = new CheckoutInformationPageMethods(page, test.info());
  const checkoutOverviewPageMethods = new CheckoutOverviewPageMethods(page, test.info());
  const checkoutCompletePageMethods = new CheckoutCompletePageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
  await productsPageMethods.addProducts();
  const productsAddedToCart = await productsPageMethods.getItemsAdded();
  await productsPageMethods.getHeaderComponent.clickShoppingCartButton();
  await cartPageMethods.verifyProductsAdded(productsAddedToCart);
  await cartPageMethods.clickCheckoutButton();
  const formData = {
    firstName: await supportFactory.getRandomFirstName(),
    lastName: await supportFactory.getRandomLastName(),
    postalCode: await supportFactory.getRandomZip(),
  };
  await checkoutInformationPageMethods.enterFirstName(formData);
  await checkoutInformationPageMethods.verifyFirstName(formData);
  await checkoutInformationPageMethods.enterLastName(formData);
  await checkoutInformationPageMethods.verifyLastName(formData);
  await checkoutInformationPageMethods.enterPostalCode(formData);
  await checkoutInformationPageMethods.verifyPostalCode(formData);
  await checkoutInformationPageMethods.clickButtonContinue();
  await checkoutOverviewPageMethods.clickButtonFinish();
  await checkoutCompletePageMethods.verifyCurrentPage(data.checkoutCompletePage);
});

const testDataTestCase_2 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0023.json`, "utf-8"));
test(`Test case: ${testDataTestCase_2["testCase"]} |
Description: ${testDataTestCase_2["testDescription"]} |
Tags: ${testDataTestCase_2["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_2;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const productsPageMethods = new ProductsPageMethods(page, test.info());
  const cartPageMethods = new CartPageMethods(page, test.info());
  const checkoutInformationPageMethods = new CheckoutInformationPageMethods(page, test.info());
  const checkoutOverviewPageMethods = new CheckoutOverviewPageMethods(page, test.info());
  const checkoutCompletePageMethods = new CheckoutCompletePageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
  await productsPageMethods.addProducts();
  const productsAddedToCart = await productsPageMethods.getItemsAdded();
  await productsPageMethods.getHeaderComponent.clickShoppingCartButton();
  await cartPageMethods.verifyProductsAdded(productsAddedToCart);
  await cartPageMethods.clickCheckoutButton();
  await checkoutInformationPageMethods.enterFirstName(data.checkoutInformationPage);
  await checkoutInformationPageMethods.verifyFirstName(data.checkoutInformationPage);
  await checkoutInformationPageMethods.enterLastName(data.checkoutInformationPage);
  await checkoutInformationPageMethods.verifyLastName(data.checkoutInformationPage);
  await checkoutInformationPageMethods.enterPostalCode(data.checkoutInformationPage);
  await checkoutInformationPageMethods.verifyPostalCode(data.checkoutInformationPage);
  await checkoutInformationPageMethods.clickButtonContinue();
  await checkoutOverviewPageMethods.clickButtonFinish();
  await checkoutCompletePageMethods.verifyCurrentPage(data.checkoutCompletePage);
});
