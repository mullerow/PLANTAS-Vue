import { defineStore } from 'pinia'

export const storeData = defineStore('store', {
  state: () => ({
    temporaryData: {
      testArray: [1, 2, 3]
    }
  }),
  actions: {},
  getters: {}
})
