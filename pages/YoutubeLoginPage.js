// pages/YoutubeLoginPage.js
export class YoutubeLoginPage {
    constructor(page) {
      this.page = page;
      this.emailInput = page.locator('input[type="email"]');
      this.passwordInput = page.locator('input[type="password"]');
      this.nextButton = page.locator('button:has-text("Next")');
      this.continueButton = page.locator('button:has-text("Continue")');
    }
  
    async fillEmail(email) {
      await this.emailInput.fill(email);
      await this.nextButton.click();
    }
  
    async fillPassword(password) {
      await this.passwordInput.fill(password);
      await this.nextButton.click();
    }

    async clickContinueButton() {
      await this.continueButton.click();
    }
  
  }