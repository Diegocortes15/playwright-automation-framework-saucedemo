import {test, Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";

export class LoginPageMethods {
  private readonly _page: Page;
  private readonly _testInfo: TestInfo;
  private readonly _playwrightFactory: PlaywrightFactory;
  private readonly _pageName: string;
  private readonly _url: string;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

  constructor(page: Page, testInfo: TestInfo) {
    this._page = page;
    this._testInfo = testInfo;
    this._playwrightFactory = new PlaywrightFactory(this._page, this._testInfo);
    this._pageName = "login-locators.page";
    this._url = "https://www.saucedemo.com/";
  }

  public async goto(): Promise<void> {
    await test.step(`⏩ Go to ${this._url}`, async (): Promise<void> => {
      await this._page.goto(this._url);
    });
  }

  public async enterUsername({username}): Promise<void> {
    await test.step(`⏩ Enter username: ${username}`, async (): Promise<void> => {
      await this._playwrightFactory.sendKeys(this._pageName, "inputUser", username);
    });
  }

  public async verifyUsername({username}): Promise<void> {
    await test.step(`🧪 Verify username: ${username}`, async (): Promise<void> => {
      await this._playwrightFactory.verifyValue(this._pageName, "inputUser", username);
    });
  }

  public async enterPassword({password}): Promise<void> {
    await test.step(`⏩ Enter passwrod`, async (): Promise<void> => {});
    await this._playwrightFactory.sendKeys(this._pageName, "inputPassword", password);
  }

  public async verifyPassword({password}): Promise<void> {
    await test.step(`🧪 Verify password`, async (): Promise<void> => {
      await this._playwrightFactory.verifyValue(this._pageName, "inputPassword", password);
    });
  }

  public async clickButtonSubmit(): Promise<void> {
    await test.step(`⏩ Click on submit button`, async (): Promise<void> => {
      await this._playwrightFactory.click(this._pageName, "buttonSubmit");
    });
  }

  public async login({username, password}): Promise<void> {
    await test.step(`⏩ Login with username: ${username}`, async (): Promise<void> => {
      await this.enterUsername({username});
      await this.enterPassword({password});
      await this._playwrightFactory.embedFullPageScreenshot("Login - Screenshot");
      await this.clickButtonSubmit();
    });
  }

  public async verifyURL(): Promise<void> {
    await test.step(`🧪 Verify URL: ${this._url}`, async (): Promise<void> => {
      await this._playwrightFactory.verifyURL(this._url);
    });
  }

  public async verifyValidationMessage({validationMessage}) {
    await test.step(`🧪 Verify validation message: ${validationMessage}`, async (): Promise<void> => {
      await this._playwrightFactory.verifyText(this._pageName, "errorMessage", validationMessage);
    });
  }

  public async verifyLoginView({testCase}) {
    await this._playwrightFactory.verifySnapshot(this._pageName, "loginContainer", [testCase, "loginContainer.png"]);
  }
}
