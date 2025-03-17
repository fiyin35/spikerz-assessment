// @ts-nocheck
const { test, expect } = require("@playwright/test");

test.describe("spikerz assessment", () => {

    const username = "me"
    const password = "SmipMe123456"

    //the url is set as a variable
    const first_url = "https://demo.spikerz.com/"
    const second_url = "https://demo.spikerz.com/social-connect/"

    test.beforeEach(async ({ page }) => {
        await page.goto('https://me:SmipMe123456@demo.spikerz.com/social-connect');
    });
    


    // test("visit demo.spikerz and authenticate", async ({ page }) => {

    //     await page.goto(first_url, {
    //         httpCredentials: {
    //             username: username,
    //             password: password
    //         }
    //     });

    // })

    test("interact with the new window", async ({ page }) => {

        await page.goto(second_url, {
            httpCredentials: {
                username: username,
                password: password
            }
        });


        await page.locator(".ant-card-body .platform-icon.platform-youtube").waitFor();
        await page.locator(".ant-card-body .platform-icon.platform-youtube").click();

        await page.locator("app-google-and-youtube-login button.ant-btn").click();

    })

})
