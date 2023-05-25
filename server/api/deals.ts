import DealModel from './models/Deal.model';
import chalk from 'chalk';
import { getServerSession } from '#auth';
import cheerio, { load } from 'cheerio';

interface IRequestBody {
	title: string;
	// imageUrls: string[];
	price: number;
	basisPrice: number;
	// expirationDate: Date;
	url: string;
	// description: string;
	// category: string;
}

export default defineEventHandler(async (event) => {

	if (event.node.req.method === 'POST') {
		console.log(chalk.green('POST'), '/api/deals');

		const body = await readBody(event) as IRequestBody;

		const session = await getServerSession(event);

		if (!session) {
			return {
				statusCode: 403,
				status: 'Unauthenticated!'
			}
		}

		const { title, url, price, basisPrice } = body;

		const newDeal = new DealModel({
			title,
			url,
			price,
			basisPrice
		});

		try {
			await newDeal.save();
			return { statusCode: 201, message: 'Deal created successfully', newDeal };
		} catch (error) {
			throw error;
		}



	}
});
