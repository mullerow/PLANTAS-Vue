import { defineStore } from 'pinia'
import soilGroundImage from '@/assets/images/ground-soil.png'
import skyImage from '@/assets/images/blue-sky.png'
import seedling50 from '@/assets/images/seedling50x50.png'
import stemLvl1 from '@/assets/images/stems/stem-lvl1-2.png'
import leafLvl1Left from '@/assets/images/leafs/leaf-lvl1-left-1.png'
import leafLvl1right from '@/assets/images/leafs/leaf-lvl1-right-1.png'
import leafLvl1straight from '@/assets/images/leafs/leaf-lvl1-straight1.png'
import rootLvl1Center from '@/assets/images/roots/root-center-lvl1-1.png'

export const storeData = defineStore('store', {
  state: () => ({
    playgroundData: {
      hexagonData: [],
      amountColumns: 20,
      amountRows: 13,
      connectionToThePlant: false
    }
  }),
  actions: {
    createHexagons() {
      let additionalIncreaseOfYShift = 0
      let brightness = 1.7
      for (let y = 1; y <= this.playgroundData.amountRows; y++) {
        let xShiftOfHexagon = 13
        additionalIncreaseOfYShift -= 10
        if (y <= 9) {
          brightness -= 0.1
        } else {
          brightness = 1
        }
        for (let x = 1; x <= this.playgroundData.amountColumns; x++) {
          // verschieben der hexagone, sodass diese eine lückenlose Fläch ergeben
          let yShiftOfHexagon = 0
          let backgroundImageHexagon = ''
          let hexagonType = ''

          xShiftOfHexagon -= 13
          if (x % 2 === 0) {
            yShiftOfHexagon += 22
          }
          yShiftOfHexagon = yShiftOfHexagon + additionalIncreaseOfYShift
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
            hexagonId:
              y * this.playgroundData.amountColumns + x - this.playgroundData.amountColumns,
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
    },
    checkForDevelopmentOptions(hexagon) {
      if (hexagon.hexagonType === 'freier Himmel') {
        console.log('freier Himmel')
        this.checkForConnectionToPlant(hexagon)
      } else if (hexagon.hexagonType === 'freier Boden') {
        console.log('freier Boden')
        this.checkForConnectionToPlant(hexagon)
      } else {
        console.log('Fläche schon bebaut')
      }
    },
    checkForConnectionToPlant(hexagon) {
      let yCoodinateNeighbourHexagon = null
      for (let deltaY = -1; deltaY <= 1; deltaY++) {
        for (let deltaX = -1; deltaX <= 1; deltaX++) {
          /// Notwendige Korrekturen für die versetzten kacheln
          if (
            (deltaX === -1 && deltaY === 1) ||
            (deltaX === 1 && deltaY === 1) ||
            (deltaX === 0 && deltaY === 0)
          ) {
            continue
          }
          if (hexagon.hexagonXCoordinate % 2 === 0 && deltaX !== 0) {
            yCoodinateNeighbourHexagon = hexagon.hexagonYCoordinate + deltaY + 1
          } else {
            yCoodinateNeighbourHexagon = hexagon.hexagonYCoordinate + deltaY
          }
          let xCoodinateNeighbourHexagon = hexagon.hexagonXCoordinate + deltaX

          console.log(
            '----------------------------------------------------------------------------------'
          )
          console.log('xCoodinateNeighbourHexagon', xCoodinateNeighbourHexagon)
          console.log('yCoodinateNeighbourHexagon', yCoodinateNeighbourHexagon)
          if (
            yCoodinateNeighbourHexagon <= 0 ||
            xCoodinateNeighbourHexagon <= 0 ||
            xCoodinateNeighbourHexagon > this.playgroundData.amountColumns ||
            yCoodinateNeighbourHexagon > this.playgroundData.amountRows
          ) {
            continue
          }
          let idNeighbourHexagon =
            yCoodinateNeighbourHexagon * this.playgroundData.amountColumns +
            xCoodinateNeighbourHexagon -
            this.playgroundData.amountColumns
          if (
            this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType !==
              'freier Boden' &&
            this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType !== 'freier Himmel'
          ) {
            console.log('Hier Darf gewuzelt werden!')
            this.playgroundData.connectionToThePlant = true
          }
        }
      }
    },
    buildPlantpart(hexagonId) {
      this.playgroundData.hexagonData[hexagonId - 1].backgroundImage = rootLvl1Center
      this.playgroundData.hexagonData[hexagonId - 1].hexagonType = 'Wurzel Lvl 1 Zentral'
    }
  },
  getters: {}
})
