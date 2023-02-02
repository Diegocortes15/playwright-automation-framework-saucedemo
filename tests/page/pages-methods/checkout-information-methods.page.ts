import {test, Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";

export class CheckoutInformationPageMethods {
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
    this._pageName = "checkout-information-locators.page";
  }

  public async enterFirstName({firstName}): Promise<void> {
    await test.step(`⏩ Enter first name: ${firstName}`, async (): Promise<void> => {
      await this._playwrightFactory.sendTypedKeys(this._pageName, "inputFirstName", firstName);
    });
  }

  public async verifyFirstName({firstName}): Promise<void> {
    await test.step(`🧪 Verify first name: ${firstName}`, async (): Promise<void> => {
      await this._playwrightFactory.verifyValue(this._pageName, "inputFirstName", firstName);
    });
  }

  public async enterLastName({lastName}): Promise<void> {
    await test.step(`⏩ Enter last name: ${lastName}`, async (): Promise<void> => {
      await this._playwrightFactory.sendTypedKeys(this._pageName, "inputLastName", lastName);
    });
  }

  public async verifyLastName({lastName}): Promise<void> {
    await test.step(`🧪 Verify last name: ${lastName}`, async (): Promise<void> => {
      await this._playwrightFactory.verifyValue(this._pageName, "inputLastName", lastName);
    });
  }

  public async enterPostalCode({postalCode}): Promise<void> {
    await test.step(`⏩ Enter postal code: ${postalCode}`, async (): Promise<void> => {
      await this._playwrightFactory.sendTypedKeys(this._pageName, "inputPostalCode", postalCode);
    });
  }

  public async verifyPostalCode({postalCode}): Promise<void> {
    await test.step(`🧪 Verify postal code: ${postalCode}`, async (): Promise<void> => {
      await this._playwrightFactory.verifyValue(this._pageName, "inputPostalCode", postalCode);
    });
  }

  public async clickButtonContinue(): Promise<void> {
    await test.step(`⏩ Click on continue button`, async (): Promise<void> => {
      await this._playwrightFactory.click(this._pageName, "buttonContinue");
    });
  }

  public async verifyCheckoutInformationView({testCase}) {
    await this._playwrightFactory.verifySnapshot(this._pageName, "checkoutInformationContainer", [
      testCase,
      "checkoutInformationContainer.png",
    ]);
  }
}
