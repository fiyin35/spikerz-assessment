import { test, expect } from '@playwright/test';
import { SocialConnectPage } from '../pages/SocialConnectPage'
import { YoutubeLoginPage } from '../pages/YoutubeLoginPage';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();
// Load local environment variables with higher priority
if (fs.existsSync(path.join(process.cwd(), '.env.local'))) {
  dotenv.config({ path: path.join(process.cwd(), '.env.local'), override: true });
}

test.describe('Spikerz Assessment', () => {
  // Get credentials from environment variables
  const username = process.env.SITE_USERNAME;
  const password = process.env.SITE_PASSWORD;
  const googleEmail = process.env.GOOGLE_EMAIL;
  const googlePassword = process.env.GOOGLE_PASSWORD;
  const baseUrl = process.env.BASE_URL || 'https://demo.spikerz.com';

  test.beforeEach(async ({ page }) => {
    await page.goto(`https://${username}:${password}@${baseUrl.replace('https://', '')}/social-connect`);
  });

  test('Interact with the new window', async ({ page }) => {
    // Initialize page objects
    const socialConnectPage = new SocialConnectPage(page);
    
    // Navigate to social connect page
    await socialConnectPage.goTo({ username, password });
    
    await socialConnectPage.clickYoutubeIcon();
    
    const [popup] = await socialConnectPage.clickLoginButton();
    await popup.waitForLoadState();
    
    const youtubeLoginPage = new YoutubeLoginPage(popup);
    await youtubeLoginPage.fillEmail(googleEmail);
    
    await youtubeLoginPage.fillPassword(googlePassword);

    await youtubeLoginPage.clickContinueButton();

    // Add the new permissions handling step
    await youtubeLoginPage.handlePermissions();

    //await youtubeLoginPage.clickContinueButton();
    
    
    const isVisible = await socialConnectPage.verifyBakeryShopVisible();
    expect(isVisible).toBeTruthy();
    await expect(page).toHaveURL(/social-connect/);

  });
});