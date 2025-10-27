/* 
	WORK IN PROGRESS, this code is not fully implemented yet.
	first attempt for testing elements of UI.
*/
// #region libraries
import { launch } from 'puppeteer';
// #endregion


// #region main logic
describe('Prueba de interfaz con Puppeteer', () => {
	let browser, page;

	beforeAll(async () => {
		browser = await launch();
		page = await browser.newPage();
		await page.goto('http://localhost:3000');
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Verificar que el contador se incrementa al hacer clic', async () => {
		const initialCount = await page.$eval('[data-testid="count"]', el => el.textContent);

		await page.click('[data-testid="increment-btn"]');

		const updatedCount = await page.$eval('[data-testid="count"]', el => el.textContent);

		expect(updatedCount).not.toBe(initialCount);
	});
});
// #endregion