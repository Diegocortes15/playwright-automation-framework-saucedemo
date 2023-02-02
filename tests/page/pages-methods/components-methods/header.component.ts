import {test, Page, TestInfo} from "@playwright/test";
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
    await test.step("⏩ Click on burger button", async (): Promise<void> => {
      await this._playwrightFactory.click(this._pageName, "burgerButton");
    });
  }

  async openNavList(): Promise<void> {
    await test.step("⏩ Open navigation list", async (): Promise<void> => {
      await this._playwrightFactory.click(this._pageName, "navList");
    });
  }

  async clickLogoutButton(): Promise<void> {
    await test.step("⏩ Click on logout button", async (): Promise<void> => {
      await this._playwrightFactory.click(this._pageName, "logoutButton");
    });
  }

  async clickShoppingCartButton(): Promise<void> {
    await test.step("⏩ Click on shopping cart button", async (): Promise<void> => {
      await this._playwrightFactory.click(this._pageName, "shoppingCartButton");
    });
  }

  async logout(): Promise<void> {
    await test.step("⏩ Logout", async (): Promise<void> => {
      this.clickBurgerButton();
      this.clickLogoutButton();
    });
  }
}
