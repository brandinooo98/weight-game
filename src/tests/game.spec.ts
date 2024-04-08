import { test, expect } from "@playwright/test";
import ScaleScreen from "../screens/ScaleScreen";
import { Side } from "../util/types";

test("find fake bar", async ({ page }) => {
  // Sets up a listener for the dialog box that appears when the user wins/loses
  page.on("dialog", async (dialog) => {
    await dialog.accept();
    console.log(dialog.message());
    expect(dialog.message() === "Yay! You find it!").toBeTruthy();
  });
  const screen = new ScaleScreen(page);
  screen.startUp();

  const group1 = ["0", "1", "2"];
  const group2 = ["3", "4", "5"];
  const group3 = ["6", "7", "8"];
  let lightestGroup;
  // Compare group1 and group2
  for (let i = 0; i < 3; i++) {
    await screen.typeNumber(group1[i], i, Side.Left);
    await screen.typeNumber(group2[i], i, Side.Right);
  }
  await screen.clickWeigh();
  const result = await screen.getResult();
  await screen.clickReset();

  if (result === "<") {
    // If group1 is lighter
    await screen.typeNumber(group1[0], 0, Side.Left);
    await screen.typeNumber(group1[1], 1, Side.Right);
    lightestGroup = group1;
  } else if (result === ">") {
    // If group2 is lighter
    await screen.typeNumber(group2[0], 0, Side.Left);
    await screen.typeNumber(group2[1], 1, Side.Right);
    lightestGroup = group2;
  } else if (result === "=") {
    // If group3 is lighter
    await screen.typeNumber(group3[0], 0, Side.Left);
    await screen.typeNumber(group3[1], 1, Side.Right);
    lightestGroup = group3;
  }
  await screen.clickWeigh();
  const result2 = await screen.getResult();

  // Select the lightest bar
  if (result2 === "<") {
    await screen.selectNumber(lightestGroup[0]);
  } else if (result2 === ">") {
    await screen.selectNumber(lightestGroup[1]);
  } else if (result2 === "=") {
    await screen.selectNumber(lightestGroup[2]);
  }
  await screen.outputResults();
});
