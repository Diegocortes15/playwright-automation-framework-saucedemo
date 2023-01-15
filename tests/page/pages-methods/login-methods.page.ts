import {Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";

export class LoginPageMethods {
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
    this._pageName = "login-locators.page";
  }

  async goto(): Promise<void> {
    await this._page.goto("/");
  }

  async enterUsername(strValue: string): Promise<void> {
    await this._playwrightFactory.sendTypedKeys(this._pageName, "inputUser", strValue);
    await this._playwrightFactory.verifyValue(this._pageName, "inputUser", strValue);
  }

  async enterPassword(strValue: string): Promise<void> {
    await this._playwrightFactory.sendTypedKeys(this._pageName, "inputPassword", strValue);
    await this._playwrightFactory.verifyValue(this._pageName, "inputPassword", strValue);
  }

  async clickButtonSubmit(): Promise<void> {
    await this._playwrightFactory.click(this._pageName, "buttonSubmit");
  }

  async login(loginPageData: any): Promise<void> {
    const {username} = loginPageData;
    const {password} = loginPageData;
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickButtonSubmit();
    await this._playwrightFactory.embedScreenshot("Login - Screenshot");
  }
}
