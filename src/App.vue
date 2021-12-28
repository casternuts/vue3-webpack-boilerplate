<template>
  <div>
    Hello, Vue3 Webpack!
  </div>
</template>

<script>

import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const leads = store.getters['leads/leadCollection']

    console.log({ leads })

    return {
      leads
    }

  }
}
</script>

<style lang="scss">
</style>