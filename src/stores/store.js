import { defineStore } from 'pinia'
import soilGroundImage from '@/assets/images/ground-soil.png'
import skyImage from '@/assets/images/blue-sky.png'
import seedling50 from '@/assets/images/seedling50x50.png'
import stemLvl1 from '@/assets/images/stem-lvl1.png'
import leafLvl1Left from '@/assets/images/leaf-lvl1-left-1.png'
import leafLvl1right from '@/assets/images/leaf-lvl1-right-1.png'

export const storeData = defineStore('store', {
  state: () => ({
    playgroundData: {
      hexagonData: [],
      amountColumns: 20,
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
          if (x % 2 === 0) {
            yShiftOfHexagon += 22
          }
          if (y === 1) {
            yShiftOfHexagon -= 10
            brightness = 1.7
          } else if (y === 2) {
            yShiftOfHexagon -= 20
            brightness = 1.6
          } else if (y === 3) {
            yShiftOfHexagon -= 30
            brightness = 1.5
          } else if (y === 4) {
            yShiftOfHexagon -= 40
            brightness = 1.4
          } else if (y === 5) {
            yShiftOfHexagon -= 50
            brightness = 1.3
          } else if (y === 6) {
            yShiftOfHexagon -= 60
            brightness = 1.2
          } else if (y === 7) {
            yShiftOfHexagon -= 70
            brightness = 1.1
          } else if (y === 8) {
            yShiftOfHexagon -= 80
            brightness = 1.0
          } else if (y === 9) {
            yShiftOfHexagon -= 90
            brightness = 0.9
          } else if (y === 10) {
            yShiftOfHexagon -= 100
          } else if (y === 11) {
            yShiftOfHexagon -= 110
          } else if (y === 12) {
            yShiftOfHexagon -= 120
          } else if (y === 13) {
            yShiftOfHexagon -= 130
          }
          if (x === 2) {
            xShiftOfHexagon = -13
          } else if (x === 3) {
            xShiftOfHexagon = -26
          } else if (x === 4) {
            xShiftOfHexagon = -39
          } else if (x === 5) {
            xShiftOfHexagon = -52
          } else if (x === 6) {
            xShiftOfHexagon = -65
          } else if (x === 7) {
            xShiftOfHexagon = -78
          } else if (x === 8) {
            xShiftOfHexagon = -91
          } else if (x === 9) {
            xShiftOfHexagon = -104
          } else if (x === 10) {
            xShiftOfHexagon = -117
          } else if (x === 11) {
            xShiftOfHexagon = -130
          } else if (x === 12) {
            xShiftOfHexagon = -143
          } else if (x === 13) {
            xShiftOfHexagon = -156
          } else if (x === 14) {
            xShiftOfHexagon = -169
          } else if (x === 15) {
            xShiftOfHexagon = -182
          } else if (x === 16) {
            xShiftOfHexagon = -195
          } else if (x === 17) {
            xShiftOfHexagon = -208
          } else if (x === 18) {
            xShiftOfHexagon = -221
          } else if (x === 19) {
            xShiftOfHexagon = -234
          } else if (x === 20) {
            xShiftOfHexagon = -247
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
          if (x === 7 && y === 9) {
            backgroundImageHexagon = stemLvl1
            hexagonType = 'eigener Keimling'
          }
          if (x === 6 && y === 8) {
            backgroundImageHexagon = leafLvl1Left
            hexagonType = 'eigener Keimling'
          }
          if (x === 7 && y === 8) {
            backgroundImageHexagon = leafLvl1right
            hexagonType = 'eigener Keimling'
          }
          ///// Erzeugen des Objekts für die individuellen HexagonDaten
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
