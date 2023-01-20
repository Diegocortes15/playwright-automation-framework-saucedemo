import {Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";
import {SupportFactory} from "../../utils/support-factory.utils";
import {HeaderComponentMethods} from "./components-methods/header.component";

export class ProductsPageMethods {
  private readonly _page: Page;
  private readonly _testInfo: TestInfo;
  private readonly _playwrightFactory: PlaywrightFactory;
  private readonly _SupportFactory: SupportFactory;
  private readonly _headerComponent: HeaderComponentMethods;
  private readonly _pageName: string;
  private _indexProductsToAdd: number[];
  public itemsAdded: {itemName: string | null; price: string | null}[];

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

  constructor(page: Page, testInfo: TestInfo) {
    this._page = page;
    this._testInfo = testInfo;
    this._playwrightFactory = new PlaywrightFactory(this._page, this._testInfo);
    this._SupportFactory = new SupportFactory(this._page, this._testInfo);
    this._headerComponent = new HeaderComponentMethods(this._page, this._testInfo);
    this._pageName = "products-locators.page";
    this.itemsAdded = [];
  }

  public get getHeaderComponent(): HeaderComponentMethods {
    return this._headerComponent;
  }

  public async getPrices(): Promise<string[]> {
    const prices = await Promise.all(
      (
        await this._playwrightFactory.getAllTextContents(this._pageName, "itemPriceList")
      ).map(async (price: string): Promise<string> => price.slice(1))
    );
    return prices;
  }

  public async verifyCurrentPage({titlePage: expectedTitlePage}) {
    await this._playwrightFactory.verifyText(this._pageName, "titlePage", expectedTitlePage);
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

  public async productsRandomToAdd(): Promise<void> {
    const productListLenght = await (
      await this._playwrightFactory.getElementSelector(this._pageName, "itemList")
    ).count();

    const newIndexProductList = new Set<number>();
    for (let index: number = 0; index < productListLenght; index++) {
      newIndexProductList.add(await this._SupportFactory.getRandomPositiveNumber(productListLenght));
    }
    this._indexProductsToAdd = [...newIndexProductList];
  }

  public async addProducts(): Promise<void> {
    await this.productsRandomToAdd();
    for (const index of this._indexProductsToAdd) {
      this.itemsAdded.push({
        itemName: await this._playwrightFactory.getTextByIndex(this._pageName, "itemName", index),
        price: await this._playwrightFactory.getTextByIndex(this._pageName, "itemPrice", index),
      });
      await this._playwrightFactory.clickByIndex(this._pageName, "itemBtn", index);
    }
    await this._playwrightFactory.embedScreenshot("Products added");
  }

  public async getItemsAdded(): Promise<{itemName: string | null; price: string | null}[]> {
    return this.itemsAdded;
  }

  public async addSpecificProduct({addProduct}): Promise<void> {
    const reformatProductName = addProduct.toLowerCase();
    const productList = await this._playwrightFactory.getAllTextContents(this._pageName, "itemNameList");
    const indexProduct = productList.findIndex((productName) =>
      reformatProductName.includes(productName.toLowerCase())
    );
    await this._playwrightFactory.clickByIndex(this._pageName, "itemBtn", indexProduct);
    await this._playwrightFactory.embedScreenshot(addProduct);
    this.itemsAdded.push({
      itemName: await this._playwrightFactory.getTextByIndex(this._pageName, "itemName", indexProduct),
      price: await this._playwrightFactory.getTextByIndex(this._pageName, "itemPrice", indexProduct),
    });
  }
}
