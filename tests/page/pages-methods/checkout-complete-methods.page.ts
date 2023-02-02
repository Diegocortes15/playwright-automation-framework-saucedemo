import {test, Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";

export class CheckoutCompletePageMethods {
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
    this._pageName = "checkout-complete-locators.page";
  }

  public async verifyCurrentPage({titlePage: expectedTitlePage}) {
    await test.step(`🧪 Verify current page title: ${expectedTitlePage}`, async (): Promise<void> => {
      await this._playwrightFactory.verifyText(this._pageName, "pageTitle", expectedTitlePage);
    });
  }
}
