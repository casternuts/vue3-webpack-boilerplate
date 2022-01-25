import { BX24 } from 'bx24'
import { getQueryString } from './utils'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { stringify } from 'qs'

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

    const { data } = await axios.post(this.baseUrl + `/rest/${name}?`, params)

    return data
  }

  async callBatchMethodByHook(params = {}) {

    params.cmd = params.cmd.map(item => `${item[0]}?${stringify(item[1])}`)
    const data = JSON.stringify(params)
    const url = `https://007.bitrix24.ru/rest/291/i67rclyrshqli252/batch?`

    let config = {
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'BITRIX_SM_SALE_UID=0; qmb=.'
      }
    }

    const response = await axios(config)

    console.log(response.data)

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

export default new

BX24API()
