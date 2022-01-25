import { v4 as uuidv4 } from 'uuid'

export const getQueryString = (params = {}) => {

  let queryString = ''

  for (let elem in params) {

    if (typeof params[elem] === 'object') {

      for (let subElem in params[elem]) {
        queryString += `${elem}[${subElem}]=${params[elem][subElem]}&`
      }

    } else {
      queryString += `${elem}=${params[elem]}&`
    }
  }

  return queryString
}

export function carOrderToBatchRequest(carOrder, dealId) {

  const arr = []

  carOrder.forEach(car => {

    car.numbers.forEach(number => {

      arr.push(['lists.element.add', {
        'IBLOCK_TYPE_ID': 'lists',
        'IBLOCK_ID': '47',
        'ELEMENT_CODE': uuidv4(),
        'FIELDS': {
          'NAME': 'Car Order',
          'PROPERTY_289': car.brand,
          'PROPERTY_291': car.model,
          'PROPERTY_293': parseInt(dealId),
          'PROPERTY_295': number
        }
      }])

    })

  })

  return arr

}