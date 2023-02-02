import {test, expect, Page, TestInfo, Locator} from "@playwright/test";
import {readFileSync} from "fs";

export class PlaywrightFactory {
  private readonly _page: Page;
  private readonly _testInfo: TestInfo;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

  constructor(page: Page, testInfo: TestInfo) {
    this._page = page;
    this._testInfo = testInfo;
  }

  public async getElement(filePath: string, elementName: string): Promise<any> {
    const rawdata: any = readFileSync(`./tests/page/pages-objects/${filePath}.json`);
    const data: any = JSON.parse(rawdata);
    return data.locators[elementName];
  }

  public async getElementSelector(filePath: string, elementName: string): Promise<Locator> {
    const rawdata: any = readFileSync(`./tests/page/pages-objects/${filePath}.json`);
    const data: any = JSON.parse(rawdata);
    return this._page.locator(data.locators[elementName].selector);
  }

  public async click(filePath: string, elementName: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is clicked`, async (): Promise<void> => {
      await this._page.locator(element.selector).scrollIntoViewIfNeeded();
      await this._page.click(element.selector);
      await this._testInfo.attach(`🐾 "${element.description}" is clicked`, {
        body: `🐾 "${element.description}" is clicked`,
        contentType: "text/plain",
      });
    });
  }

  public async clickByIndex(filePath: string, elementName: string, index: number): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description} ${index}" is clicked`, async (): Promise<void> => {
      await this._page.locator(element.selector.replace("${value}", index)).scrollIntoViewIfNeeded();
      await this._page.click(element.selector.replace("${value}", index));
      await this._testInfo.attach(`🐾 "${element.description}" is clicked`, {
        body: `🐾 "${element.description} ${index}" is clicked`,
        contentType: "text/plain",
      });
    });
  }

  public async clickAllIfExists(filePath: string, elementName: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is clicked`, async (): Promise<void> => {
      let booleanFlag: number = await this._page.locator(element.selector).count();
      while (booleanFlag > 0) {
        await this._page.click(element.selector);
        booleanFlag = await this._page.locator(element.selector).count();
      }
      await this._testInfo.attach(`🐾 "${element.description}" is clicked`, {
        body: `🐾 "${element.description}" is clicked`,
        contentType: "text/plain",
      });
    });
  }

  public async selectRadio(filePath: string, elementName: string, strValue: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    const elementToClick: string = await element.selector.replace("${value}", strValue);
    await test.step(`🐾 "${element.description}" is selected with "${strValue}"`, async (): Promise<void> => {
      await this._page.click(elementToClick);
      await this._testInfo.attach(`🐾 "${element.description}" is selected with "${strValue}"`, {
        body: `🐾 "${element.description}" is selected with "${strValue}"`,
        contentType: "text/plain",
      });
    });
  }

  public async sendKeys(filePath: string, elementName: string, strValue: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is entered with "${strValue}"`, async (): Promise<void> => {
      await this._page.locator(element.selector).scrollIntoViewIfNeeded();
      await this._page.fill(element.selector, strValue);
      await this._testInfo.attach(`🐾 "${element.description}" is entered with "${strValue}"`, {
        body: `🐾 "${element.description}" is entered with "${strValue}"`,
        contentType: "text/plain",
      });
    });
  }

  public async sendTypedKeys(filePath: string, elementName: string, strValue: string): Promise<void>;
  public async sendTypedKeys(filePath: string, elementName: string, strValue: string, setback: number): Promise<void>;
  public async sendTypedKeys(filePath: string, elementName: string, strValue: string, setback?: number): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is typed with "${strValue}"`, async (): Promise<void> => {
      await this._page.locator(element.selector).scrollIntoViewIfNeeded();
      if (!setback) {
        await this._page.type(element.selector, strValue);
      } else {
        await this._page.type(element.selector, strValue, {delay: setback});
      }
      await this._testInfo.attach(`🐾 "${element.description}" is typed with "${strValue}"`, {
        body: `🐾 "${element.description}" is typed with "${strValue}"`,
        contentType: "text/plain",
      });
    });
  }

  public async pressKey(filePath: string, elementName: string, strValue: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is pressed with "${strValue}"`, async (): Promise<void> => {
      await this._page.locator(element.selector).scrollIntoViewIfNeeded();
      await this._page.press(element.selector, strValue);
      await this._testInfo.attach(`🐾 "${element.description}" is pressed with "${strValue}"`, {
        body: `🐾 "${element.description}" is pressed with "${strValue}"`,
        contentType: "text/plain",
      });
    });
  }

  public async selectByVisibleText(filePath: string, elementName: string, strValue: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is selected with option "${strValue}"`, async (): Promise<void> => {
      await this._page.selectOption(element.selector, {label: strValue});
      await this._testInfo.attach(`🐾 "${element.description}" is selected with option "${strValue}"`, {
        body: `🐾 "${element.description}" is selected with option "${strValue}"`,
        contentType: "text/plain",
      });
    });
  }

  public async selectByValue(filePath: string, elementName: string, strValue: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is selected with option "${strValue}"`, async (): Promise<void> => {
      await this._page.selectOption(element.selector, strValue);
      await this._testInfo.attach(`🐾 "${element.description}" is selected with option "${strValue}"`, {
        body: `🐾 "${element.description}" is selected with option "${strValue}"`,
        contentType: "text/plain",
      });
    });
  }

  public async clearText(filePath: string, elementName: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is erased`, async (): Promise<void> => {
      await this.click(filePath, elementName);
      await this.pressKey(filePath, elementName, "Control+A");
      await this.pressKey(filePath, elementName, "Backspace");
      await this.click(filePath, elementName);
    });
  }

  public async waitForDomLoad() {
    await this._page.waitForLoadState("domcontentloaded");
  }

  public async waitForNetworkIdle() {
    await this._page.waitForLoadState("networkidle");
  }

  public async embedFullPageScreenshot(description: string): Promise<void> {
    await test.step(`📸 "${description} - Full page screenshot`.trim(), async (): Promise<void> => {
      const screenshot: Buffer = await this._page.screenshot({fullPage: true});
      await this._testInfo.attach(`📸 ${description}`, {
        body: screenshot,
        contentType: "image/jpg",
      });
    });
  }

  public async embedElementScreenshot(filePath: string, elementName: string): Promise<void>;
  public async embedElementScreenshot(filePath: string, elementName: string, description: string): Promise<void>;
  public async embedElementScreenshot(filePath: string, elementName: string, description?: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(
      `📸 "${element.description}" ${description} - Element screenshot`.trim(),
      async (): Promise<void> => {
        const screenshot: Buffer = await this._page.locator(element.selector).screenshot();
        await this._testInfo.attach(`📸 ${element.description} ${description}`.trim(), {
          body: screenshot,
          contentType: "image/jpg",
        });
      }
    );
  }

  public async verifyHidden(filePath: string, elementName: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🧪 Verifying if "${element.description}" is Hidden`, async (): Promise<void> => {
      const booleanFlag: Boolean = await this._page.isHidden(element.selector);
      if (booleanFlag) {
        await this.embedFullPageScreenshot(`✅ "${element.description}" is Hidden as expected - Screenshot`);
        await this._testInfo.attach(`✅ "${element.description}" is Hidden as expected`, {
          body: `✅ "${element.description}" is Hidden as expected`,
          contentType: "text/plain",
        });
      } else {
        await this.embedFullPageScreenshot(`💥 "${element.description}" is NOT Hidden - Failure - Screenshot`);
        await this._testInfo.attach(`💥 "${element.description}" is NOT Hidden - Failure`, {
          body: `💥 "${element.description}" is NOT Hidden - Failure`,
          contentType: "text/plain",
        });
      }
      await expect.soft(this._page.locator(element.selector)).toBeHidden();
    });
  }

  public async verifyVisible(filePath: string, elementName: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🧪 Verifying if "${element.description}" is Visible`, async (): Promise<void> => {
      const booleanFlag: Boolean = await this._page.isVisible(element.selector);
      if (booleanFlag) {
        await this.embedFullPageScreenshot(`✅ "${element.description}" is Visible as expected - Screenshot`);
        await this._testInfo.attach(`✅ "${element.description}" is Visible as expected`, {
          body: `✅ "${element.description}" is Visible as expected`,
          contentType: "text/plain",
        });
      } else {
        await this.embedFullPageScreenshot(`💥 "${element.description}" is NOT Visible - Failure - Screenshot`);
        await this._testInfo.attach(`💥 "${element.description}" is NOT Visible - Failure`, {
          body: `💥 "${element.description}" is NOT Visible - Failure`,
          contentType: "text/plain",
        });
      }
      await expect.soft(this._page.locator(element.selector)).toBeVisible();
    });
  }

  public async verifyValue(filePath: string, elementName: string, strExpectedValue: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🧪 Verifying if "${element.description}" value is displayed as expected`, async (): Promise<void> => {
      const actualValue: string = await this._page.inputValue(element.selector);
      if (actualValue == strExpectedValue) {
        await this.embedFullPageScreenshot(
          `✅ "${element.description}" value is displayed as Expected = "${strExpectedValue}" ; Actual = "${actualValue}" - Screenshot`
        );
        await this._testInfo.attach(
          `✅ "${element.description}" value is displayed as Expected = "${strExpectedValue}" ; Actual = "${actualValue}"`,
          {
            body: `✅ "${element.description}" value is displayed as expected = "${strExpectedValue}" ; actual = "${actualValue}"`,
            contentType: "text/plain",
          }
        );
      } else {
        await this.embedFullPageScreenshot(
          `💥 "${element.description}" value is NOT displayed. Expected = "${strExpectedValue}" ; Actual = "${actualValue}" - Screenshot`
        );
        await this._testInfo.attach(
          `💥 "${element.description}" value is NOT displayed. Expected = "${strExpectedValue}" ; Actual = "${actualValue}"`,
          {
            body: `💥 "${element.description}" value is NOT displayed as expected = "${strExpectedValue}" ; actual = "${actualValue}"`,
            contentType: "text/plain",
          }
        );
      }
      await expect.soft(this._page.locator(element.selector)).toHaveValue(strExpectedValue);
    });
  }

  public async verifyDisable(filePath: string, elementName: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🧪 Verifying if "${element.description}" is Disable`, async (): Promise<void> => {
      const booleanFlag: Boolean = await this._page.isDisabled(element.selector);
      if (booleanFlag) {
        await this.embedFullPageScreenshot(`✅ "${element.description}" is Disabled as Expected - Screenshot`);
        await this._testInfo.attach(`✅ "${element.description}" is Disabled as Expected`, {
          body: `✅ "${element.description}" is Disabled as Expected`,
          contentType: "text/plain",
        });
      } else {
        await this.embedFullPageScreenshot(`💥 "${element.description}" is NOT Disabled - Failure - Screenshot`);
        await this._testInfo.attach(`💥 "${element.description}" is NOT Disabled - Failure`, {
          body: `💥 "${element.description}" is NOT Disabled - Failure`,
          contentType: "text/plain",
        });
      }
      await expect.soft(this._page.locator(element.selector)).toBeDisabled();
    });
  }

  public async verifyEnabled(filePath: string, elementName: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🧪 Verifying if "${element.description}" is Enabled`, async (): Promise<void> => {
      const booleanFlag: Boolean = await this._page.isEnabled(element.selector);
      if (booleanFlag) {
        await this.embedFullPageScreenshot(`✅ "${element.description}" is Enabled as Expected - Screenshot`);
        await this._testInfo.attach(`✅ "${element.description}" is Enabled as Expected`, {
          body: `✅ "${element.description}" is Enabled as Expected`,
          contentType: "text/plain",
        });
      } else {
        await this.embedFullPageScreenshot(`💥 "${element.description}" is NOT Enabled - Failure - Screenshot`);
        await this._testInfo.attach(`💥 "${element.description}" is NOT Enabled - Failure`, {
          body: `💥 "${element.description}" is NOT Enabled - Failure`,
          contentType: "text/plain",
        });
      }
      await expect.soft(this._page.locator(element.selector)).toBeEnabled();
    });
  }

  public async verifySnapshot(filePath: string, elementName: string, screenshotPath: any): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🧪 Verifying visual validation of "${element.description}"`, async (): Promise<void> => {
      await expect.soft(this._page.locator(element.selector)).toHaveScreenshot(screenshotPath);
      await this.embedElementScreenshot(filePath, elementName, "Actual Screenshot - Visual Validation");
    });
  }

  public async verifyChecked(filePath: string, elementName: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🧪 Verifying if "${element.description}" is Checked`, async (): Promise<void> => {
      const booleanFlag: Boolean = await this._page.isChecked(element.selector);
      if (booleanFlag) {
        await this.embedFullPageScreenshot(`✅ "${element.description}" is Checked as Expected - Screenshot`);
        await this._testInfo.attach(`✅ "${element.description}" is Checked as Expected`, {
          body: `✅ "${element.description}" is Checked as Expected`,
          contentType: "text/plain",
        });
      } else {
        await this.embedFullPageScreenshot(`💥 "${element.description}" is NOT Checked - Failure`);
        await this._testInfo.attach(`💥 "${element.description}" is NOT Checked - Failure`, {
          body: `💥 "${element.description}" is NOT Checked - Failure`,
          contentType: "text/plain",
        });
      }
      await expect.soft(this._page.locator(element.selector)).toBeChecked();
    });
  }

  public async verifyURL(expectedURL: string) {
    await test.step(`🧪 Verifying that the user is in the url "${expectedURL}"`, async (): Promise<void> => {
      await this._page.waitForURL(expectedURL);
      const actualUrl = this._page.url();
      if (actualUrl == expectedURL) {
        await this.embedFullPageScreenshot(
          `✅ "URL page is as Expected = "${expectedURL}" ; Actual = "${actualUrl}" - Screenshot`
        );
        await this._testInfo.attach(`✅ "URL page is as Expected = "${expectedURL}" ; Actual = "${actualUrl}"`, {
          body: `✅ "URL page is as Expected = "${expectedURL}" ; Actual = "${actualUrl}"`,
          contentType: "text/plain",
        });
      } else {
        await this.embedFullPageScreenshot(
          `💥 "URL page is NOT as Expected = "${expectedURL}" ; Actual = "${actualUrl}" - Screenshot`
        );
        await this._testInfo.attach(`💥 "URL page is NOT. Expected = "${expectedURL}" ; Actual = "${actualUrl}"`, {
          body: `💥 "URL page is NOT as Expected = "${expectedURL}" ; Actual = "${actualUrl}"`,
          contentType: "text/plain",
        });
      }
      await expect.soft(this._page).toHaveURL(expectedURL);
    });
  }

  public async getAllTextContents(filePath: string, elementName: string): Promise<string[]> {
    const element: any = await this.getElement(filePath, elementName);
    const elementTextContent = await test.step(`🐾 "${element.description}" text is obtained`, async (): Promise<
      string[]
    > => {
      return this._page.locator(element.selector).allTextContents();
    });
    return elementTextContent;
  }

  public async getTextByIndex(filePath: string, elementName: string, index: number): Promise<string | null> {
    const element: any = await this.getElement(filePath, elementName);
    const elementTextContent =
      await test.step(`🐾 "${element.description} ${index}" text is obtained`, async (): Promise<string | null> => {
        return this._page.locator(element.selector.replace("${value}", index)).textContent();
      });
    return elementTextContent;
  }

  public async getText(filePath: string, elementName: string): Promise<string | null> {
    const element: any = await this.getElement(filePath, elementName);
    const elementTextContent = await test.step(`🐾 "${element.description}" text is obtained`, async (): Promise<
      string | null
    > => {
      return this._page.locator(element.selector).textContent();
    });
    return elementTextContent;
  }

  public async verifyCompareValues(strActualValue: string, strExpectedValue: string): Promise<void> {
    await test.step(`🧪 Verifying that ${strActualValue} match with ${strExpectedValue}`, async (): Promise<void> => {
      if (strActualValue == strExpectedValue) {
        await this.embedFullPageScreenshot(
          `✅ "Value is displayed as Expected = "${strExpectedValue}" ; Actual = "${strActualValue}" - Screenshot`
        );
        await this._testInfo.attach(
          `✅ "Value is displayed as Expected = "${strExpectedValue}" ; Actual = "${strActualValue}"`,
          {
            body: `✅ "Value is displayed as Expected = "${strExpectedValue}" ; Actual = "${strActualValue}"`,
            contentType: "text/plain",
          }
        );
      } else {
        await this.embedFullPageScreenshot(
          `💥 "Value is NOT displayed. Expected = "${strExpectedValue}" ; Actual = "${strActualValue}" - Screenshot`
        );
        await this._testInfo.attach(
          `💥 "Value is NOT displayed. Expected = "${strExpectedValue}" ; Actual = "${strActualValue}"`,
          {
            body: `💥 "Value is NOT displayed as Expected = "${strExpectedValue}" ; Actual = "${strActualValue}"`,
            contentType: "text/plain",
          }
        );
      }
      expect.soft(strActualValue).toEqual(strExpectedValue);
    });
  }

  public async verifyText(filePath: string, elementName: string, strExpectedText: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🧪 Verifying if "${element.description}" text is displayed as expected`, async (): Promise<void> => {
      const actualText: string | null = await this.getText(filePath, elementName);
      if (actualText?.includes(strExpectedText)) {
        await this.embedFullPageScreenshot(
          `✅ "${element.description}" text is displayed as Expected = "${strExpectedText}" ; Actual = "${actualText}" - Screenshot`
        );
        await this._testInfo.attach(
          `✅ "${element.description}" text is displayed as Expected = "${strExpectedText}" ; Actual = "${actualText}"`,
          {
            body: `✅ "${element.description}" text is displayed as expected = "${strExpectedText}" ; actual = "${actualText}"`,
            contentType: "text/plain",
          }
        );
      } else {
        await this.embedFullPageScreenshot(
          `💥 "${element.description}" text is NOT displayed as Expected = "${strExpectedText}" ; Actual = "${actualText}" - Screenshot`
        );
        await this._testInfo.attach(
          `💥 "${element.description}" text is NOT displayed as Expected = "${strExpectedText}" ; Actual = "${actualText}"`,
          {
            body: `💥 "${element.description}" text is NOT displayed as Expected = "${strExpectedText}" ; Actual = "${actualText}"`,
            contentType: "text/plain",
          }
        );
      }
      expect.soft(this._page.locator(element.selector)).toContainText(strExpectedText);
    });
  }
}
