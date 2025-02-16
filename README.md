# Scoreboard
Scoreboard is a single-page web application that I built for tracking score when playing cornhole.

## Development methodology
I built this entire application through test-driven development, using the mantra red/green/refactor:
- First, I would [write a failing test (**red**)](https://github.com/bkotos/scoreboard/commit/26041ea15a5a6c945d3af197899f6196284dbf8f).
- I would then write the [bare minimum amount of code to make that test pass (**green**)](https://github.com/bkotos/scoreboard/commit/a237e29857320e65c54a82d9113fdfe29471a176).
- Finally, I would [refactor the code to be clean and more maintainable (**refactor**)](https://github.com/bkotos/scoreboard/commit/5202b744419cbe8c3c1716012ee253499d3fa667).

## Technologies
This app was written in TypeScript and uses [Bulma](https://bulma.io/) as a CSS framework.
It is written using the vanilla JavaScript DOM API rather than using frameworks/libraries such as React or jQuery.

I wrote E2E tests for the app using [Cypress](https://www.cypress.io/).

## Running the app
After cloning the app locally with Git, you'll need to invoke the following commands to install all NPM dependencies and start the app locally:
```bash
npm ci
npm start
```

To run the suite of E2E tests, first make sure the app is running locally by running the commands above. Then invoke the following command:
```bash
npm test
```

## URLs
| Environment | URL                                 |
| ----------- | ----------------------------------- |
| Local       | http://127.0.0.1:8080/              |
| Production  | https://bkotos.github.io/www-score/ |
