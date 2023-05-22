import DealModel from './models/Deal.model';

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
    console.log('POST /api/deals');

    const body = await readBody(event) as IRequestBody;

    try {
      const {
        title,
        // imageUrls,
        // currentPrice,
        // regularPrice,
        // expirationDate,
        // url,
        // description,
        // category,
      } = body;

      // console.log('provided deal details:', title, imageUrls, currentPrice, regularPrice, expirationDate, url, description, category);
      console.log('provided deal details:', title);

      const newDeal = new DealModel({
        title,
        // imageUrls,
        // currentPrice,
        // regularPrice,
        // expirationDate,
        // url,
        // description,
        // category,
      });

      await newDeal.save();

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
