import BX24API from '../bx24'
import { getCurrentUser } from './user'
import { getDealIdFromPlacement } from './placement'

// ЗАДАЧИ

// Создание новой задачи

const createTask = async (newTask) => {

  const user = await getCurrentUser()
  const dealId = getDealIdFromPlacement()

  console.log({ dealId, user })

  const params = {
    fields: {
      'TITLE': newTask.title,
      'DESCRIPTION': newTask.description,
      'RESPONSIBLE_ID': parseInt(user['ID']),
      'UF_CRM_TASK': [`D_${dealId}`]
    },

  }

  console.log({ params })

  const response = await BX24API.callMethod('tasks.task.add', params)

  const taskId = response.result.task.id

  console.log({ taskId, task: response.result.task })

  newTask.title = ''
  newTask.description = ''

}

// Изменение полей задачи

const updateTask = async taskId => {

  const params = {
    taskId: 8295,
    fields: {
      'UF_CRM_TASK': ['D_5287']
    }
  }

  const updated = await BX24API.callMethod('tasks.task.update', params)

  const task = await BX24API.callMethod('tasks.task.get', {
    taskId: 8295,
    select: ['UF_CRM_TASK']
  })

  console.log({ updated, task })

}

// Получить все поля доступные в задачах

const getTaskFields = async () => {
  return console.log(await BX24API.callMethod('tasks.task.getFields'))
}

export {
  createTask,
  updateTask,
  getTaskFields
}