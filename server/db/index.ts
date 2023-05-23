import mongoose, { ConnectOptions } from 'mongoose';
import { Nitro } from 'nitropack';
import chalk from 'chalk';

export default async (_nitroApp: Nitro) => {
	const config = useRuntimeConfig();


	mongoose
		.connect(config.MONGO_URI, {
			useNewUrlParser: true,
		} as ConnectOptions)
		.then(() => console.log(chalk.green('✔'), 'Connected to database'))
		.catch((e) => console.log(chalk.red('✖'), 'Error connecting to database', e)
		);
};
