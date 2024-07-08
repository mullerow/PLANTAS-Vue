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
        transform: `translateX(${hexagon.additionalXShiftOfHexagon}px)translateY(${hexagon.additionalYShiftOfHexagon}px)`,
        filter: `brightness(${hexagon.brightnessLevel})`
      }"
    >
      <!--{{ hexagon.hexagonXCoordinate }} {{ hexagon.hexagonYCoordinate }}-->
      <img :src="`${hexagon.backgroundImage}`" alt="soil-ground" />
    </div>
    <div class="option-window" v-if="optionwindow">
      <h3>OPTIONEN von {{ optionHexagonId }}</h3>
      <hr />
      Koordinaten: {{ optionHexagonXKoordinate }} : {{ optionHexagonYKoordinate }} <br />
      FeldTyp: {{ hexagonTypeName }}
      <div class="container mt-5">
        <div class="dropdown" @click="toggleDropdown">
          <button class="btn btn-primary dropdown-toggle" type="button">Wähle Ausprägung</button>
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <button
              v-if="store.playgroundData.connectionToThePlant"
              class="dropdown-item"
              @click="this.store.buildPlantpart(optionHexagonId)"
            >
              Wurzel LvL 1
            </button>
            <a class="dropdown-item" href="#">Stiel LvL 2</a>
            <a class="dropdown-item" href="#">Blatt LvL 2</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
export default {
  data() {
    return {
      store: storeData(),
      optionwindow: false,
      optionHexagonId: null,
      optionHexagonXKoordinate: null,
      optionHexagonYKoordinate: null,
      hexagonTypeName: '',
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
      this.optionHexagonId = hexagon.hexagonId
      this.optionHexagonXKoordinate = hexagon.hexagonXCoordinate
      this.optionHexagonYKoordinate = hexagon.hexagonYCoordinate
      this.hexagonTypeName = hexagon.hexagonType
      this.store.checkForDevelopmentOptions(hexagon)
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
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
  _border-top: 2px solid #1f72a5;
}
.hexagon-tile:hover {
  cursor: pointer;
  border-top: 2px solid red;
}
.hexagon-field-container {
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  height: 550px;
  position: relative;
  background-color: gray;
}
.option-window {
  width: 255px;
  height: 550px;
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
  background-color: aquamarine;
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
}

.dropdown-item:hover {
  background-color: #ddd;
}
</style>
