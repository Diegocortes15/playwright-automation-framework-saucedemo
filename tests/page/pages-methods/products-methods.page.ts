import {Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";
import {HeaderComponentMethods} from "./components-methods/header.component";

export class ProductsPageMethods {
  private readonly _page: Page;
  private readonly _testInfo: TestInfo;
  private readonly _playwrightFactory: PlaywrightFactory;
  private readonly _pageName: string;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

  constructor(page: Page, testInfo: TestInfo) {
    this._page = page;
    this._testInfo = testInfo;
    this._playwrightFactory = new PlaywrightFactory(this._page, this._testInfo);
    this._pageName = "products-locators.page";
  }

  public get getHeaderComponent(): HeaderComponentMethods {
    return new HeaderComponentMethods(this._page, this._testInfo);
  }

  public async getPrices(): Promise<string[]> {
    const prices = await Promise.all(
      (
        await this._playwrightFactory.getAllTextContents(this._pageName, "itemPriceList")
      ).map(async (price: string): Promise<string> => price.slice(1))
    );
    return prices;
  }

  public async sortProductsByVisibleText({sortProducts}): Promise<any> {
    await this._playwrightFactory.selectByVisibleText(this._pageName, "dropdownProductSort", sortProducts);
  }

  public async sortPricesNotSortedLowToHigh(): Promise<string[]> {
    const orderedPrices = (await this.getPrices()).flat().sort((a: string, b: string) => +a - +b);
    return orderedPrices;
  }

  public async verifyPricesOrdered(actualPrices: string[], expectedPrices: string[]): Promise<any> {
    await this._playwrightFactory.verifyCompareValues(actualPrices, expectedPrices);
  }
}
