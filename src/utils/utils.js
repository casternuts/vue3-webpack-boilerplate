export const getQueryString = (params = {}) => {
  let queryString = ''
  for (let elem in params) {
    console.log({ elem })
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
