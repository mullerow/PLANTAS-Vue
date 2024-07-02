<template>
  <div class="hexagon-container">
    <div
      class="hexagon-tile"
      v-for="(hexagon, index) in store.playgroundData.hexagonData"
      :key="hexagon.hexagonId"
      @mouseover="handleMouseHover(hexagon)"
      @click="openOptionWindow(index)"
      :class="{
        'hexagon-tile': true
      }"
      :style="{
        transform: `translateX(${hexagon.additionalXShiftOfHexagon}px)translateY(${hexagon.additionalYShiftOfHexagon}px)`
      }"
    >
      <h2>{{ hexagon.hexagonXCoordinate }} : {{ hexagon.hexagonYCoordinate }}</h2>
    </div>
    <div class="option-window" v-if="optionwindow">OPTIONEN von {{ optionHexagonId }}</div>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
export default {
  data() {
    return {
      store: storeData(),
      optionwindow: false,
      optionHexagonId: null
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
    openOptionWindow(index) {
      this.optionwindow = true
      this.optionHexagonId = index
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
}
.hexagon-container {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  position: relative;
}
.option-window {
  width: 200px;
  height: 500px;
  background-color: rgb(0, 195, 255);
  text-align: center;
  position: absolute;
  left: 550px;
}
h2 {
  font-size: 16px;
  font-weight: bold;
}
</style>
