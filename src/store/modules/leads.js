const leads = {

  namespaced: true,

  actions: {
    setLeadCollection: ({ commit }, leadCollection) => {
      commit('SET_LEAD_COLLECTION', leadCollection)
    }
  },

  mutations: {
    SET_LEAD_COLLECTION: (state, leadCollection) => state.leadCollection = leadCollection
  },

  getters: {
    leadCollection: state => state.leadCollection
  },

  state: {
    leadCollection: ['1', '2']
  }
}

export default leads