<template>
  <div>
    <nuxt-link to="/protected">Protected</nuxt-link><br>
    <nuxt-link to="/register">Register</nuxt-link>
    <h1 v-if="data">Signed in!</h1>
    <div class="sign-in" v-if="!data">
      <p>Sign-In Options:</p>
      <button @click="handleSignIn('github')">Github</button>

      <form @submit.prevent="login">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit" @click.prevent="login">Log in</button>
        </form>

    </div>
    <button @click="signOut()" v-if="data">Log out</button>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/profile'
  },
});

const { status, data, signIn, signOut } = useAuth();
const route = useRoute();
const router = useRouter();

console.log('data', data,'signin', signIn, 'signout', signOut);
console.log(status.value)

let username: string = '';
let password: string = '';

const login = async () => {
  try {
    const credentials = {
      username,
      password,
    };

    // Manually save the current route before signing in
    const currentRoute = route.fullPath;

    console.warn('CURRENT ROUTE:', currentRoute);

    try {
      await signIn('credentials', credentials)
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log('Authentication failed:', error);
  }
};



const handleSignIn = async (provider: string, options: Record<string, string> = {}) => {
  if (provider === 'github') {
    await signIn(provider, options);
  }
};
</script>
