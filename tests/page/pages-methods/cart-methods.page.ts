import {test, Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";
import {SupportFactory} from "../../utils/support-factory.utils";

export class CartPageMethods {
  private readonly _page: Page;
  private readonly _testInfo: TestInfo;
  private readonly _playwrightFactory: PlaywrightFactory;
  private readonly _supportFactory: SupportFactory;
  private readonly _pageName: string;
  public cartItemsAdded: string;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

  constructor(page: Page, testInfo: TestInfo) {
    this._page = page;
    this._testInfo = testInfo;
    this._playwrightFactory = new PlaywrightFactory(this._page, this._testInfo);
    this._supportFactory = new SupportFactory(this._page, this._testInfo);
    this._pageName = "cart-locators.page";
    this.cartItemsAdded;
  }

  public async clickCheckoutButton(): Promise<void> {
    await test.step("⏩ Click on checkout button", async (): Promise<void> => {
      await this._playwrightFactory.click(this._pageName, "buttonCheckout");
    });
  }

  public async getCartProducts(): Promise<string> {
    return await test.step("⏩ Get cart products", async (): Promise<string> => {
      const products: {itemName: string | null; price: string | null}[] = [];
      const productListLenght = await (
        await this._playwrightFactory.getElementSelector(this._pageName, "itemCartList")
      ).count();
      for (let index = 0; index < productListLenght; index++) {
        products.push({
          itemName: await this._playwrightFactory.getTextByIndex(this._pageName, "itemName", index),
          price: await this._playwrightFactory.getTextByIndex(this._pageName, "itemPrice", index),
        });
      }
      this.cartItemsAdded = await this._supportFactory.jsonToString(products);
      return this.cartItemsAdded;
    });
  }

  async verifyProductsAdded(expectedProductsAdded: string) {
    await test.step(`🧪 Verify products added ${expectedProductsAdded}`, async (): Promise<void> => {
      const products = await this.getCartProducts();
      await this._playwrightFactory.verifyCompareValues(products, expectedProductsAdded);
    });
  }
}
