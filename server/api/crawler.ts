import { crawlAmazon } from "./crawler/amazon";

export default defineEventHandler(async (event) => {

	const body = await readBody(event);
	const { url } = body;

	const crawler = await runCrawler(url);

	return crawler;
});

async function runCrawler(url: string) {

  const domain = getDomain(url);

  switch (domain) {
    case 'amazon':
      return await crawlAmazon(url);
    // Add cases for other domains and corresponding crawlers

    default:
      throw new Error('No crawler available for the given URL');
  }
}

function getDomain(url: string): string {
  const regex = /^(?:https?:\/\/)?(?:www\.)?(.*?)\./;
  const match = url.match(regex);
  if (match && match.length > 1) {
    const domain = match[1].toLowerCase();
    return domain === 'amazon' ? 'amazon' : domain;
  }

  throw new Error('Invalid URL');
}
