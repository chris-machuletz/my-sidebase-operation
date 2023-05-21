import mongoose, { ConnectOptions } from 'mongoose';
import { Nitro } from 'nitropack';

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig();
    mongoose
        .connect(config.MONGO_URI, {
            useNewUrlParser: true,
        } as ConnectOptions)
        .then(() => console.log('Connected to database'))
        .catch((e) => console.log(e));
};