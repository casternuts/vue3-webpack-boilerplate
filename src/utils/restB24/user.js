import BX24API from '../bx24'

// ПОЛЬЗОВАТЕЛИ СИСТЕМЫ

const getCurrentUser = async () => {
  return await BX24API.callMethod('user.current', {})
}

const getCrmUsersList = async () => {
  const userList = await BX24API.getAll('user.get', {})
  return userList.result.map(item => {
    return { ...item, 'FULL_NAME': `${item['NAME']} ${item['LAST_NAME']}` }
  })
}

export { getCurrentUser, getCrmUsersList }