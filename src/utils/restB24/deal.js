import BX24API from '../bx24'

// СДЕЛКИ

// Выгрузить одну сделку

const getDealInfo = async () => {
  const response = await BX24API.callMethod('crm.deal.get', { id: parseInt(dealId) })

  console.log({ response })
}


export { getDealInfo }