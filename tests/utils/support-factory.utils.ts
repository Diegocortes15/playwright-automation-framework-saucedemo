import {Page, TestInfo} from "@playwright/test";
import casual from "casual";

export class SupportFactory {
  //private readonly _page: Page;
  private readonly _testInfo: TestInfo;

  /**
   * @param {import { page } from "@playwright/test";} page
   * @param {import { testInfo } from "@playwright/test";} testInfo
   */

  constructor(page: Page, testInfo: TestInfo) {
    //this._page = page;
    this._testInfo = testInfo;
  }

  async addAnnotations(jsonData: object) {
    this._testInfo.annotations.push({type: "testId", description: jsonData["testCase"]});
    this._testInfo.annotations.push({type: "testSummary", description: jsonData["testSummary"]});
    this._testInfo.annotations.push({type: "testDescription", description: jsonData["testDescription"]});
  }

  async getRandomPositiveNumber(max: number): Promise<number> {
    return Math.floor(Math.random() * max);
  }

  async jsonToString(list: any[]): Promise<string> {
    return JSON.stringify(list, null, 2);
  }

  async getRandomFirstName(): Promise<string> {
    return casual.first_name;
  }

  async getRandomLastName(): Promise<string> {
    return casual.last_name;
  }

  async getRandomZip(): Promise<string> {
    return casual.zip({digits: 5 | 9});
  }
}
