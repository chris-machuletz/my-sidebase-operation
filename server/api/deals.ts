import DealModel from './models/Deal.model';
import chalk from 'chalk';
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
		// console.log(chalk.red(session));
		// let _session;
		// const session = await $fetch('/api/session', { method: 'GET' }).then(res => _session = res);
		// console.log('session', session, '_session', _session);

    try {


			// const { canCreate } = useAuthorization(event.session);

			// if(!canCreate) {
			// 	return {
			// 		status: 403,
			// 		message: 'Forbidden'
			// 	}
			// }

      // const {
      //   title,
      //   // imageUrls,
      //   // currentPrice,
      //   // regularPrice,
      //   // expirationDate,
      //   // url,
      //   // description,
      //   // category,
      // } = body;

      // // console.log('provided deal details:', title, imageUrls, currentPrice, regularPrice, expirationDate, url, description, category);
      // console.log('provided deal details:', title);

      // const newDeal = new DealModel({
      //   title,
      //   // imageUrls,
      //   // currentPrice,
      //   // regularPrice,
      //   // expirationDate,
      //   // url,
      //   // description,
      //   // category,
      // });

      // await newDeal.save();

      return {
        status: 201,
        message: 'Deal created successfully',
      };
    } catch (error: any) {
      return {
        code: 'ERROR',
        message: error.message,
      };
    }
  } else {
    event.node.res.statusCode = 405;
    event.node.res.end('Method Not Allowed');
  }
});
