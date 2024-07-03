import { defineStore } from 'pinia'
import soilGroundImage from '@/assets/images/ground-soil.png'
import skyImage from '@/assets/images/blue-sky.png'
import seedling50 from '@/assets/images/seedling50x50.png'
export const storeData = defineStore('store', {
  state: () => ({
    playgroundData: {
      hexagonData: [],
      amountColumns: 16,
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
          let brightness = 1
          if (y % 2 === 0) {
            xShiftOfHexagon = 25
          }
          if (y === 1) {
            brightness = 1.5
          } else if (y === 2) {
            brightness = 1.4
            yShiftOfHexagon = -13
          } else if (y === 3) {
            yShiftOfHexagon = -26
            brightness = 1.3
          } else if (y === 4) {
            yShiftOfHexagon = -39
            brightness = 1.2
          } else if (y === 5) {
            yShiftOfHexagon = -52
            brightness = 1.1
          } else if (y === 6) {
            yShiftOfHexagon = -65
            brightness = 1.0
          } else if (y === 7) {
            yShiftOfHexagon = -78
            brightness = 0.9
          } else if (y === 8) {
            yShiftOfHexagon = -91
            brightness = 0.8
          } else if (y === 9) {
            yShiftOfHexagon = -104
            brightness = 0.7
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
          // Start Keimlingimage
          if (x === 8 && y === 9) {
            backgroundImageHexagon = seedling50
            hexagonType = 'eigener Keimling'
          }
          let hexagonObject = {
            hexagonId: y * this.playgroundData.amountColumns + x - 10,
            hexagonXCoordinate: x,
            hexagonYCoordinate: y,
            additionalYShiftOfHexagon: yShiftOfHexagon,
            additionalXShiftOfHexagon: xShiftOfHexagon,
            backgroundImage: backgroundImageHexagon,
            hexagonType: hexagonType,
            brightnessLevel: brightness
          }
          this.playgroundData.hexagonData.push(hexagonObject)
        }
      }
    }
  },
  getters: {}
})
