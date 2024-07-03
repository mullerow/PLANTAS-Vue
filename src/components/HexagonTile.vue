<template>
  <div class="gameboard-container">
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
      <img :src="`${hexagon.backgroundImage}`" alt="soil-ground" />
    </div>
    <div class="option-window" v-if="optionwindow">
      <h3>OPTIONEN von {{ optionHexagonId }}</h3>
      <hr />
      Koordinaten: {{ optionHexagonXKoordinate }} : {{ optionHexagonYKoordinate }} <br />
      FeldTyp: {{ hexagonTypeName }}
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
      hexagonTypeName: ''
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
      this.optionwindow = true
      this.optionHexagonId = hexagon.hexagonId
      this.optionHexagonXKoordinate = hexagon.hexagonXCoordinate
      this.optionHexagonYKoordinate = hexagon.hexagonYCoordinate
      this.hexagonTypeName = hexagon.hexagonType
    }
  }
}
</script>

<style scoped>
.hexagon-tile {
  height: 50px;
  width: 50px;
  background-color: #2895d8;
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
}
.hexagon-tile:hover {
  background-color: goldenrod;
  cursor: pointer;
  border: 2px solid green;
  box-shadow: 0px 0px 200px red;
}
.gameboard-container {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 500px;
  position: relative;
  background-color: gray;
}
.option-window {
  width: 250px;
  height: 500px;
  background-color: #00524e;
  text-align: start;
  position: absolute;
  left: 800px;
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
</style>
