<template>
  <div>
    Hello, Vue3 Webpack!

    <hr>
    <br>

    <div class="add-task">
      <input
          v-model="newTask.title"
          type="text"
          name="title"
          placeholder="title"
      >
      <input
          v-model="newTask.description"
          type="text"
          name="description"
          placeholder="description"
      >
      <button
          @click.prevent="sendTask"
      >Добавить
      </button>
    </div>
  </div>
</template>

<script>

import { reactive } from 'vue'
import BX24API from './utils/bx24'

export default {
  setup() {

    const newTask = reactive({
      title: '',
      description: ''
    })

    const sendTask = async () => {

      const params = {
        fields: {
          TITLE: newTask.title,
          DESCRIPTION: newTask.description,
          RESPONSIBLE_ID: 1,
        }
      }

      console.log(params)

      const result = await BX24API.callMethod('tasks.task.add', params)

      console.log({ result })

    }

    return { newTask, sendTask }

  }
}
</script>

<style lang="scss">
</style>