<template>
  <div>
    <form @submit.prevent="handleSubmit(hostname)">
      <input v-model="hostname"
             type="text"
             placeholder="hostname"
      />
      <sumibt>Search</sumibt>
    </form>

    <div v-if="result">
      <pre>{{result}}</pre>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

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
        console.log('wtf', result)
        this.result = result.data
      }
    }
  }
</script>