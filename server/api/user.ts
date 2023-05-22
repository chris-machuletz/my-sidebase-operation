import UserModel from './models/User.model';
import bcrypt from 'bcrypt';

interface IRequestBody {
    username: string;
    password: string;
    email: string;
}

export default defineEventHandler(async(event) => {

  if (event.node.req.method === 'POST') {
        console.log('POST /api/users');

        const body = await readBody(event) as IRequestBody;

        try {
            const { username, password, email } = body as IRequestBody;

            console.log('provided credentials', username, password, email);

            const existing = await UserModel.findOne({
                $or: [{ username }, { email }]
            });

            if(existing) {
                console.log('user already exists', existing);
                return {
                    status: 400,
                    message: 'User already exists'
                };
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // TODO encrypt the email

            // Create a new user
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
								rights: ['create', 'read', 'update', 'delete']
            });

            await newUser.save();

            return {
                status: 201,
                message: 'User registered successfully'
            }
        } catch (error: any) {
            return {
                code: 'ERROR',
                message: error.message
            }
        }
    } else {
        event.node.res.statusCode = 405;
        event.node.res.end('Method Not Allowed');
    }
});
