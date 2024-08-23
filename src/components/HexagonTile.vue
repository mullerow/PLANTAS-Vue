<template>
  <div class="hexagon-field-container">
    <div
      class="hexagon-tile"
      v-for="hexagon in store.playgroundData.hexagonData"
      :key="hexagon.hexagonId"
      @mouseover="handleMouseHover(hexagon)"
      @click="openOptionWindow(hexagon)"
      :class="{
        'hexagon-tile': true
      }"
      :style="{
        '--x': `${hexagon.additionalXShiftOfHexagon}px`,
        '--y': `${hexagon.additionalYShiftOfHexagon}px`,
        '--rotate': `${hexagon.degreeOfRotation}deg`,
        filter: `brightness(${hexagon.brightnessLevel})`
      }"
    >
      <img :src="`${hexagon.backgroundImage}`" alt="soil-ground" />
    </div>
    <div class="option-window" v-if="optionwindow">
      <h3>OPTIONEN von {{ optionHexagon.hexagonId }}</h3>
      <hr />
      StammKettenNummer: {{ stemConnectionChainNumber }}
      Koordinaten:
      {{ optionHexagonXKoordinate }} : {{ optionHexagonYKoordinate }} <br />
      FeldTyp: {{ hexagonTypeName }}
      <div class="container mt-5">
        <div class="dropdown" @click="toggleDropdown">
          <button class="btn btn-primary dropdown-toggle plant-develop-option-button" type="button">
            Wähle Ausprägung
          </button>
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <button
              v-if="store.playgroundData.connectionToThePlant && hexagonCategory === 'empty soil'"
              class="dropdown-item"
              @click="this.store.buildPlantpart(optionHexagon, 'root')"
            >
              Wurzel LvL 1
            </button>
            <button
              v-if="store.playgroundData.connectionToThePlant && hexagonCategory === 'empty sky'"
              class="dropdown-item"
              @click="this.store.buildPlantpart(optionHexagon, 'stem')"
            >
              Stamm LvL 1
            </button>
            <a class="dropdown-item" href="#">Stiel LvL 2</a>
            <a class="dropdown-item" href="#">Blatt LvL 2</a>
          </div>
        </div>
        <div>
          verfügbare Ressourcen: <br />
          Wasser: 1 g/d<br />
          Stickstoff: 0,1 g/d<br />
          Phosphor: 0 g/d
        </div>
      </div>
    </div>
  </div>
  <button class="musik-button" @click="playAudio">MUSIK</button>
  <audio ref="audioPlayer" :src="audioSource" controls></audio>
</template>

<script>
import { storeData } from '@/stores/store.js'
import audioFile from '@/assets/audio/Rotkäppchen Export 1.mp3'
export default {
  data() {
    return {
      store: storeData(),
      audioSource: audioFile,
      optionwindow: false,
      optionHexagon: null,
      optionHexagonXKoordinate: null,
      optionHexagonYKoordinate: null,
      hexagonTypeName: '',
      hexagonCategory: '',
      isDropdownOpen: false
    }
  },
  methods: {
    shiftEvenRowsOfHexagons(hexagon) {
      if (hexagon.hexagonYCoordinate % 2 === 0) {
        return true
      } else return false
    },
    handleMouseHover(hexagon) {
      hexagon.hovered = true
    },
    openOptionWindow(hexagon) {
      this.store.playgroundData.connectionToThePlant = false
      this.optionwindow = true
      this.optionHexagon = hexagon
      this.optionHexagonXKoordinate = hexagon.hexagonXCoordinate
      this.optionHexagonYKoordinate = hexagon.hexagonYCoordinate
      this.hexagonTypeName = hexagon.hexagonType[1]
      this.hexagonCategory = hexagon.hexagonType[0]
      this.store.checkForDevelopmentOptions(hexagon)
      this.stemConnectionChainNumber = hexagon.hexagonStemConnectionChainNumber
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    playAudio() {
      this.$refs.audioPlayer.play().catch((error) => {
        console.error('Playback failed:', error)
      })
    }
  }
}
</script>

<style scoped>
.hexagon-tile {
  height: 50px;
  width: 50px;
  background-color: #2895d8;
  clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  transform: translate(var(--x), var(--y)) rotate(var(--rotate));
}
.hexagon-tile:hover {
  cursor: pointer;
}
.hexagon-field-container {
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  height: 592px;
  position: relative;
  background-color: gray;
}
.option-window {
  width: 255px;
  height: 725px;
  background-color: #00524e;
  text-align: start;
  position: absolute;
  left: 745px;
  border: 2px solid black;
  border-radius: 0px 5px 5px 0px;
  color: wheat;
  padding-left: 5px;
  line-height: 1.5rem;
}
h2 {
  font-size: 12px;
  font-weight: bold;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  display: block;
  position: absolute;
  background-color: white;
  width: 200px;
}

.dropdown-item {
  padding: 6px 12px;
  display: block;
  background-color: #0a918a;
}

.dropdown-item:hover {
  background-color: #ddd;
}
.plant-develop-option-button {
  background-color: #0a918a;
  color: wheat;
  border-radius: 5px;
  width: 200px;
  font-weight: bold;
}
.plant-develop-option-button:hover {
  background-color: #15d4cb;
  cursor: pointer;
}
.musik-button {
  margin-top: 150px;
}
</style>
