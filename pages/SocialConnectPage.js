// pages/SocialConnectPage.js
export class SocialConnectPage {
  
    constructor(page) {
      this.page = page;
      this.youtubeIcon = page.locator('.ant-card-body .platform-icon.platform-youtube');
      this.youtubeLoginButton = page.locator('app-google-and-youtube-login button.ant-btn');
      this.bakeryShopElement = page.getByText('@dina_bakery_shop');
      this.baseUrl = process.env.BASE_URL || 'https://demo.spikerz.com';
    }
  
    async goTo(credentials) {
      await this.page.goto(`${this.baseUrl}/social-connect/`, {
        httpCredentials: credentials
      });
    }
  
    async clickYoutubeIcon() {
        await this.youtubeIcon.waitFor();
        await this.youtubeIcon.click();
      }
    
      async clickLoginButton() {
        return await Promise.all([
          this.page.waitForEvent('popup'),
          this.youtubeLoginButton.click()
        ]);
      }

      async verifyBakeryShopVisible() {
        await this.bakeryShopElement.waitFor();
        return this.bakeryShopElement.isVisible();
      }
  }