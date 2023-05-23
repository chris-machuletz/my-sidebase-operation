import DealModel from './models/Deal.model';
import chalk from 'chalk';
import { getServerSession } from '#auth'
// import { useAuthorization } from '../../composables/useAuthorization';

interface IRequestBody {
	title: string;
	imageUrls: string[];
	currentPrice: number;
	regularPrice: number;
	expirationDate: Date;
	url: string;
	description: string;
	category: string;
}

export default defineEventHandler(async (event) => {


	if (event.node.req.method === 'POST') {
		console.log(chalk.green('POST'), '/api/deals');

		const body = await readBody(event) as IRequestBody;

		const session = await getServerSession(event);
		console.log('session', chalk.blue(JSON.stringify(session)));
		if (!session) {
			return { status: 'unauthenticated!' }
		}

		const { title } = body;

		const newDeal = new DealModel({
			title,
		});

		await newDeal.save();

		return { status: '201', message: 'Deal created successfully', newDeal };

	}
});
