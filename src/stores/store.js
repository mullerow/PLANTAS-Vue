import { defineStore } from 'pinia'
import soilGroundImage from '@/assets/images/ground-soil.png'
import skyImage from '@/assets/images/blue-sky.png'
import seedling50 from '@/assets/images/seedling50x50.png'
import stemLvl1 from '@/assets/images/stem-lvl1-2.png'
import leafLvl1Left from '@/assets/images/leafs/leaf-lvl1-left-1.png'
import leafLvl1right from '@/assets/images/leafs/leaf-lvl1-right-1.png'
import leafLvl1straight from '@/assets/images/leafs/leaf-lvl1-straight1.png'
import rootLvl1Center from '@/assets/images/roots/root-center-lvl1-1.png'

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
        let xShiftOfHexagon = 13
        for (let x = 1; x <= this.playgroundData.amountColumns; x++) {
          // verschieben der hexagone, sodass diese eine lückenlose Fläch ergeben
          let yShiftOfHexagon = 0
          let backgroundImageHexagon = ''
          let hexagonType = ''
          let brightness = 1
          xShiftOfHexagon -= 13
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
          if (x === 6 && y === 9) {
            backgroundImageHexagon = stemLvl1
            hexagonType = 'Stamm Lvl 1'
          }
          if (x === 5 && y === 9) {
            backgroundImageHexagon = leafLvl1Left
            hexagonType = 'Blatt Lvl 1 links'
          }
          if (x === 7 && y === 9) {
            backgroundImageHexagon = leafLvl1right
            hexagonType = 'Blatt Lvl 1 rechts'
          }
          if (x === 6 && y === 8) {
            backgroundImageHexagon = leafLvl1straight
            hexagonType = 'Blatt Lvl 1 nach oben'
          }
          if ((x === 6 && y === 10) || (x === 8 && y === 10)) {
            backgroundImageHexagon = rootLvl1Center
            hexagonType = 'Wurzel Lvl 1 Zentral'
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
