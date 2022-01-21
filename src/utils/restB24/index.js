import { getTaskFields, updateTask, createTask, getTaskAnchoredToDeal } from './task'
import { bindPlacement, unBindPlacement, getDealIdFromPlacement } from './placement'
import { getLists } from './list'
import { getCurrentUser, getCrmUsersList } from './user'
import { getDealInfo } from './deal'


export {
  bindPlacement,
  unBindPlacement,
  getDealIdFromPlacement,

  getTaskFields,
  updateTask,
  createTask,
  getTaskAnchoredToDeal,

  getLists,

  getCurrentUser,
  getCrmUsersList,

  getDealInfo


}