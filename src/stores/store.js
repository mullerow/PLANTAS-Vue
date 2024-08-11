import { defineStore } from 'pinia'
import soilGroundImage from '@/assets/images/ground-soil.png'
import skyImage from '@/assets/images/blue-sky.png'
import seedling50 from '@/assets/images/seedling50x50.png'
import leafLvl1_1_1 from '@/assets/images/leafs/leaf-lvl1-1-1.png'
import leafLvl1_2_1 from '@/assets/images/leafs/leaf-lvl1-2-1.png'
import leafLvl1_3_1 from '@/assets/images/leafs/leaf-lvl1-3-1.png'
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
import stemLvl1_1_1 from '@/assets/images/stems/stems-lvl-1/stem-lvl1-1-1.png'
import stemLvl1_2_14 from '@/assets/images/stems/stems-lvl-1/stem-lvl1-2-14.png'
import stemLvl1_2_13 from '@/assets/images/stems/stems-lvl-1/stem-lvl1-2-13.png'
import stemLvl1_2_15 from '@/assets/images/stems/stems-lvl-1/stem-lvl1-2-15.png'
import stemLvl1_3_124 from '@/assets/images/stems/stems-lvl-1/stem-lvl1-3-124.png'
import stemLvl1_3_146 from '@/assets/images/stems/stems-lvl-1/stem-lvl1-3-146.png'
import stemLvl1_3_136 from '@/assets/images/stems/stems-lvl-1/stem-lvl1-3-136.png'
import stemLvl1_4_1246 from '@/assets/images/stems/stems-lvl-1/stem-lvl1-4-1246.png'

