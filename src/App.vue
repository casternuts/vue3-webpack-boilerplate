<template>

  <default-placement v-if="isDefaultPlacement"/>

  <div class="mt-3 mx-3" v-else>

    <ul class="nav nav-pills nav-justified">
      <li
          v-for="tab in tabs"
          :key="tab.name"
          class="nav-item"
      >
        <a
            :class="['nav-link', {active: currentTab===tab.name}]"
            @click="currentTab=tab.name"
            href="#">
          {{ tab.name }}
        </a>
      </li>
    </ul>
    <hr>

    <component class="mt-3 mx-2" :is="tabs.filter(tab=>tab.name===currentTab)[0]['component']"/>


  </div>
</template>

<script>

import { ref } from 'vue'

import DefaultPlacement from './components/DefaultPlacement.vue'
import AddCars from './components/AddCars.vue'
import SetTasks from './components/SetTasks.vue'
import TestRest from './components/TestRest.vue'

export default {
  components: {
    DefaultPlacement,
    AddCars,
    SetTasks,
    TestRest
  },
  setup() {

    const tabs = ref([
      { name: 'Добавить авто', component: 'AddCars' },
      { name: 'Выставить задачи', component: 'SetTasks' },
      { name: 'Тест Rest API', component: 'TestRest' }
    ])

    const currentTab = ref('Добавить авто')

    return {
      tabs,
      currentTab
    }

  }
}
</script>

<style lang="css">
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
  background-color: rgba(18, 56, 78, 0.86) !important;
}

</style>