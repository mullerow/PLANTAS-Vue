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
import rootLvl1_3_123 from '@/assets/images/roots/roots-lvl-1/root-lvl1-3-123.png'
import rootLvl1_3_124 from '@/assets/images/roots/roots-lvl-1/root-lvl1-3-124.png'
import rootLvl1_3_125 from '@/assets/images/roots/roots-lvl-1/root-lvl1-3-125.png'
import rootLvl1_3_135 from '@/assets/images/roots/roots-lvl-1/root-lvl1-3-135.png'
import rootLvl1_4_1234 from '@/assets/images/roots/roots-lvl-1/root-lvl1-4-1234.png'
import rootLvl1_4_1235 from '@/assets/images/roots/roots-lvl-1/root-lvl1-4-1235.png'
import rootLvl1_4_1245 from '@/assets/images/roots/roots-lvl-1/root-lvl1-4-1245.png'
import rootLvl1_5_12345 from '@/assets/images/roots/roots-lvl-1/root-lvl1-5-12345.png'
import rootLvl1_6_123456 from '@/assets/images/roots/roots-lvl-1/root-lvl1-6-123456.png'

export const storeData = defineStore('store', {
  state: () => ({
    playgroundData: {
      hexagonData: [],
      amountColumns: 20,
      amountRows: 14,
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
    },
    resourcesData: {
      currentAmounts: {
        amountWater: 260,
        amountEnergie: 440,
        amountphosphat: 0.2,
        amountNitrogen: 8,
        amountCarbohydrates: 100,
        amountLipids: 30,
        amountProteins: 20,
        amountMetabolites: 0
      }
    },
    playTime: {
      timerValue: 0,
      ingameSeason: 'Frühling',
      ingameYear: 1,
      ingameTimeSpeed: 500 // angaben in millisekunden
    }
  }),
  actions: {
    createDefaultHexagons() {
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
          if ((x === 9 && y === 9) || (x === 15 && y === 8)) {
            backgroundImageHexagon = seedling50
            hexagonType = ['seemling', 'eigener Keimling']
          }
          if (x === 5 && y === 9) {
            backgroundImageHexagon = stemLvl1
            hexagonType = ['stam1', 'Stamm Lvl 1']
          }
          if (x === 4 && y === 8) {
            backgroundImageHexagon = leafLvl1Left
            hexagonType = ['leaf1', 'Blatt Lvl 1 links']
          }
          if (x === 6 && y === 8) {
            backgroundImageHexagon = leafLvl1right
            hexagonType = ['leaf1', 'Blatt Lvl 1 rechts']
          }
          if (x === 5 && y === 8) {
            backgroundImageHexagon = leafLvl1straight
            hexagonType = ['leaf1', 'Blatt Lvl 1 nach oben']
          }
          if ((x === 14 && y === 9) || (x === 16 && y === 9) || (x === 15 && y === 9)) {
            backgroundImageHexagon = soilGroundImage
            hexagonType = ['empty soil', 'freier Boden']
          }
          if ((x === 5 && y === 10) || (x === 9 && y === 10) || (x === 15 && y === 9)) {
            backgroundImageHexagon = rootLvl1_1_1
            hexagonType = ['root1', 'Wurzel Lvl 1 Zentral']
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
      // die schleife umläuft das geklickte hexagon und bestimmt den zustand der nachbarhexagone
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

        /// differenzierung zwischen den Pflanzenbereichen
        if (
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[0] !== 'empty soil' &&
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[0] !== 'empty sky'
        ) {
          this.playgroundData.connectionToThePlant = true
          if (this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[0] === 'root1')
            this.playgroundData.positionsOfDevelopedNeighbourHexagons[0] += 1
          this.playgroundData.positionsOfDevelopedNeighbourHexagons[1][IndexPositionNeighbourList] =
            IndexPositionNeighbourList + 1
        }
        IndexPositionNeighbourList += 1
      }
    },
    buildPlantpart(hexagon) {
      // BAUE EINE WURZEL
      if (this.playgroundData.hexagonData[hexagon.hexagonId - 1].hexagonType[0] === 'empty soil') {
        this.findImageOfHexagon(hexagon)
        this.updateImageOfNeighbourHexagons(hexagon)
      }
    },
    findImageOfHexagon(hexagon) {
      //////// Rotation des Hexagons um das Image an die benachtbarten hexagone anzupassen ////////////////////////
      // Bestimmung des passenden Images
      let neighbourPositions = this.playgroundData.positionsOfDevelopedNeighbourHexagons[1].filter(
        (position) => position !== 0
      )

      console.log('neighbourPositions', neighbourPositions)
      let mutatedPositions = []
      let countRotations = 0
      for (let i = 1; i < 7; i++) {
        mutatedPositions = neighbourPositions.map((item) => {
          item += i
          if (item > 6) {
            item -= 6
          }
          return item
        })
        mutatedPositions.sort((a, b) => a - b)
        let concatinatedmutatedPositions = mutatedPositions.join('')
        console.log('concatinatedmutatedPositions', concatinatedmutatedPositions)
        countRotations += 1
        // auswahl des richtigen Image
        if (concatinatedmutatedPositions === '1') {
          hexagon.backgroundImage = rootLvl1_1_1
          break
        } else if (concatinatedmutatedPositions === '12') {
          hexagon.backgroundImage = rootLvl1_2_12
          break
        } else if (concatinatedmutatedPositions === '13') {
          hexagon.backgroundImage = rootLvl1_2_13
          break
        } else if (concatinatedmutatedPositions === '14') {
          hexagon.backgroundImage = rootLvl1_2_14
          break
        } else if (concatinatedmutatedPositions === '123') {
          hexagon.backgroundImage = rootLvl1_3_123
          break
        } else if (concatinatedmutatedPositions === '124') {
          hexagon.backgroundImage = rootLvl1_3_124
          break
        } else if (concatinatedmutatedPositions === '125') {
          hexagon.backgroundImage = rootLvl1_3_125
          break
        } else if (concatinatedmutatedPositions === '135') {
          hexagon.backgroundImage = rootLvl1_3_135
          break
        } else if (concatinatedmutatedPositions === '1234') {
          hexagon.backgroundImage = rootLvl1_4_1234
          break
        } else if (concatinatedmutatedPositions === '1235') {
          hexagon.backgroundImage = rootLvl1_4_1235
          break
        } else if (concatinatedmutatedPositions === '1245') {
          hexagon.backgroundImage = rootLvl1_4_1245
          break
        } else if (concatinatedmutatedPositions === '12345') {
          hexagon.backgroundImage = rootLvl1_5_12345
          break
        } else if (concatinatedmutatedPositions === '123456') {
          hexagon.backgroundImage = rootLvl1_6_123456
          break
        }
      }
      // kalkulation des Rotationswinkels
      hexagon.degreeOfRotation = (6 - countRotations) * 60 // da die rotation anhand des umgebenden zustands bestimmt wird, muss die differenz zu 6 verwendet werden
      console.log('nachbaren:', this.playgroundData.positionsOfDevelopedNeighbourHexagons)

      this.playgroundData.hexagonData[hexagon.hexagonId - 1].hexagonType = ['root1', 'Wurzel Lvl 1']
    },
    updateImageOfNeighbourHexagons(hexagon) {
      let yCoodinateNeighbourHexagon = null
      // die schleife umläuft das geklickte hexagon und bestimmt den zustand der nachbarhexagone
      for (let [deltaX, deltaY] of this.staticData.offsetsNeighbourHexagons) {
        this.playgroundData.positionsOfDevelopedNeighbourHexagons = [0, [0, 0, 0, 0, 0, 0]]
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
        this.checkForConnectionToPlant(this.playgroundData.hexagonData[idNeighbourHexagon - 1])
        // Ausschließen, das hexagone aktualisiert werden, wenn sie keine wurzeln sind

        if (this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[0] === 'root1') {
          this.findImageOfHexagon(this.playgroundData.hexagonData[idNeighbourHexagon - 1])
        }
      }
    }
  },
  getters: {}
})
