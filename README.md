# Spikerz Assessment 

This document provides instructions on setting up and running the automated test framework for the Spikerz YouTube integration. 
The framework uses Playwright for browser automation and follows the Page Object Model (POM) design pattern for improved maintainability.


## Setup Instructions

1. **Clone the repository**
   git clone https://github.com/fiyin35/spikerz-assessment
   cd spikerz-assessment
   

2. **Install dependencies**
   npm install


3. **Install Playwright browsers**
   npx playwright install
   

4. **Set up environment variables**
   
   Create a `.env.local` file in the project root with the following content:

   SITE_USERNAME=your_username
   SITE_PASSWORD=your_password
   GOOGLE_EMAIL=your_google_email
   GOOGLE_PASSWORD=your_google_password
   BASE_URL=https://demo.spikerz.com

## Project Structure

spikerz-tests/
├── pages/
│   ├── SocialConnectPage.js   # Page object for the social connect page
│   └── YouTubeLoginPage.js    # Page object for the YouTube login popup
├── tests/
│   └── spikerz.spec.js        # Test file containing the test cases
├── .env                       # Default environment variables
├── .env.local                 # Local environment variables (gitignored)
├── playwright.config.js       # Playwright configuration
├── package.json               # Project dependencies
└── README.md                  # Project documentation


## Configuration

The test framework uses environment variables for configuration. These can be set in the `.env` and `.env.local` files, or directly in the environment.

- `BASE_URL`: The base URL of the Spikerz application
- `SITE_USERNAME`: Username for Spikerz authentication
- `SITE_PASSWORD`: Password for Spikerz authentication
- `GOOGLE_EMAIL`: Google email for YouTube authentication
- `GOOGLE_PASSWORD`: Google password for YouTube authentication

## How the Script Works

The test script follows these steps:

1. **Page Navigation**: The test navigates to the Spikerz social connect page using HTTP authentication.

2. **YouTube Integration**:
   - Locates and clicks the YouTube icon on the social connect page
   - Clicks the login button which opens a popup window for Google authentication

3. **Authentication**:
   - Fills in the Google email and clicks Next
   - Handles potential reCAPTCHA challenges
   - Fills in the Google password and clicks Next

4. **Verification**:
   - Verifies that the YouTube account is successfully connected
   - Checks for the presence of specific elements on the page

The script uses the Page Object Model pattern to separate the test logic from the page interaction details:

- `SocialConnectPage` handles interactions with the main Spikerz social connect page
- `YouTubeLoginPage` handles interactions with the Google authentication popup

## Running the Tests

To run the tests:

```bash
# Run all tests
npx playwright test

# Run with UI Mode
npx playwright test --ui

# Run a specific test file
npx playwright test tests/spikerz.spec.js

# Run in debug mode
npx playwright test --debug
```

## Test Reports

Playwright generates HTML reports after test runs. To view the latest report:

```bash
npx playwright show-report
```

## Troubleshooting

### Common Issues

1. **Authentication Failures**:
   - Ensure your credentials in `.env.local` are correct
   - Check if Google requires additional verification

2. **reCAPTCHA Challenges**:
   - The test includes basic reCAPTCHA handling, but Google may employ different detection methods
   - Try running in headed mode to manually handle reCAPTCHA during development

Debugging Tips

Use --debug flag to run tests in debug mode
Add await page.pause() at specific points in your test for interactive debugging
Increase timeouts for flaky operations:
await page.locator('selector').click({ timeout: 30000 });
