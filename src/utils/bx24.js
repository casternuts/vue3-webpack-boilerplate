import { BX24 } from 'bx24'
import { getQueryString } from './utils'
import axios from 'axios'

const bx24 = new BX24(window, parent)
window.bx24 = bx24

class BX24API {
  constructor() {
    this.auth()
    const urlParams = new URLSearchParams(window.location.search)
    this.baseUrl = `https://${urlParams.get('DOMAIN')}`
    this.placement = urlParams.get('PLACEMENT')
    this.urlParams = urlParams
  }

  async auth() {
    if (this.session?.ACCESS_TOKEN) return this.session
    this.session = await bx24.getAuth()
    return this.session
  }

  async callMethod(name, params = {}) {
    await this.auth()
    params.auth = this.session.ACCESS_TOKEN

    // const queryString = getQueryString(params)
    // console.log({ queryString })

    const { data } = await axios.post(this.baseUrl + `/rest/${name}?`, params)

    return data
  }

  async getAll(name, params = {}) {
    const response = await this.callMethod(name, params)

    if (response.result.length < response.next) {
      return response
    }

    for (let i = 1; i < Math.ceil(response.total / response.next); i++) {
      params.start = i * response.next
      const tmpResponse = await this.callMethod(name, params)
      response.result = [...response.result, ...tmpResponse.result]
    }
    return response
  }

}

export default new BX24API()
