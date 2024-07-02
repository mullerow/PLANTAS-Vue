<template>
  <div class="hexagon-container">
    <div
      class="hexagon-tile"
      v-for="hexagon in store.playgroundData.hexagonData"
      :key="hexagon.hexagonId"
    >
      <h2>{{ hexagon.hexagonId }}</h2>
    </div>
  </div>
</template>

<script>
import { storeData } from '@/stores/store.js'
export default {
  data() {
    return {
      store: storeData()
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
}
.hexagon-container {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
}
h2 {
  font-size: 30px;
}
</style>
