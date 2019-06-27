<template>
  <pre>
    {{result}}
  </pre>
</template>

<script>
  import axios from 'axios'

  export default {
    async asyncData({route}) {
      console.log('route', route.query, route)
      const result = await axios.get(`/.netlify/functions/check-name?hostname=${route.query.hostname}`)

      console.log('result.data', result.data)

      return {
        result: result.data
      }
    }
  }
</script>