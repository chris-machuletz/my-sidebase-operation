import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import UserModel, { UserDocument } from '../models/User.model'
import bcrypt from 'bcrypt';
import { AdapterUser } from 'next-auth/adapters';

interface AuthenticatedUser extends AdapterUser {
  username: string;
}

export default NuxtAuthHandler({
  // TODO: SET A STRONG SECRET, SEE https://sidebase.io/nuxt-auth/configuration/nuxt-auth-handler#secret
  secret: process.env.AUTH_SECRET,
  // TODO: ADD YOUR OWN AUTHENTICATION PROVIDER HERE, READ THE DOCS FOR MORE: https://sidebase.io/nuxt-auth
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID || 'enter-your-client-id-here',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'enter-your-client-secret-here' // TODO: Replace this with an env var like "process.env.GITHUB_CLIENT_SECRET". The secret should never end up in your github repository
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
        password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
      },
      authorize: async (credentials: any) => {
        const { username, password } = credentials;

        try {
          const user: UserDocument | null = await UserModel.findOne({ username }).exec();
          console.log('USER', user);
          if (!user) {
            console.error('Warning: User not found');
            return null;
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (!isPasswordMatch) {
            console.error('Warning: Incorrect password');
            return null;
          }

          console.log('credentials correct');

          return {
            id: user._id.toString(),
            name: user.username as string,
            email: user.email
          };
        } catch (error) {
          console.error('Error: ', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session(params) {
      const { session, user } = params;

      console.log('SESSION', session);
      console.log('USER', user);

      if (user) {
        session.user = {
          name: user.username,
          email: user.email
          // Add any other relevant properties
        };
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
		signOut: '/',
  }
})
