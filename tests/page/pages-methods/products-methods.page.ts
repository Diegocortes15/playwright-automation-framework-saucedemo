import {test, Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";
import {SupportFactory} from "../../utils/support-factory.utils";
import {HeaderComponentMethods} from "./components-methods/header.component";

export class ProductsPageMethods {
  private readonly _page: Page;
  private readonly _testInfo: TestInfo;
  private readonly _playwrightFactory: PlaywrightFactory;
  private readonly _supportFactory: SupportFactory;
  private readonly _headerComponent: HeaderComponentMethods;
  private readonly _pageName: string;
  private _indexProductsToAdd: number[];
  private itemsAdded: string;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

  constructor(page: Page, testInfo: TestInfo) {
    this._page = page;
    this._testInfo = testInfo;
    this._playwrightFactory = new PlaywrightFactory(this._page, this._testInfo);
    this._supportFactory = new SupportFactory(this._page, this._testInfo);
    this._headerComponent = new HeaderComponentMethods(this._page, this._testInfo);
    this._pageName = "products-locators.page";
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
    await test.step(`🧪 Verify current page title: ${expectedTitlePage}`, async (): Promise<void> => {
      await this._playwrightFactory.verifyText(this._pageName, "pageTitle", expectedTitlePage);
    });
  }

  public async sortProductsByVisibleText({sortProducts}): Promise<any> {
    await test.step(`⏩ Sort products by visible text: ${sortProducts}`, async (): Promise<void> => {
      await this._playwrightFactory.selectByVisibleText(this._pageName, "dropdownProductSort", sortProducts);
    });
  }

  public async expectedSortPriceLowToHigh(): Promise<string[]> {
    const orderedPrices = (await this.getPrices()).flat().sort((a: string, b: string) => +a - +b);
    return orderedPrices;
  }

  public async verifyPricesOrdered(actualPrices: string[], expectedPrices: string[]): Promise<any> {
    await test.step(`🧪 Verify prices ordered: ${expectedPrices}`, async (): Promise<void> => {
      await this._playwrightFactory.verifyCompareValues(
        JSON.stringify(actualPrices, null, 2),
        JSON.stringify(expectedPrices, null, 2)
      );
    });
  }

  public async productsRandomToAdd(): Promise<void> {
    const productListLength = await (
      await this._playwrightFactory.getElementSelector(this._pageName, "itemList")
    ).count();

    const newIndexProductList = new Set<number>();
    for (let index: number = 0; index < productListLength; index++) {
      newIndexProductList.add(await this._supportFactory.getRandomPositiveNumber(productListLength));
    }
    this._indexProductsToAdd = [...newIndexProductList];
  }

  public async addProducts(): Promise<void> {
    await test.step("⏩ Add products", async (): Promise<void> => {
      await this.productsRandomToAdd();
      const products: {itemName: string | null; price: string | null}[] = [];
      for (const index of this._indexProductsToAdd) {
        products.push({
          itemName: await this._playwrightFactory.getTextByIndex(this._pageName, "itemName", index),
          price: await this._playwrightFactory.getTextByIndex(this._pageName, "itemPrice", index),
        });
        await this._playwrightFactory.clickByIndex(this._pageName, "itemBtn", index);
      }
      this.itemsAdded = await this._supportFactory.jsonToString(products);
      await this._playwrightFactory.embedFullPageScreenshot("Products added");
    });
  }

  public async getItemsAdded(): Promise<string> {
    return this.itemsAdded;
  }

  public async addSpecificProduct({addProduct}): Promise<void> {
    await test.step(`⏩ Add product: ${addProduct}`, async (): Promise<void> => {
      const reformatProductName = addProduct.toLowerCase();
      const productList = await this._playwrightFactory.getAllTextContents(this._pageName, "itemNameList");
      const products: {itemName: string | null; price: string | null}[] = [];
      const indexProduct = productList.findIndex((productName) =>
        reformatProductName.includes(productName.toLowerCase())
      );
      await this._playwrightFactory.clickByIndex(this._pageName, "itemBtn", indexProduct);
      await this._playwrightFactory.embedFullPageScreenshot(addProduct);
      products.push({
        itemName: await this._playwrightFactory.getTextByIndex(this._pageName, "itemName", indexProduct),
        price: await this._playwrightFactory.getTextByIndex(this._pageName, "itemPrice", indexProduct),
      });
      this.itemsAdded = await this._supportFactory.jsonToString(products);
    });
  }
}
