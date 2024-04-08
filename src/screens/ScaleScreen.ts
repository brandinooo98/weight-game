import { Page } from "@playwright/test";
import { Side } from "../util/types";

export default class ScaleScreen {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Initializes the startup process.
   * Navigates to the specified URL.
   * @returns {Promise<void>} A promise that resolves when the startup process is complete.
   */
  startUp = async () => {
    await this.page.goto("http://sdetchallenge.fetch.com");
  };

  /**
   * Types a number into the specified input field on the scale screen.
   *
   * @param number - The number to be typed into the input field.
   * @param square - The square number associated with the input field.
   * @param side - The side of the scale where the input field is located.
   */
  typeNumber = async (number: string, square: number, side: Side) => {
    await this.page.locator(`#${side}_${square}`).fill(number);
  };

  /**
   * Selects the fake bar with the specified number.
   *
   * @param number - The number to select.
   */
  selectNumber = async (number: string) => {
    await this.page.locator(`#coin_${number}`).click();
  };

  /**
   * Clicks the "Weigh" button on the page.
   * @returns {Promise<void>} A promise that resolves once the button is clicked.
   */
  clickWeigh = async (): Promise<void> => {
    await this.page.locator("button:has-text('Weigh')").click();
  };

  /**
   * Clicks the "Reset" button on the page.
   * @returns {Promise<void>} A promise that resolves when the button is clicked.
   */
  clickReset = async (): Promise<void> => {
    await this.page.locator("button:has-text('Reset')").click();
  };

  /**
   * Waits for the results and returns the text content of the "Result" button.
   * @returns The result of the comparison.
   */
  getResult = async (): Promise<string | null> => {
    await this.page
      .locator("button:has-text('?')")
      .waitFor({ state: "detached" });
    return this.page.locator("button:near(:text('Result'))").textContent();
  };

  /**
   * Outputs the results by logging each comparison result to the console.
   * @returns {Promise<void>} A promise that resolves once the results are outputted.
   */
  outputResults = async (): Promise<void> => {
    const items = this.page.locator("ol > li");
    for (let i = 0; i < (await items.count()); i++) {
      console.log(await items.nth(i).textContent());
    }
  };
}
