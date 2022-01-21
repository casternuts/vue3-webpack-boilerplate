<template>

  ID сделки: {{ dealId }}
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

    <button @click.prevent="getDealInfo(dealId)">Инфо о сделке</button>

    <br>
    <br>

    <button @click.prevent="getTaskAnchoredToDeal(dealId)">taskList</button>

    <br>
    <br>

    <button @click.prevent="getTaskFields">getTaskFields</button>

    <br>
    <br>

    <button @click.prevent="updateTask">updateTask</button>

    <br>
    <br>

    <button @click.prevent="getLists">getLists</button>

    <br>
    <br>

    <button @click.prevent="getCrmUsersList">getCrmUsersList</button>

  </div>
</template>

<script>
import {
  getLists,
  updateTask,
  getTaskFields,
  getTaskAnchoredToDeal,
  getDealInfo,
  createTask,
  getDealIdFromPlacement,
  getCurrentUser,
  bindPlacement,
  unBindPlacement,
  getCrmUsersList
} from '../utils/restB24'
import BX24API from '../utils/bx24'
import { onBeforeMount, reactive, ref } from 'vue'

export default {
  name: 'TestRest',
  setup() {
    const isDefaultPlacement = (BX24API.placement === 'DEFAULT')

    let dealId = ref(getDealIdFromPlacement() ?? null), title = ref('')

    const newTask = reactive({
      title: '',
      description: ''
    })

    onBeforeMount(async () => {

      const user = await getCurrentUser()

      console.log({ DEAL_ID: dealId.value, user })


      const { result } = await BX24API.callMethod('CRM.DEAL.GET', { id: parseInt(dealId.value) })

      const orderNumber = result['UF_CRM_1633523035']
      const dealName = result['TITLE']

      title.value = `${orderNumber} | ${dealName}`

    })


    return {
      createTask,
      bindPlacement,
      unBindPlacement,
      getTaskFields,
      updateTask,
      getDealInfo,
      getLists,
      getTaskAnchoredToDeal,

      getCrmUsersList,

      isDefaultPlacement,
      newTask,
      dealId,
      title
    }
  }
}
</script>

<style scoped>

</style>