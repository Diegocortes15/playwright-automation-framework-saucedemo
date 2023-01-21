import {test} from "@playwright/test";
import {LoginPageMethods} from "../page/pages-methods/login-methods.page";
import {ProductsPageMethods} from "../page/pages-methods/products-methods.page";
import {CartPageMethods} from "../page/pages-methods/cart-methods.page";
import {CheckoutStepOnePageMethods} from "../page/pages-methods/checkout-stepone-methods.page";
import {CheckoutStepTwoPageMethods} from "../page/pages-methods/checkout-steptwo-methods.page";
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
  const checkoutStepOnePageMethods = new CheckoutStepOnePageMethods(page, test.info());
  const checkoutStepTwoPageMethods = new CheckoutStepTwoPageMethods(page, test.info());
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
  await checkoutStepOnePageMethods.enterFirstName(formData);
  await checkoutStepOnePageMethods.verifyFirstName(formData);
  await checkoutStepOnePageMethods.enterLastName(formData);
  await checkoutStepOnePageMethods.verifyLastName(formData);
  await checkoutStepOnePageMethods.enterPostalCode(formData);
  await checkoutStepOnePageMethods.verifyPostalCode(formData);
  await checkoutStepOnePageMethods.clickButtonContinue();
  await checkoutStepTwoPageMethods.clickButtonFinish();
  await checkoutCompletePageMethods.verifyCurrentPage(data.checkoutCompletePage);
});
