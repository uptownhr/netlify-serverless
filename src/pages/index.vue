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

    <button @click="showLogin">Login</button>
  </div>
</template>

<script>
  import axios from 'axios'
  import AuthService from '~/lib/AuthService'

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

    methods: {
      async handleSubmit (hostname) {
        const result = await axios.get(`/.netlify/functions/check-name?hostname=${hostname}`)

        this.result = result.data
      },

      showLogin () {
        const lock = AuthService.getLock()
        console.log('wt', lock)
        lock.show()
        //AuthService.login()
      }
    }
  }
</script>