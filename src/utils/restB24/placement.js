import BX24API from '../bx24'

// ВСТРАИВАНИЕ В БИРИКС24

const bindPlacement = async () => {

  const list = await BX24API.callMethod('placement.bind', {
    PLACEMENT: 'CRM_DEAL_DETAIL_TAB',
    HANDLER: 'https://127.0.0.1:8888/',
    TITLE: 'Производство !!!'
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

// Получить ID сделки встраивания

const getDealIdFromPlacement = () => JSON.parse(BX24API.urlParams.get('PLACEMENT_OPTIONS')).ID

export {
  bindPlacement,
  unBindPlacement,
  getDealIdFromPlacement
}