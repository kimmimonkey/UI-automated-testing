const { test , expect } = require ('@playwright/test');

test.beforeEach(async ({ page } ) => {
    await page.goto('https://connex.ai/uk/athena-ai-agent'); 
});

test.describe('User should be able to find the benefits of each product', () => {
    test('Each product should have a benefits container', async ( { page } ) => {
        await expect(page.getByText('Benefits of AI Agent')).toBeVisible()
        });

    test('The benefits container should be a single row', async ( { page } ) => {
        await expect(page.locator('.benefits-section > .container > .row')).not.toHaveCount(0);
    });

    test('The benefits row should be styled with "display: flex"', async ( { page } ) => {
        for (const rows of await page.locator('.benefits-section > .container > .row').all()) 
        {
            await expect(rows).toHaveCSS('display', 'flex');
        }     
    });

    test('There should be between 3 and 5 benefits on each product page', async ( { page } ) => {
        const benefits = await page.locator('.benefits-section > .container > .row > .benefit-card').count();
        await expect(benefits).toBeGreaterThanOrEqual(3); 
        await expect(benefits).toBeLessThanOrEqual(5); 
    });

    test('Each benefit card should have an icon, a header and content', async ( { page } ) => { 
        const benefits = await page.locator('.benefits-section > .container > .row > .benefit-card').count();
        const benefitCards = await page.locator('.benefits-section > .container > .row > .benefit-card');
        for (const element in benefitCards) 
            { 
                await expect(page.locator('.benefit-card').locator('.benefit-icon')).toHaveCount(benefits);
                await expect(page.locator('.benefit-card').locator('.benefit-title')).toHaveCount(benefits);
                await expect(page.locator('.benefit-card').locator('.benefit-content')).toHaveCount(benefits)
            }
    });
});