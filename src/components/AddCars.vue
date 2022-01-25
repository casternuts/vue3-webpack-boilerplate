<template>
  <div>
    <div class="my-1">
      ADDCARS VIEW :: Сделка {{ dealId() }}
      <button
          class="btn btn-primary mx-2"
          @click.prevent="addListItemsByDealId"
      >
        Добавить список
      </button>

    </div>
    <br>

    <ul class="list-group">
      <li
          v-for="(car, id) in carOrder"
          :key="id"
          class="list-group-item one-car-group"
      >

        <form>

          <div class="row mt-3">

            <div class="form-group col-sm-4 mb-2 mt-2">
              <label for="carBrand">Марка автомобиля</label>
              <input
                  v-model="car.brand"
                  class="form-control input-sm mt-1"
                  id="carBrand"
                  type="text">
            </div>

            <div class="form-group col-sm-4 mb-2 mt-2">
              <label for="carModel">Модель автомобиля</label>
              <input
                  v-model="car.model"
                  class="form-control input-sm mt-1"
                  id="carModel"
                  type="text">
            </div>

            <div class="col-sm-4">

              <ul class="list-group">

                <li class="list-group-item car-number-group">

                  <div
                      v-for="(number, numId) in carOrder[id].numbers"
                      :key="`${id}_${numId}`"
                      class="form-group col mb-2"
                  >

                    <label for="carNumber">Госномер {{ id + 1 }}_{{ numId + 1 }}</label>

                    <div class="number-container">

                      <input
                          v-model="carOrder[id].numbers[numId]"
                          class="form-control input-sm mt-1"
                          id="carNumber"
                          type="text"
                      >

                      <i
                          @click.prevent="removeCarNumber(id, numId)"
                          class="bi-x-square-fill car-number-remove-button"
                      />

                    </div>


                  </div>

                  <i
                      class="bi-plus-square-fill car-number-add-button"
                      @click.prevent="addOneNumberToCarTypeById(id)"
                  />

                </li>


              </ul>

            </div>

            <button @click.prevent="removeOneNumberToCarTypeById(id)" class="btn btn-danger mt-3 w-auto mx-3">Удалить
              группу авто
            </button>

          </div>

          <!--          <div class="row">-->

          <!--            <div class="form-group col-sm-6 mb-2">-->
          <!--              <label>Ответственный сотрудник</label>-->
          <!--              <v-select-->
          <!--                  v-model="selected"-->
          <!--                  label="FULL_NAME"-->
          <!--                  :options="userList"-->
          <!--              />-->
          <!--            </div>-->

          <!--          </div>-->

        </form>
      </li>
      <i
          @click.prevent="addOneCarGroup"
          class="bi-plus-square-fill order-add-button"
      />
    </ul>


  </div>
</template>

<script>

import { getDealIdFromPlacement } from '../utils/restB24'
import { carOrderToBatchRequest } from '../utils/utils'
import { v4 as uuidv4 } from 'uuid'
import BX24API from '../utils/bx24'
import { stringify } from 'qs'
import { stringify as strgf } from 'query-string'

export default {
  name: 'AddCars',

  async beforeMount() {
    let data = await this.getListItemsByDealId()
    console.log({ data })

    let uniq = new Set()

    let data1 = data.map(car => {
      const brand = Object.values(car['PROPERTY_289'])[0]
      const model = Object.values(car['PROPERTY_291'])[0]
      const numbers = Object.values(car['PROPERTY_295'])[0]

      uniq.add(`${brand}__${model}`)

      return {
        brand,
        model,
        numbers
      }
    })

    uniq = [...uniq].map(item => {

      return {
        brand: item.split('__')[0],
        model: item.split('__')[1],
        numbers: data1
            .filter(car => car.brand === item.split('__')[0] && car.model === item.split('__')[1])
            .map(car => car.numbers)
      }
    })

    // data1.forEach()

    console.log({ uniq, data1 })

    this.carOrder = uniq

  },

  data: () => {
    return {
      carOrder: [{
        model: '',
        brand: '',
        numbers: new Array('')
      }],
      dealId: function () {
        return getDealIdFromPlacement()
      },
      order: null
    }
  },

  methods: {
    addOneCarGroup: function () {
      this.carOrder.push({
        model: '',
        brand: '',
        numbers: new Array('')
      })
    },

    addOneNumberToCarTypeById: function (id) {
      this.carOrder[id].numbers.push('')
    },

    removeOneNumberToCarTypeById: function (id) {
      if (this.carOrder.length === 1) {
        this.carOrder = [{
          model: '',
          brand: '',
          numbers: new Array('')
        }]

        return
      }

      this.carOrder.splice(id, 1)
    },

    removeCarNumber: function (id, numId) {

      if (this.carOrder[id].numbers.length === 1) {
        this.carOrder[id].numbers[0] = ''
        return
      }

      this.carOrder[id].numbers.splice(numId, 1)
    },

    getListItemsByDealId: async function () {
      const dealId = this.dealId()

      const { result } = await BX24API.getAll('lists.element.get', {
        'IBLOCK_TYPE_ID': 'lists',
        'IBLOCK_ID': 47,
        'FILTER': {
          '=PROPERTY_293': [dealId]
        }
      })

      return result
    },

    addListItemsByDealId: async function () {

      let carOrder = this.carOrder

      const dealId = getDealIdFromPlacement()


      const params = {
        halt: 0,
        cmd: carOrderToBatchRequest(carOrder, dealId)
      }

      await BX24API.callBatchMethodByHook(params)

    }
  }
}
</script>

<style>
.one-car-group {
  background-color: rgba(171, 179, 180, 0.55);
}

.car-number-add-button {
  font-size: 1.4rem;
  color: #206fd2;
  position: relative;
  text-align: center;
  top: 0;
  left: calc(50% - 10px);
  width: 100%;
  cursor: pointer;
}

.car-number-remove-button {
  font-size: 1rem;
  color: #d22020;
  cursor: pointer;
  position: absolute;
  right: 25px;
  margin-top: 15px;
}

.order-add-button {
  font-size: 2rem;
  color: #288210;
  position: relative;
  text-align: center;
  top: -15px;
  cursor: pointer;
  z-index: 100;

}

.car-number-group {
  min-height: 120px;
}

.number-container {
  display: flex;
}

</style>