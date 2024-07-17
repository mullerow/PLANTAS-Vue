<template>
  <resources-screen />
  <hexagon-tile />
</template>
<script>
import HexagonTile from '@/components/HexagonTile.vue'
import ResourcesScreen from '@/components/resourcesScreen.vue'
import { storeData } from '@/stores/store.js'
export default {
  components: {
    HexagonTile,
    ResourcesScreen
  },
  data() {
    return {
      store: storeData()
    }
  },
  created() {
    this.store.createDefaultHexagons()
  }
}
</script>
<style></style>
