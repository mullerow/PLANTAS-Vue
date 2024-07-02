import { defineStore } from 'pinia'
import soilGroundImage from '@/assets/images/ground-soil.png'
import skyImage from '@/assets/images/blue-sky.png'
export const storeData = defineStore('store', {
  state: () => ({
    playgroundData: {
      hexagonData: [],
      amountColumns: 10,
      amountRows: 13
    }
  }),
  actions: {
    createHexagons() {
      for (let y = 1; y <= this.playgroundData.amountRows; y++) {
        for (let x = 1; x <= this.playgroundData.amountColumns; x++) {
          // verschieben der hexagone
          let yShiftOfHexagon = 0
          let xShiftOfHexagon = 0
          let backgroundImageHexagon = ''
          let hexagonType = ''
          if (y % 2 === 0) {
            xShiftOfHexagon = 25
          }
          if (y === 2) {
            yShiftOfHexagon = -13
          } else if (y === 3) {
            yShiftOfHexagon = -26
          } else if (y === 4) {
            yShiftOfHexagon = -39
          } else if (y === 5) {
            yShiftOfHexagon = -52
          } else if (y === 6) {
            yShiftOfHexagon = -65
          } else if (y === 7) {
            yShiftOfHexagon = -78
          } else if (y === 8) {
            yShiftOfHexagon = -91
          } else if (y === 9) {
            yShiftOfHexagon = -104
          } else if (y === 10) {
            yShiftOfHexagon = -117
          } else if (y === 11) {
            yShiftOfHexagon = -130
          } else if (y === 12) {
            yShiftOfHexagon = -143
          } else if (y === 13) {
            yShiftOfHexagon = -156
          }
          // hinzufügen der hintergrundbilder
          if (y < 10) {
            backgroundImageHexagon = skyImage
            hexagonType = 'freier Himmel'
          } else {
            backgroundImageHexagon = soilGroundImage
            hexagonType = 'freier Boden'
          }
          let hexagonObject = {
            hexagonId: y * this.playgroundData.amountColumns + x - 10,
            hexagonXCoordinate: x,
            hexagonYCoordinate: y,
            additionalYShiftOfHexagon: yShiftOfHexagon,
            additionalXShiftOfHexagon: xShiftOfHexagon,
            backgroundImage: backgroundImageHexagon,
            hexagonType: hexagonType
          }
          this.playgroundData.hexagonData.push(hexagonObject)
        }
      }
    }
  },
  getters: {}
})
