import { load } from 'cheerio';
import chalk from 'chalk';
import followRedirects from 'follow-redirects';

export async function crawlAmazon(url: string, domain: string) {
	console.warn(chalk.blue('Crawl URL'), chalk.green(url));

	const { http, https } = followRedirects;

	const options = {
		followRedirects: true, // Enable automatic following of redirects
		maxRedirects: 10, // Set the maximum number of redirects to follow
		timeout: 5000,
		headers: {
			'User-Agent': 'Mozilla/5.0', // Set a user agent header to avoid being blocked
		},
	};

	const httpModule = url.startsWith('https://') ? https : http;

	let finalUrl: string = url;

	// sanitize url from affiliate stuff
	// https://www.amazon.de/Generisch-Wildkamera-Bewegungsaktiviert-Wasserdicht-%C3%9Cberwachung/dp/B0BT9FLDYZ?_encoding=UTF8&_encoding=UTF8&pd_rd_w=TCRsD&content-id=amzn1.sym.c223b33c-1fbb-4e75-88a6-cd9da8cc49e6&pf_rd_p=c223b33c-1fbb-4e75-88a6-cd9da8cc49e6&pf_rd_r=C730VXQA4B2GQ4QQ273V&pd_rd_wg=gI8jG&pd_rd_r=51d2af40-41f6-41f7-b1dc-4b73eb4c612f&linkCode=ll1&tag=excelstart-21&linkId=89734013dceb077107d47f778f17be59&language=de_DE&ref_=as_li_ss_tl
	// https://amzn.to/3BSmdZi

	console.log('start fetching...');

	sanitizeUrl(finalUrl);



	// await new Promise((resolve, reject) => {
	// 	console.log('in promise');
	// 	try {
	// 		httpModule.get(url, options, (res) => {
	// 			finalUrl = sanitizeUrl(res.responseUrl);
	// 		}).on('error', (err) => {
	// 			reject(err);
	// 		});
	// 	} catch (error) {
	// 		console.error('Error during HTTP request:', error);
	// 		reject(error);
	// 	}
	// });

	const data: string = await $fetch(sanitizeUrl(finalUrl), {
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
		// message: 'test'
	}
}

export function sanitizeUrl(url: string): string {
	console.log(`${url.split('?')[0]}?tag=${process.env.AMAZON_PARTNER_ID}`);
	return `${url.split('?')[0]}?tag=${process.env.AMAZON_PARTNER_ID}`;
}
