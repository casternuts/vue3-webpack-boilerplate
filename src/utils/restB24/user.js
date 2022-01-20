import BX24API from '../bx24'

// ПОЛЬЗОВАТЕЛИ СИСТЕМЫ

const getCurrentUser = async () => {
  const response = await BX24API.callMethod('user.current', {})
  return response.data
}

export { getCurrentUser }