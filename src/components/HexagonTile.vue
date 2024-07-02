<template>
  <div class="hexagon-tile" v-for="hexagon in store.temporaryData.testArray" :key="hexagon">
    <h2>{{ hexagon }}</h2>
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
  height: 200px;
  width: 200px;
  background-color: red;
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
h2 {
  z-index: 10;
  font-size: 50px;
  margin-left: 85px;
  padding-top: 55px;
}
</style>
