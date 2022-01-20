<template>
  <div v-if="isDefaultPlacement">

    DEFAULT PLACEMENT

    <br>
    <hr>
    <br>

    <button @click.prevent="bindPlacement">Добавить скоуп</button>
    <button @click.prevent="unBindPlacement">Удалить скоуп</button>

  </div>


  <div class="mt-3 mx-3" v-else>
    ID сделки: {{ id }}
    <br>
    {{ title }}

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
          @click.prevent="createTask(newTask)"
      >Добавить задачу
      </button>

      <br>
      <br>

      <button @click.prevent="getDealInfo">Инфо о сделке</button>

      <br>
      <br>

      <button @click.prevent="taskList">taskList</button>

      <br>
      <br>

      <button @click.prevent="getTaskFields">getTaskFields</button>

      <br>
      <br>

      <button @click.prevent="updateTask">updateTask</button>

      <br>
      <br>

      <button @click.prevent="getLists">getLists</button>

    </div>

  </div>
</template>

<script>

import { onBeforeMount, onMounted, reactive, ref } from 'vue'

import BX24API from './utils/bx24'

import {
  unBindPlacement,
  bindPlacement,
  createTask,
  getTaskFields,
  updateTask,
  getDealInfo,
  getCurrentUser,
  getLists
} from './utils/restB24/'

export default {
  setup() {

    let id = ref(null), title = ref('')

    onBeforeMount(async () => {

      const user = await getCurrentUser()

      id.value = JSON.parse(BX24API.urlParams.get('PLACEMENT_OPTIONS'))['ID'] ?? null

      console.log({ DEAL_ID: id.value, user })


      const { result } = await BX24API.callMethod('CRM.DEAL.GET', { id: parseInt(id.value) })

      const orderNumber = result['UF_CRM_1633523035']
      const dealName = result['TITLE']

      title.value = `${orderNumber} | ${dealName}`

    })


    const newTask = reactive({
      title: '',
      description: ''
    })

    const isDefaultPlacement = (BX24API.placement === 'DEFAULT')

    async function taskList() {

      const list = await BX24API.callMethod('tasks.task.list', {
        filter: {
          UF_CRM_TASK: `D_${id.value}`
        },
        select: ['UF_CRM_TASK']
      })

      console.log(list)

    }

    return {
      newTask,
      createTask,
      bindPlacement,
      unBindPlacement,
      getTaskFields,
      updateTask,
      getDealInfo,
      getLists,
      isDefaultPlacement,
      id,
      taskList,
      title
    }

  }
}
</script>

<style lang="scss">
</style>