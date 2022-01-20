import BX24API from '../bx24'

// СПИСКИ

// Получить все списки CRM

const getLists = async () => {

  const params = {
    'IBLOCK_TYPE_ID': 'lists'
  }

  const response = await BX24API.callMethod('lists.get', params)

  console.log(response)

}

export { getLists }