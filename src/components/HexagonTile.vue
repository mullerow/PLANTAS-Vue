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
        transform: `translateX(${hexagon.additionalXShiftOfHexagon}px)translateY(${hexagon.additionalYShiftOfHexagon}px)`
      }"
    >
      <img src="@/assets/images/ground-soil.png" alt="soil-ground" />
    </div>
    <div class="option-window" v-if="optionwindow">
      OPTIONEN von {{ optionHexagonId }}
      <hr />
      Koordinaten: {{ optionHexagonXKoordinate }} : {{ optionHexagonYKoordinate }}
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
      optionHexagonYKoordinate: null
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
    }
  }
}
</script>

<style scoped>
.hexagon-tile {
  height: 50px;
  width: 50px;
  background-color: dodgerblue;
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
}
.gameboard-container {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  height: 500px;
  position: relative;
  background-color: gray;
}
.option-window {
  width: 200px;
  height: 500px;
  background-color: rgb(0, 195, 255);
  text-align: center;
  position: absolute;
  left: 550px;
  border: 2px solid black;
  border-radius: 5px;
}
h2 {
  font-size: 12px;
  font-weight: bold;
}
</style>
