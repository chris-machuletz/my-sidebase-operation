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
    navigateAuthenticatedTo: '/',
  },
});

const { data, signIn, signOut } = useSession();
// console.log(data, signIn);
const route = useRoute();
const router = useRouter();

console.log('data', data,'signin', signIn, 'signout', signOut);

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

    await signIn('credentials', credentials);

    // Check if the route has changed after signing in
    if (route.fullPath === currentRoute) {
      // If the route hasn't changed, manually navigate to the desired page
      const intendedRoute = route.query.callbackUrl as string;
      const redirectUrl = intendedRoute || '/protected';
      router.push(redirectUrl);
    }
  } catch (error) {
    console.log('Authentication failed:', error);
  }
};

const handleSubmit = async function (event: any) {




  try {
    console.log('response:', response);
    const intendedRoute = route.query.callbackUrl as string;
    const redirectUrl = intendedRoute || '/'; // Change '/protected' to your default route
    // console.log(redirectUrl);
    // console.log(route)
  } catch (error) {
      console.log('Authentication failed');

  }



  // if (response) {
  //   console.log('response', response);
  //   // Authentication successful
  //   // Redirect the user to the intended URL or a default route
  //   const intendedRoute = route.query.callbackUrl as string;
  //   const redirectUrl = intendedRoute || '/'; // Change '/protected' to your default route
  //   console.log(redirectUrl);
  //   console.log(route)
  //   router.push('/protected');
  // } else {
  //   // Authentication failed
  //   // Display an error message or take appropriate action
  //   console.log('Authentication failed');
  // }
};

const handleSignIn = async (provider: string, options: Record<string, string> = {}) => {
  if (provider === 'github') {
    await signIn(provider, options);
  }
};
</script>
