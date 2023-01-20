import {Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";

export class CartPageMethods {
  private readonly _page: Page;
  private readonly _testInfo: TestInfo;
  private readonly _playwrightFactory: PlaywrightFactory;
  private readonly _pageName: string;
  public cartItemsAdded: {itemName: string | null; price: string | null}[];

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

  constructor(page: Page, testInfo: TestInfo) {
    this._page = page;
    this._testInfo = testInfo;
    this._playwrightFactory = new PlaywrightFactory(this._page, this._testInfo);
    this._pageName = "cart-locators.page";
    this.cartItemsAdded = [];
  }

  public async clickCheckoutButton(): Promise<void> {
    await this._playwrightFactory.click(this._pageName, "buttonCheckout");
  }

  public async getCartProducts(): Promise<void> {
    const productListLenght = await (
      await this._playwrightFactory.getElementSelector(this._pageName, "itemCartList")
    ).count();
    for (let index = 0; index < productListLenght; index++) {
      this.cartItemsAdded.push({
        itemName: await this._playwrightFactory.getTextByIndex(this._pageName, "itemName", index),
        price: await this._playwrightFactory.getTextByIndex(this._pageName, "itemPrice", index),
      });
    }
  }

  async verifyProductsAdded(expectedProductsAdded: object) {
    await this.getCartProducts();
    await this._playwrightFactory.verifyCompareValues(expectedProductsAdded, this.cartItemsAdded);
  }
}
