import {Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";

export class CheckoutStepOnePageMethods {
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
    this._pageName = "checkout-stepone-locators.page";
  }

  public async enterFirstName(strValue: string): Promise<void> {
    await this._playwrightFactory.sendTypedKeys(this._pageName, "inputFirstName", strValue);
    await this._playwrightFactory.verifyValue(this._pageName, "inputFirstName", strValue);
  }

  public async enterLastName(strValue: string): Promise<void> {
    await this._playwrightFactory.sendTypedKeys(this._pageName, "inputLastName", strValue);
    await this._playwrightFactory.verifyValue(this._pageName, "inputLastName", strValue);
  }

  public async enterPostalCode(strValue: string): Promise<void> {
    await this._playwrightFactory.sendTypedKeys(this._pageName, "inputPostalCode", strValue);
    await this._playwrightFactory.verifyValue(this._pageName, "inputPostalCode", strValue);
  }

  public async clickButtonContinue(): Promise<void> {
    await this._playwrightFactory.click(this._pageName, "buttonContinue");
  }
}
