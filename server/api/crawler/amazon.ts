import { load } from 'cheerio';
import chalk from 'chalk';
import followRedirects from 'follow-redirects';
import { CookieJar } from 'tough-cookie';
import puppeteer from 'puppeteer';

export async function crawlAmazon(url: string, domain: string) {
  console.warn(chalk.blue('Crawl URL'), chalk.green(url));

  try {
    const finalUrl = await fetchFinalUrl(url);
    const data = await fetchData(finalUrl);
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
      basisPrice,
      url: sanitizedUrl(finalUrl),
    };
  } catch (error) {
    console.error('Error during crawling:', error);
    throw new Error('Failed to crawl data from Amazon.');
  }
}

async function fetchFinalUrl(url: string): Promise<string> {
  const { http, https } = followRedirects;
  const httpModule = url.startsWith('https://') ? https : http;

  const options = {
    followRedirects: true,
    maxRedirects: 10,
    timeout: 5000,
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  };

  return new Promise<string>((resolve, reject) => {
    httpModule
      .get(url, options, (res) => {
        resolve(res.responseUrl || url);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

async function fetchData(url: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  const data = await page.content();

  await browser.close();

  return data;
}

function sanitizedUrl(url: string): string {
  console.log(`${url.split('?')[0]}?tag=${process.env.AMAZON_PARTNER_ID}`);
  return `${url.split('?')[0]}?tag=${process.env.AMAZON_PARTNER_ID}`;
}
