import { load } from 'cheerio';
import chalk from 'chalk';

export async function crawlAmazon(url: string) {
	console.warn(chalk.blue('Crawl URL'), chalk.green(url));
	const data: string = await $fetch(url, {
		method: 'GET'
	});
	const $ = load(data);

	const title = $('#productTitle').text().trim();
	const price = $('.priceToPay span.a-offscreen').first().text();
	const basisPrice = $('.basisPrice span.a-offscreen').first().text();

	console.log(chalk.blue('Title:', title));
	console.log(chalk.blue('Price:', price));
	console.log(chalk.blue('BasisPrice:', basisPrice));
	return {
		title,
		price,
		basisPrice
	}
}
