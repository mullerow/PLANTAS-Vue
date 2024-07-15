import { defineStore } from 'pinia'
import soilGroundImage from '@/assets/images/ground-soil.png'
import skyImage from '@/assets/images/blue-sky.png'
import seedling50 from '@/assets/images/seedling50x50.png'
import stemLvl1 from '@/assets/images/stems/stem-lvl1-2.png'
import leafLvl1Left from '@/assets/images/leafs/leaf-lvl1-left-1.png'
import leafLvl1right from '@/assets/images/leafs/leaf-lvl1-right-1.png'
import leafLvl1straight from '@/assets/images/leafs/leaf-lvl1-straight1.png'
import rootLvl1_1_1 from '@/assets/images/roots/roots-lvl-1/root-lvl1-1-1.png'
import rootLvl1_2_12 from '@/assets/images/roots/roots-lvl-1/root-lvl1-2-12.png'
import rootLvl1_2_13 from '@/assets/images/roots/roots-lvl-1/root-lvl1-2-13.png'
import rootLvl1_2_14 from '@/assets/images/roots/roots-lvl-1/root-lvl1-2-14.png'
import rootLvl2Center from '@/assets/images/roots/root-center-lvl2-1.png'

export const storeData = defineStore('store', {
  state: () => ({
    playgroundData: {
      hexagonData: [],
      amountColumns: 20,
      amountRows: 13,
      connectionToThePlant: false,
      positionsOfDevelopedNeighbourHexagons: [0, [0, 0, 0, 0, 0, 0]] // der erste eintrag legt die Anzahl der bebauten nachbarfelder fest, der zweite Eintrag/Liste bestimmt anhand der Zahlen in welche Richtung bebaut ist
    },
    staticData: {
      offsetsNeighbourHexagons: [
        [0, -1],
        [1, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
        [-1, -1]
      ]
    }
  }),
  actions: {
    createHexagons() {
      let additionalIncreaseOfYShift = 0
      let brightness = 1.7
      for (let y = 1; y <= this.playgroundData.amountRows; y++) {
        let xShiftOfHexagon = 13
        additionalIncreaseOfYShift -= 6
        if (y <= 9) {
          brightness -= 0.1
        } else {
          brightness = 1
        }
        for (let x = 1; x <= this.playgroundData.amountColumns; x++) {
          // verschieben der hexagone, sodass diese eine lückenlose Fläch ergeben
          let yShiftOfHexagon = 0
          let backgroundImageHexagon = ''
          let hexagonType = []

          xShiftOfHexagon -= 13
          if (x % 2 === 0) {
            yShiftOfHexagon += 22
          }
          yShiftOfHexagon = yShiftOfHexagon + additionalIncreaseOfYShift
          // hinzufügen der hintergrundbilder für den Start bzw. Tests
          if (y < 10) {
            backgroundImageHexagon = skyImage
            hexagonType = ['empty sky', 'freier Himmel']
          } else {
            backgroundImageHexagon = soilGroundImage
            hexagonType = ['empty soil', 'freier Boden']
          }
          // Start Keimlingimage
          if (x === 8 && y === 9) {
            backgroundImageHexagon = seedling50
            hexagonType = ['seemling', 'eigener Keimling']
          }
          if (x === 6 && y === 9) {
            backgroundImageHexagon = stemLvl1
            hexagonType = ['stam1', 'Stamm Lvl 1']
          }
          if (x === 5 && y === 9) {
            backgroundImageHexagon = leafLvl1Left
            hexagonType = ['leaf1', 'Blatt Lvl 1 links']
          }
          if (x === 7 && y === 9) {
            backgroundImageHexagon = leafLvl1right
            hexagonType = ['leaf1', 'Blatt Lvl 1 rechts']
          }
          if (x === 6 && y === 8) {
            backgroundImageHexagon = leafLvl1straight
            hexagonType = ['leaf1', 'Blatt Lvl 1 nach oben']
          }
          if ((x === 6 && y === 10) || (x === 8 && y === 10)) {
            backgroundImageHexagon = rootLvl1_1_1
            hexagonType = ['root1', 'Wurzel Lvl 1 Zentral']
          }
          if ((x === 14 && y === 9) || (x === 16 && y === 9) || (x === 15 && y === 9)) {
            backgroundImageHexagon = soilGroundImage
            hexagonType = ['empty soil', 'freier Boden']
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
            brightnessLevel: brightness,
            degreeOfRotation: '0'
          }
          this.playgroundData.hexagonData.push(hexagonObject)
        }
      }
    },
    checkForDevelopmentOptions(hexagon) {
      if (hexagon.hexagonType[0] === 'empty sky') {
        console.log('freier Himmel')
        this.checkForConnectionToPlant(hexagon)
      } else if (hexagon.hexagonType[0] === 'empty soil') {
        console.log('freier Boden')
        this.checkForConnectionToPlant(hexagon)
      } else if (hexagon.hexagonType[0] === 'root1') {
        this.checkForConnectionToPlant(hexagon)
      } else {
        console.log('Fläche schon bebaut')
      }
    },
    checkForConnectionToPlant(hexagon) {
      let yCoodinateNeighbourHexagon = null
      this.playgroundData.positionsOfDevelopedNeighbourHexagons = [0, [0, 0, 0, 0, 0, 0]]
      let IndexPositionNeighbourList = 0
      for (let [deltaX, deltaY] of this.staticData.offsetsNeighbourHexagons) {
        /// Notwendige koordinaten Korrekturen für die versetzten kacheln

        if (hexagon.hexagonXCoordinate % 2 === 0 && deltaX !== 0) {
          yCoodinateNeighbourHexagon = hexagon.hexagonYCoordinate + deltaY + 1
        } else {
          yCoodinateNeighbourHexagon = hexagon.hexagonYCoordinate + deltaY
        }
        let xCoodinateNeighbourHexagon = hexagon.hexagonXCoordinate + deltaX
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
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[1] !==
            'freier Boden' &&
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[1] !== 'freier Himmel'
        ) {
          this.playgroundData.connectionToThePlant = true

          this.playgroundData.positionsOfDevelopedNeighbourHexagons[0] += 1
          this.playgroundData.positionsOfDevelopedNeighbourHexagons[1][IndexPositionNeighbourList] =
            IndexPositionNeighbourList + 1

          console.log('IndexPositionNeighbourList', IndexPositionNeighbourList)
        }
        IndexPositionNeighbourList += 1
        /// Rotation des Hexagons um die Images an die benachtbarten hexagone anzupassen
        const concatinatedPositions = this.playgroundData.positionsOfDevelopedNeighbourHexagons[1]
          .filter((position) => position !== 0)
          .join('')
        const ImageNameofRootStyle = `rootLvl1_${this.playgroundData.positionsOfDevelopedNeighbourHexagons[0]}_${concatinatedPositions}`
        console.log('imagename', ImageNameofRootStyle)
        if (this.playgroundData.positionsOfDevelopedNeighbourHexagons[0] >= 0) {
          hexagon.degreeOfRotation = '60'
        }
        console.log('nachbaren:', this.playgroundData.positionsOfDevelopedNeighbourHexagons)
      }
    },
    buildPlantpart(hexagonId) {
      if (this.playgroundData.hexagonData[hexagonId - 1].hexagonType[0] === 'empty soil') {
        this.playgroundData.hexagonData[hexagonId - 1].backgroundImage = rootLvl1_1_1
        this.playgroundData.hexagonData[hexagonId - 1].hexagonType = [
          'root1',
          'Wurzel Lvl 1 Zentral'
        ]
      } else if (this.playgroundData.hexagonData[hexagonId - 1].hexagonType[0] === 'root1') {
        this.playgroundData.hexagonData[hexagonId - 1].backgroundImage = rootLvl2Center
        this.playgroundData.hexagonData[hexagonId - 1].hexagonType = [
          'root2',
          'Wurzel Lvl 2 Zentral'
        ]
      }
    }
  },
  getters: {}
})
