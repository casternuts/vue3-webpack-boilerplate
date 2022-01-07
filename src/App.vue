<template>
  <div v-if="isDefaultPlacement">

    DEFAULT PLACEMENT

    <br>
    <hr>
    <br>

    <button @click.prevent="bindPlacement">Добавить скоуп</button>
    <button @click.prevent="unBindPlacement">Удалить скоуп</button>

  </div>


  <div v-else>
    Hello, Vue3 Webpack!

    <br>
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
      >Добавить задачу
      </button>
    </div>

  </div>
</template>

<script>

import { onMounted, reactive, ref } from 'vue'
import BX24API from './utils/bx24'

export default {
  setup() {

    const bindPlacement = async () => {
      const list = await BX24API.callMethod('placement.bind', {
        PLACEMENT: 'CRM_DEAL_DETAIL_TAB',
        HANDLER: 'https://127.0.0.1:8888/',
        TITLE: 'Производство'
      })
      console.log(list)
    }

    const unBindPlacement = async () => {
      const list = await BX24API.callMethod('placement.unbind', {
        PLACEMENT: 'CRM_DEAL_DETAIL_TAB',
        HANDLER: 'https://127.0.0.1:8888/',
      })
      console.log(list)
    }


    const newTask = reactive({
      title: '',
      description: ''
    })

    const isDefaultPlacement = (BX24API.placement === 'DEFAULT')

    const placement = BX24API.placement
    console.log({ placement })

    let ID = JSON.parse(BX24API.urlParams.get('PLACEMENT_OPTIONS'))['ID'] ?? null

    console.log({ ID })

    const sendTask = async () => {

      const params = {
        fields: {
          TITLE: newTask.title,
          DESCRIPTION: newTask.description,
          RESPONSIBLE_ID: 1,
        }
      }

      const result = await BX24API.callMethod('tasks.task.add', params)

      newTask.title = ''
      newTask.description = ''

    }

    return { newTask, sendTask, bindPlacement, unBindPlacement, isDefaultPlacement }

  }
}
</script>

<style lang="scss">
</style>