export const storeData = defineStore('store', {
  state: () => ({
    playgroundData: {
      hexagonData: [],
      amountColumns: 20, // Spielfeldgröße
      amountRows: 16, // Spielfeldgröße
      connectionToThePlant: false,
      positionsOfDevelopedNeighbourHexagons: [0, [0, 0, 0, 0, 0, 0]], // der erste eintrag legt die Anzahl der bebauten nachbarfelder fest, der zweite Eintrag/Liste bestimmt anhand der Zahlen in welche Richtung bebaut ist
      currentStemConnectionChainNumber: 0,
      amountOfNeighbourStemConnections: 0,
      smallestChainNumber: 100, // muss ein ausreichend hoch bzw. unereichbarer Wert sein
      currentUpdateOfNeighbourHexagonImages: false,
      XCoordinateBuildedHexagon: 0,
      YCoordinateBuildedHexagon: 0,
      XCoordinateNeighbourHexagonSmallestChainNumber: 0,
      YCoordinateNeighbourHexagonSmallestChainNumber: 0,
      idNeighbourHexagonSmallestChainNumber: 0,
      idTestSmallestChainNumber: 0,
      XCoordinateTestSmallestChainNumber: 0,
      smallestTestChainNumber: 100,
      counterBuildedLeafs: 0
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
        sufficentResources: true,
        amountWater: 2600,
        amountEnergie: 440,
        amountphosphor: 2,
        amountNitrogen: 80,
        amountCarbohydrates: 100,
        amountLipids: 30,
        amountProteins: 20,
        amountMetabolites: 0
      },
      resourcesProductionRates: {
        productionRateWater: 1,
        productionRateNitrogen: 0.1,
        productionRatePhosphor: 0.1,
        productionRateEnergie: 0
      },
      resourceConsumtionEffortList: [
        [50, 5, 0.1], // erste Liste Kosten für Wurzel, zweite Liste für Stämme
        [20, 1, 0.1]
      ]
    },
    playTime: {
      timerValue: 0,
      ingameSeason: 'Frühling',
      ingameYear: 1,
      ingameTimeSpeed: 1000 // Angabe in Millisekunden
    },
    structuralAnalysisData: {
      balanceLevel: 0,
      stemBasicXLevel: 5
    }
  }),
  actions: {
    ///////////////////////////////////////////////////////////////////////////////////////
    ////// Spielfeld initialisieren //////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    createDefaultHexagons() {
      let additionalIncreaseOfYShift = 0
      let brightness = 1.8
      for (let y = 1; y <= this.playgroundData.amountRows; y++) {
        let xShiftOfHexagon = 13
        additionalIncreaseOfYShift -= 6
        if (y <= 10) {
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
          if (y < 11) {
            backgroundImageHexagon = skyImage
            hexagonType = ['empty sky', 'freier Himmel']
          } else {
            backgroundImageHexagon = soilGroundImage
            hexagonType = ['empty soil', 'freier Boden']
          }
          if ((x === 9 && y === 10) || (x === 15 && y === 9)) {
            backgroundImageHexagon = seedling50
            hexagonType = ['seemling', 'eigener Keimling']
          }
          if (x === 5 && y === 10) {
            backgroundImageHexagon = stemLvl1_1_1
            hexagonType = ['stem1', 'Stamm Lvl 1']
            this.stemBasicXLevel = 5
          }
          if ((x === 14 && y === 10) || (x === 16 && y === 10) || (x === 15 && y === 10)) {
            backgroundImageHexagon = soilGroundImage
            hexagonType = ['empty soil', 'freier Boden']
          }
          if ((x === 5 && y === 11) || (x === 9 && y === 11) || (x === 15 && y === 10)) {
            backgroundImageHexagon = rootLvl1_1_1
            hexagonType = ['root1', 'Wurzel Lvl 1']
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
            degreeOfRotation: '0',
            hexagonStemConnectionChainNumber: 0
          }
          this.playgroundData.hexagonData.push(hexagonObject)
        }
      }
      this.playgroundData.hexagonData[184].hexagonStemConnectionChainNumber = 1
    },
    ///////////////////////////////////////////////////////////////////////////////////////
    ////// Pflanzenentwicklung //////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    checkForDevelopmentOptions(hexagon) {
      this.playgroundData.amountOfNeighbourStemConnections = 0
      if (hexagon.hexagonType[0] === 'empty sky') {
        console.log('freier Himmel')
        console.log('----------------------------------------------------')
        this.checkForAmountNeighbourStemConnections(hexagon)
        this.checkForConnectionToPlant(hexagon)
      } else if (hexagon.hexagonType[0] === 'empty soil') {
        console.log('freier Boden')
        this.checkForConnectionToPlant(hexagon)
      } else if (hexagon.hexagonType[0] === 'root1') {
        this.checkForConnectionToPlant(hexagon)
      } else if (hexagon.hexagonType[0] === 'leaf1') {
        this.checkForConnectionToPlant(hexagon)
        console.log('Blatt LvL1')
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

        /// Speichern der bebauten Nachbarpositionen
        if (
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[0] !== 'empty soil' &&
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[0] !== 'empty sky'
        ) {
          this.playgroundData.connectionToThePlant = true
          this.playgroundData.positionsOfDevelopedNeighbourHexagons[0] += 1
          this.playgroundData.positionsOfDevelopedNeighbourHexagons[1][IndexPositionNeighbourList] =
            IndexPositionNeighbourList + 1
        }
        IndexPositionNeighbourList += 1
      }
    },
    checkForAmountNeighbourStemConnections(hexagon) {
      let yCoodinateNeighbourHexagon = null
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
        if (this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[0] === 'stem1') {
          this.playgroundData.amountOfNeighbourStemConnections += 1
        }
      }
    },
    buildPlantpart(hexagon, developmentPlantPartClass) {
      this.resourcesData.currentAmounts.sufficentResources = true
      this.playgroundData.smallestTestChainNumber = 100
      // Baue eine Wurzel
      this.resourceConsumtionToBuild(developmentPlantPartClass)
      if (this.resourcesData.currentAmounts.sufficentResources === true) {
        if (developmentPlantPartClass === 'stem') {
          this.findSmallestStemConnectionChainNumber(hexagon)
        }
        this.findImageOfHexagon(hexagon, developmentPlantPartClass)
        this.playgroundData.currentUpdateOfNeighbourHexagonImages = true // notwendig, damit die images der stämme korrekt ausgewählt werden
        this.updateImageOfNeighbourHexagons(hexagon, developmentPlantPartClass)
        this.playgroundData.currentUpdateOfNeighbourHexagonImages = false
        this.updateResourceHarvest(hexagon, developmentPlantPartClass)
      }
    },
    findImageOfHexagon(hexagon, developmentPlantPartClass) {
      //////// Rotation des Hexagons um das Image an die benachtbarten hexagone anzupassen ////////////////////////
      let neighbourPositions = []
      let positionWithoutSmallestChainNumber = null
      let positonOfNeighbourSmallestChainNumber = null
      // Bestimmung des passenden Images (es werden die Positionen der bebauten nachbarhexagone schritweise "gedreht" bis sie deckungsgelcih mit einem vorhandenen Image sind)
      if (this.playgroundData.currentUpdateOfNeighbourHexagonImages === true) {
        this.findSmallestStemConnectionChainNumberNextToNeighbourHexagon(hexagon)
        let deltaID = this.playgroundData.idTestSmallestChainNumber - hexagon.hexagonId
        console.warn(
          'Test',
          this.playgroundData.idTestSmallestChainNumber,
          '-',
          hexagon.hexagonId,
          '=',
          deltaID
        )
        // nötige korrektur, aufgrund der versetzten hexagone
        if (
          hexagon.hexagonXCoordinate % 2 === 0 &&
          this.playgroundData.XCoordinateTestSmallestChainNumber !== hexagon.hexagonXCoordinate
        ) {
          deltaID -= this.playgroundData.amountColumns
        } /// es werden aus den benachtbarten bebauten hexagon positionen die direkten nachtbarn des hexagons mit der kleinsten StemChainNumber entfernt, sodass die Images korrekt gewählt werden
        console.log('deltaID', deltaID) // Für die spiegelverkehrten Image von 2,4 und 4,6 muss die relative position der beiden anbindungen zueinander ermittelt werden
        if (deltaID === -20) {
          positonOfNeighbourSmallestChainNumber = 1
        } else if (deltaID === -19) {
          positonOfNeighbourSmallestChainNumber = 2
        } else if (deltaID === 1) {
          positonOfNeighbourSmallestChainNumber = 3
        } else if (deltaID === 20) {
          positonOfNeighbourSmallestChainNumber = 4
        } else if (deltaID === -1) {
          positonOfNeighbourSmallestChainNumber = 5
        } else if (deltaID === -21) {
          positonOfNeighbourSmallestChainNumber = 6
        }

        if (deltaID === -20) {
          this.playgroundData.positionsOfDevelopedNeighbourHexagons[1] =
            this.playgroundData.positionsOfDevelopedNeighbourHexagons[1].filter(
              (position) => position !== 2 && position !== 6
            )
        } else if (deltaID === -19) {
          this.playgroundData.positionsOfDevelopedNeighbourHexagons[1] =
            this.playgroundData.positionsOfDevelopedNeighbourHexagons[1].filter(
              (position) => position !== 1 && position !== 3
            )
        } else if (deltaID === 1) {
          this.playgroundData.positionsOfDevelopedNeighbourHexagons[1] =
            this.playgroundData.positionsOfDevelopedNeighbourHexagons[1].filter(
              (position) => position !== 2 && position !== 4
            )
        } else if (deltaID === 20) {
          this.playgroundData.positionsOfDevelopedNeighbourHexagons[1] =
            this.playgroundData.positionsOfDevelopedNeighbourHexagons[1].filter(
              (position) => position !== 3 && position !== 5
            )
        } else if (deltaID === -1) {
          this.playgroundData.positionsOfDevelopedNeighbourHexagons[1] =
            this.playgroundData.positionsOfDevelopedNeighbourHexagons[1].filter(
              (position) => position !== 4 && position !== 6
            )
        } else if (deltaID === -21) {
          this.playgroundData.positionsOfDevelopedNeighbourHexagons[1] =
            this.playgroundData.positionsOfDevelopedNeighbourHexagons[1].filter(
              (position) => position !== 5 && position !== 1
            )
        }
      }

      // Bestimmen aller bebauten Nachbar Hexagone
      neighbourPositions = this.playgroundData.positionsOfDevelopedNeighbourHexagons[1].filter(
        (position) => position !== 0
      )
      console.log('neighbourPositions', neighbourPositions)
      for (let item of neighbourPositions) {
        console.log('item', item, positonOfNeighbourSmallestChainNumber)
        if (item !== positonOfNeighbourSmallestChainNumber) {
          positionWithoutSmallestChainNumber = item
        }
      }
      let mutatedPositions = []
      let countRotations = 0
      for (let i = 0; i < 6; i++) {
        mutatedPositions = neighbourPositions.map((item) => {
          item += i
          if (item > 6) {
            item -= 6
          }
          return item
        })
        mutatedPositions.sort((a, b) => a - b)
        let concatinatedmutatedPositions = mutatedPositions.join('')
        countRotations += 1
        // auswahl des richtigen Image für Wurzeln
        if (developmentPlantPartClass === 'root') {
          this.playgroundData.hexagonData[hexagon.hexagonId - 1].hexagonType = [
            'root1',
            'Wurzel Lvl 1'
          ]
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
        console.log('concatinatedmutatedPositions', concatinatedmutatedPositions)
        // bestimmung des auzubauenden hexagon image für Stämme und Blätter
        if (developmentPlantPartClass === 'stem') {
          /// ALLE endständigen Stämme sollen automatisch Blätter sein, und derzeit eine abwechselnde anzahl blätter haben
          if (this.playgroundData.currentUpdateOfNeighbourHexagonImages === false) {
            if (this.playgroundData.counterBuildedLeafs % 2 === 0) {
              hexagon.backgroundImage = leafLvl1_2_1
            } else if (
              this.playgroundData.counterBuildedLeafs % 2 !== 0 &&
              this.playgroundData.counterBuildedLeafs % 3 === 0
            ) {
              hexagon.backgroundImage = leafLvl1_1_1
            } else {
              hexagon.backgroundImage = leafLvl1_3_1
            }
            this.playgroundData.counterBuildedLeafs += 1
            this.playgroundData.hexagonData[hexagon.hexagonId - 1].hexagonType = [
              'leaf1',
              'Blatt Lvl 1'
            ]
            break
          }
          // update des benachtbarten Hexagon images mit der kleinsten chainnumber
          else if (
            this.playgroundData.currentUpdateOfNeighbourHexagonImages === true &&
            this.playgroundData.smallestChainNumber === hexagon.hexagonStemConnectionChainNumber
          ) {
            this.playgroundData.hexagonData[hexagon.hexagonId - 1].hexagonType = [
              'stem1',
              'Stamm Lvl 1'
            ]
            if (concatinatedmutatedPositions === '14') {
              hexagon.backgroundImage = stemLvl1_2_14
              break
            }
            // die concatinatedmutatedPositions 46 kommt als kombination für beide spiegelvarianten vor! benötigt spezialregel
            else if (
              concatinatedmutatedPositions === '46' ||
              concatinatedmutatedPositions === '24'
            ) {
              ////// während der rotation des images starten die positionen wenn sie die 6 überschreiten wieder bei 1, weshalb das berücksichtig werden musss
              if (
                positonOfNeighbourSmallestChainNumber - positionWithoutSmallestChainNumber === 2 ||
                positonOfNeighbourSmallestChainNumber - positionWithoutSmallestChainNumber === -4
              ) {
                hexagon.backgroundImage = stemLvl1_2_15
              } else {
                hexagon.backgroundImage = stemLvl1_2_13
              }
              break
            } else if (concatinatedmutatedPositions === '15') {
              hexagon.backgroundImage = stemLvl1_2_13
              break
            } else if (
              concatinatedmutatedPositions === '135' ||
              concatinatedmutatedPositions === '246'
            ) {
              hexagon.backgroundImage = stemLvl1_3_136
              break
            } else if (concatinatedmutatedPositions === '124') {
              hexagon.backgroundImage = stemLvl1_3_124
              break
            } else if (concatinatedmutatedPositions === '146') {
              hexagon.backgroundImage = stemLvl1_3_146
              break
            } else if (concatinatedmutatedPositions === '1246') {
              hexagon.backgroundImage = stemLvl1_4_1246
              break
            } else if (concatinatedmutatedPositions === '1245') {
              hexagon.backgroundImage = stemLvl1_3_146
              break
            } else if (concatinatedmutatedPositions === '12345') {
              hexagon.backgroundImage = stemLvl1_4_1246
              break
            }
          }
        }
      }

      // kalkulation des Rotationswinkels für Stämme
      if (developmentPlantPartClass === 'stem') {
        if (this.playgroundData.currentUpdateOfNeighbourHexagonImages === false) {
          // zunächst die Koordinaten des zu bebauenden Hexagons bestimmen
          this.playgroundData.XCoordinateBuildedHexagon = hexagon.hexagonXCoordinate
          this.playgroundData.YCoordinateBuildedHexagon = hexagon.hexagonYCoordinate
          hexagon.degreeOfRotation = this.calculateStemDegreeOfRotation()
          // Bestimmung des statischen Hebelarms
          this.structuralAnalysisData.balanceLevel +=
            this.structuralAnalysisData.stemBasicXLevel -
            this.playgroundData.XCoordinateBuildedHexagon
        }
      }
      // kalkulation des Rotationswinkels für Wurzeln
      else {
        hexagon.degreeOfRotation = (7 - countRotations) * 60 // da die rotation anhand des umgebenden zustands bestimmt wird, muss die differenz zu 6 verwendet werden
      }
    },
    updateImageOfNeighbourHexagons(hexagon, developmentPlantPartClass) {
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

        if (
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[0] !== 'empty sky' &&
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonType[0] !== 'empty soil'
        ) {
          this.findImageOfHexagon(
            this.playgroundData.hexagonData[idNeighbourHexagon - 1],
            developmentPlantPartClass
          )
        }
      }
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //////// Kalkulationen rund um Blatt und Stiel ///////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    findSmallestStemConnectionChainNumber(hexagon) {
      this.playgroundData.smallestChainNumber = 100
      // Es wird der kürzeste Weg bis zu den Wurzeln gesucht, da Abzweigung immer möglichst nahe am hauptstamm gebaut werden sollen
      if (this.playgroundData.amountOfNeighbourStemConnections === 1) {
        this.playgroundData.currentStemConnectionChainNumber += 1
        hexagon.hexagonStemConnectionChainNumber =
          this.playgroundData.currentStemConnectionChainNumber
      }
      let yCoodinateNeighbourHexagon = null
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
        if (
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonStemConnectionChainNumber <
            this.playgroundData.smallestChainNumber &&
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonStemConnectionChainNumber >
            0
        ) {
          this.playgroundData.smallestChainNumber =
            this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonStemConnectionChainNumber
          hexagon.hexagonStemConnectionChainNumber = this.playgroundData.smallestChainNumber + 1
          // speichern der Koordinaten des Hexagons mit der kleinsten chainnummer für die rotation
          this.playgroundData.XCoordinateNeighbourHexagonSmallestChainNumber =
            this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonXCoordinate
          this.playgroundData.YCoordinateNeighbourHexagonSmallestChainNumber =
            this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonYCoordinate
          // Speichern der id des nachbar hexagons mit der kleinsten StemChainNumber
          this.playgroundData.idNeighbourHexagonSmallestChainNumber =
            this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonId
        }
      }
    },
    findSmallestStemConnectionChainNumberNextToNeighbourHexagon(hexagon) {
      let yCoodinateNeighbourHexagon = null
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
        console.log(
          'this.playgroundData.smallestTestChainNumber',
          this.playgroundData.smallestTestChainNumber
        )
        if (
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonStemConnectionChainNumber <
            this.playgroundData.smallestTestChainNumber &&
          this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonStemConnectionChainNumber >
            0
        ) {
          // Speichern der id des nachbar exagons mit der kleinsten StemChainNumber
          console.log(
            'neue SCN',
            this.playgroundData.hexagonData[idNeighbourHexagon - 1]
              .hexagonStemConnectionChainNumber,
            'ID',
            this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonId
          )
          this.playgroundData.smallestTestChainNumber =
            this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonStemConnectionChainNumber
          this.playgroundData.XCoordinateTestSmallestChainNumber =
            this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonXCoordinate
          this.playgroundData.idTestSmallestChainNumber =
            this.playgroundData.hexagonData[idNeighbourHexagon - 1].hexagonId
        }
      }
    },
    calculateStemDegreeOfRotation() {
      let deltaX = 0
      let deltaY = 0
      // bestimme die Koordinaten des zu bebauenden Hexagons

      // Suche das Hexagon welches als Stam am nächsten zur Wurzel ist
      if (this.playgroundData.currentUpdateOfNeighbourHexagonImages === false) {
        deltaX =
          this.playgroundData.XCoordinateBuildedHexagon -
          this.playgroundData.XCoordinateNeighbourHexagonSmallestChainNumber
        deltaY =
          this.playgroundData.YCoordinateBuildedHexagon -
          this.playgroundData.YCoordinateNeighbourHexagonSmallestChainNumber
      }
      // bestimmung des Rotationswinkels anhand der relativen position zum hexagon mit der niedrigsten chainNumber
      if (deltaX === 1 && deltaY === 0 && this.playgroundData.XCoordinateBuildedHexagon % 2 === 0) {
        return 120
      } else if (deltaX === -1 && deltaY === -1) {
        return 300
      } else if (deltaX === 0 && deltaY === -1) {
        return 0
      } else if (deltaX === 0 && deltaY === 1) {
        return 180
      } else if (deltaX === 1 && deltaY === 1) {
        return 120
      } else if (deltaX === -1 && deltaY === 1) {
        return 240
      } else if (deltaX === 1 && deltaY === -1) {
        return 60
      } else if (deltaX === 0 && deltaY === 0) {
        return 90
      } else if (
        deltaX === 1 &&
        deltaY === 0 &&
        this.playgroundData.XCoordinateBuildedHexagon % 2 !== 0
      ) {
        return 60
      } else if (
        deltaX === -1 &&
        deltaY === 0 &&
        this.playgroundData.XCoordinateBuildedHexagon % 2 === 0
      ) {
        return 240
      } else if (
        deltaX === -1 &&
        deltaY === 0 &&
        this.playgroundData.XCoordinateBuildedHexagon % 2 !== 0
      ) {
        return 300
      } else {
        console.log('nichts gefunden für die rotation', deltaX, deltaY)
        return 90
      }
    },
    roundDecimals(value, decimals) {
      return parseFloat(value.toFixed(decimals))
    },
    ///////////////////////////////////////////////////////////////////////////////////////
    ////// RESSOURCEN MANAGMENT //////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    harvestResources() {
      // in einem definierten Zeitintervall werden entsprechend der produktionsraten die resourcen dem Vorrat hinzugefügt
      this.resourcesData.currentAmounts.amountWater +=
        this.resourcesData.resourcesProductionRates.productionRateWater

      this.resourcesData.currentAmounts.amountNitrogen = this.roundDecimals(
        (this.resourcesData.currentAmounts.amountNitrogen +=
          this.resourcesData.resourcesProductionRates.productionRateNitrogen),
        1
      )
      this.resourcesData.currentAmounts.amountphosphor = this.roundDecimals(
        (this.resourcesData.currentAmounts.amountphosphor +=
          this.resourcesData.resourcesProductionRates.productionRatePhosphor),
        2
      )
      this.resourcesData.currentAmounts.amountEnergie = this.roundDecimals(
        (this.resourcesData.currentAmounts.amountEnergie +=
          this.resourcesData.resourcesProductionRates.productionRateEnergie),
        2
      )
    },
    updateResourceHarvest(hexagon, developmentPlantPartClass) {
      // Die Resourcenproduktionsrate wird beim ausbau der Pflanze angepasst
      if (developmentPlantPartClass === 'root') {
        this.resourcesData.resourcesProductionRates.productionRateWater += 1
        this.resourcesData.resourcesProductionRates.productionRateNitrogen += 0.1
        this.resourcesData.resourcesProductionRates.productionRatePhosphor += 0.1
      } else if (hexagon.backgroundImage === stemLvl1_1_1) {
        this.resourcesData.resourcesProductionRates.productionRateEnergie += 2
      }
    },
    resourceConsumtionToBuild(developmentPlantPartClass) {
      // die Ressourcen die für den Bau benötigt werden, werden hier vom Vorrat abgezogen
      let indexEffortList = null
      if (developmentPlantPartClass === 'root') {
        indexEffortList = 0
      }
      if (developmentPlantPartClass === 'stem') {
        indexEffortList = 1
      }
      if (
        this.resourcesData.currentAmounts.amountWater -
          this.resourcesData.resourceConsumtionEffortList[indexEffortList][0] >=
        0
      ) {
        this.resourcesData.currentAmounts.amountWater -=
          this.resourcesData.resourceConsumtionEffortList[indexEffortList][0]
      } else {
        this.resourcesData.currentAmounts.sufficentResources = false
      }
      if (
        this.resourcesData.currentAmounts.amountNitrogen -
          this.resourcesData.resourceConsumtionEffortList[indexEffortList][1] >=
        0
      ) {
        this.resourcesData.currentAmounts.amountNitrogen -=
          this.resourcesData.resourceConsumtionEffortList[indexEffortList][1]
      } else {
        this.resourcesData.currentAmounts.sufficentResources = false
      }
      if (
        this.resourcesData.currentAmounts.amountphosphor -
          this.resourcesData.resourceConsumtionEffortList[indexEffortList][2] >=
        0
      ) {
        this.resourcesData.currentAmounts.amountphosphor -=
          this.resourcesData.resourceConsumtionEffortList[indexEffortList][2]
      } else {
        this.resourcesData.currentAmounts.sufficentResources = false
      }
    }
  },
  getters: {}
})
