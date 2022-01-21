<template>
  <div>
    <div class="my-1">ADDCARS VIEW</div>
    <br>

    <ul class="list-group">
      <li class="list-group-item">

        <form>

          <div class="row">

            <div class="form-group col-sm-3 mb-2">
              <label for="carBrand">Марка автомобиля</label>
              <input class="form-control input-sm mt-1" id="carBrand" type="text">
            </div>

            <div class="form-group col-sm-3 mb-2">
              <label for="carModel">Модель автомобиля</label>
              <input class="form-control input-sm mt-1" id="carModel" type="text">
            </div>

            <div class="form-group col-sm-6 mb-2">
              <label for="address">Адрес клиента</label>
              <input class="form-control input-sm mt-1" id="address" type="text">
            </div>

            <div class="form-group col-sm-6 mb-2">
              <label for="userSearch">Ответственный сотрудник</label>
              <input class="form-control input-sm mt-1 user-search" id="userSearch" type="text">
            </div>

                        <v-select
                            label="FULL_NAME"
                            :options="userList"
                        />

          </div>

        </form>
      </li>
    </ul>

  </div>
</template>

<script>
import { onBeforeMount, reactive, ref } from 'vue'
import { getCrmUsersList } from '../utils/restB24'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'


export default {
  name: 'AddCars',
  components: { vSelect },

  setup() {

    // let userList = ref([{ 'FULL_NAME': '' }])
    let userList = ref([])

    onBeforeMount(async () => {

      let list = await getCrmUsersList()

      // console.log(list)

      userList.value = list.map(item => {
        return { ...item, 'FULL_NAME': `${item['NAME']} ${item['LAST_NAME']}` }
      })

      // console.log(userList.value)
    })

    return {
      userList
    }
  }
}
</script>

<style>

</style>