import {test} from "@playwright/test";
import {LoginPageMethods} from "../page/pages-methods/login-methods.page";
import {ProductsPageMethods} from "../page/pages-methods/products-methods.page";
import {CartPageMethods} from "../page/pages-methods/cart-methods.page";
import {SupportFactory} from "../utils/support-factory.utils";
import {readFileSync} from "fs";

const storyParentId = "PW-0015";

const testDataTestCase_1 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0016.json`, "utf-8"));
test(`Test case: ${testDataTestCase_1["testCase"]} |
Description: ${testDataTestCase_1["testDescription"]} |
Tags: ${testDataTestCase_1["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_1;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const productsPageMethods = new ProductsPageMethods(page, test.info());
  const cartPageMethods = new CartPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
  const indexProductsToAdd = await productsPageMethods.productsRandomToAdd();
  const productsAddedToCart = await productsPageMethods.addProducts(indexProductsToAdd);
  await productsPageMethods.getHeaderComponent.clickShoppingCartButton();
  const cartProductList = await cartPageMethods.getCartProducts();
  await cartPageMethods.verifyProductsAdded(productsAddedToCart, cartProductList);
});

const testDataTestCase_2 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/PW-0017.json`, "utf-8"));
test(`Test case: ${testDataTestCase_2["testCase"]} |
Description: ${testDataTestCase_2["testDescription"]} |
Tags: ${testDataTestCase_2["tags"]}`, async ({page}) => {
  const data = await testDataTestCase_2;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const productsPageMethods = new ProductsPageMethods(page, test.info());
  const cartPageMethods = new CartPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());
  await supportFactory.addAnnotations(data);
  await loginPageMethods.goto();
  await loginPageMethods.login(data.loginPage);
  const productAddedToCart = await productsPageMethods.addSpecificProduct(data.productsPage);
  await productsPageMethods.getHeaderComponent.clickShoppingCartButton();
  const productCart = await cartPageMethods.getCartProducts();
  await cartPageMethods.verifyProductsAdded(productAddedToCart, productCart);
});
