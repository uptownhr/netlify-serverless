<template>
  <div>
    <form @submit.prevent="handleSubmit(hostname)">
      <input v-model="hostname"
             type="text"
             placeholder="hostname"
      />
      <button type="submit">Search</button>
    </form>

    <div v-if="result">x
      <pre>{{result}}</pre>
    </div>

    <button @click="showLogin" id="login">Login</button>
  </div>
</template>

<script>
  import axios from 'axios'
  const netlifyIdentity = require('netlify-identity-widget')

  export default {
    async asyncData({route}) {

      const hostname = route.query.hostname

      const result = hostname
        ? await axios.get(`/.netlify/functions/check-name?hostname=${route.query.hostname}`)
        : null

      return {
        hostname,
        result: result ? result.data : null,
      }
    },

    mounted () {
      this.identity()
    },

    methods: {
      async handleSubmit (hostname) {
        const result = await axios.get(`/.netlify/functions/check-name?hostname=${hostname}`)

        this.result = result.data
      },

      identity () {
        netlifyIdentity.init();

        console.log('iden')

        /*netlifyIdentity.open('login'); // open the modal to the login tab
        netlifyIdentity.open('signup'); // open the modal to the signup tab*/

        netlifyIdentity.on('init', user => console.log('init', user));
        netlifyIdentity.on('login', user => console.log('login', user));
        netlifyIdentity.on('logout', () => console.log('Logged out'));
        netlifyIdentity.on('error', err => console.error('Error', err));
        netlifyIdentity.on('open', () => console.log('Widget opened'));
        netlifyIdentity.on('close', () => console.log('Widget closed'));

/*// Close the modal
        netlifyIdentity.close();

// Log out the user
        netlifyIdentity.logout();

// Access the underlying GoTrue JS client.
// Note that doing things directly through the GoTrue client brings a risk of getting out of
// sync between your state and the widget’s state.
        netlifyIdentity.gotrue;*/
      },

      showLogin () {
        netlifyIdentity.open()
      }
    }
  }
</script>