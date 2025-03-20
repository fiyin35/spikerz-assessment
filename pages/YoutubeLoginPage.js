// pages/YoutubeLoginPage.js
export class YoutubeLoginPage {

  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.nextButton = page.locator('button:has-text("Next")');
    this.continueButton = page.locator('button:has-text("Continue")');
    this.selectAllCheckbox = page.locator('text=Select all');
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
    await this.nextButton.click();
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
    await this.nextButton.click();
  }

  async handlePermissions() {
    try {
      // Wait for a short time to see if the permissions page appears
      await this.page.waitForSelector('text=Select what Spikerz can access', { timeout: 5000 });

      // Check if "Select all" checkbox exists and is not already checked
      const selectAllExists = await this.selectAllCheckbox.isVisible();

      if (selectAllExists) {
        // Click the "Select all" checkbox if it's not already checked
        await this.selectAllCheckbox.click();
      }
      // Click the Continue button
      await this.continueButton.click();
    } catch (error) {
      console.log('Permissions page not found or already handled, continuing...');
      // If the permissions page doesn't appear, just try to click continue
      try {
        await this.continueButton.click();
      } catch (continueError) {
        console.log('Continue button not found, proceeding with the test');
      }
    }
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

}