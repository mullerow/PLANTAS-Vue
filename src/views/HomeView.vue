<template>
  <hexagon-tile />
</template>
<script>
import HexagonTile from '@/components/HexagonTile.vue'
import { storeData } from '@/stores/store.js'
export default {
  components: {
    HexagonTile
  },
  data() {
    return {
      store: storeData()
    }
  }
}
</script>
<style></style>
