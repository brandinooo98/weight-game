# weight-game

This is a simple Playwright test which plays a game where you need to guess which item has a different weight in a given list of 9 items at the following website: http://sdetchallenge.fetch.com
The algorithm used to solve the game is a simple ternary search algorithm which finds the item in the list as fast as possible.

## Instructions

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Install Playwright CLI tools by running `npx playwright install`
4. Use a `node` version >= `18.0.0`

I provided a bunch of scripts to provide you with the ability to run the tests in different ways:

1. `npm run test` - runs the tests in chromium, firefox and webkit browsers in parallel
2. `npm run test:chromium` - runs the tests in chromium browser
3. `npm run test:firefox` - runs the tests in firefox browser
4. `npm run test:webkit` - runs the tests in webkit browser
5. Adding `:headed` to the above scripts will run the tests in headed mode (i.e. you will see the browser window)
