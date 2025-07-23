# Scoreboard
Scoreboard is a single-page web application that I built for tracking score when playing cornhole.

## Development methodology
I built this entire application through test-driven development, using the mantra red/green/refactor:
- First, I would [write a failing test (**red**)](https://github.com/bkotos/scoreboard/commit/26041ea15a5a6c945d3af197899f6196284dbf8f).
- I would then write the [bare minimum amount of code to make that test pass (**green**)](https://github.com/bkotos/scoreboard/commit/a237e29857320e65c54a82d9113fdfe29471a176).
- Finally, I would [refactor the code to be clean and more maintainable (**refactor**)](https://github.com/bkotos/scoreboard/commit/5202b744419cbe8c3c1716012ee253499d3fa667).

## TDD-Enabled Framework Migration
This app serves as a proof of concept for how a comprehensive TDD approach paired with Cypress end-to-end tests can enable developers to completely rewrite applications using different frontend frameworks with confidence and ease.

The app was originally built using vanilla JavaScript and the DOM API. However, thanks to the robust test suite created through TDD, I was able to delete all the source code except for the tests and completely [rewrite the entire application from scratch using React](https://github.com/bkotos/scoreboard/pull/1). This migration was efficient and low-risk because:

- The Cypress tests provided a complete specification of expected behavior
- The tests validated every feature and interaction without being coupled to implementation details
- AI coding assistants like Cursor could use the failing tests as a guide to implement React components
- The comprehensive test coverage ensured no functionality was lost during the rewrite

This demonstrates the power of TDD not just for building applications, but for maintaining the flexibility to completely change your technology stack when needed.

## Technologies
This app is written in TypeScript and React, and uses [Bulma](https://bulma.io/) as a CSS framework.

I wrote E2E tests for the app using [Cypress](https://www.cypress.io/).

## New Multi-Framework Structure

This project has been reorganized to demonstrate TDD across multiple frameworks:

```
scoreboard/
├── cypress/              # Cypress E2E tests (shared across all implementations)
├── implementations/     # Framework-specific implementations
│   ├── react/          # Complete React implementation
│   └── vue/            # Vue.js implementation
└── package.json        # Root project with shared testing infrastructure
```

## Running the app

### React Implementation 
```bash
cd implementations/react
npm install
npm start
```

### Vue.js Implementation
```bash
cd implementations/vue
npm install
npm start
```

### Running tests
Tests are run from the root directory and work with any implementation:
```bash
npm install  # Install Cypress and shared testing dependencies
npm test     # Run the full test suite (72 tests)
```

The tests expect a server running on port 8080, so make sure to start the implementation first.

## URLs
| Environment | URL                                 |
| ----------- | ----------------------------------- |
| Local       | http://127.0.0.1:8080/              |
| Production  | https://bkotos.github.io/www-score/ |
