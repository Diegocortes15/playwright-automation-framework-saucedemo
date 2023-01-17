import {Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../../utils/playwright-factory.utils";

export class HeaderComponentMethods {
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
    this._pageName = "components-objects/header.component";
  }

  async clickBurgerButton(): Promise<void> {
    await this._playwrightFactory.click(this._pageName, "burgerButton");
  }

  async openNavList(): Promise<void> {
    await this._playwrightFactory.click(this._pageName, "navList");
  }

  async clickLogoutButton(): Promise<void> {
    await this._playwrightFactory.click(this._pageName, "logoutButton");
  }

  async clickShoppingCartButton(): Promise<void> {
    await this._playwrightFactory.click(this._pageName, "shoppingCartButton");
  }
}
