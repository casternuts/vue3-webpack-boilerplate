<template>
  <div>
    DEFAULT PLACEMENT

    <br>
    <hr>
    <br>

    <button @click.prevent="bindPlacement">Добавить скоуп</button>
    <button @click.prevent="unBindPlacement">Удалить скоуп</button>
  </div>
</template>

<script>
import { bindPlacement, unBindPlacement } from '../utils/restB24'

export default {
  methods: {
    bindPlacement,
    unBindPlacement
  }
}
</script>

<style scoped>

</style>