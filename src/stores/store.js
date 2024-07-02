import { defineStore } from 'pinia'

export const storeData = defineStore('store', {
  state: () => ({
    playgroundData: {
      hexagonData: [],
      amountColumns: 10,
      amountRows: 10
    }
  }),
  actions: {
    createHexagons() {
      for (let y = 1; y <= this.playgroundData.amountRows; y++) {
        for (let x = 1; x <= this.playgroundData.amountColumns; x++) {
          let hexagonObject = {
            hexagonId: y * this.playgroundData.amountColumns + x - 10,
            hexagonXCoordinate: x,
            hexagonYCoordinate: y
          }
          this.playgroundData.hexagonData.push(hexagonObject)
        }
      }
    }
  },
  getters: {}
})
