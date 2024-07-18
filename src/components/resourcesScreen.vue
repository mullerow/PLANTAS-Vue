<template>
  <div>
    <div class="display-ressource-container">
      <h3>Ressourcen</h3>
      <div class="display-time">Datum: 14.06.26</div>
      <b>Kohlenhydrate</b>
      <span class="amount-resource">
        &nbsp; {{ store.resourcesData.currentAmounts.amountCarbohydrates }} g </span
      >&nbsp;||||🌱|||| <b>Lipide</b>
      <span class="amount-resource"
        >&nbsp;{{ store.resourcesData.currentAmounts.amountLipids }} g
      </span>
      &nbsp; ||||||||||||🌱|||| <b>Proteine</b>
      <span class="amount-resource"
        >&nbsp;{{ store.resourcesData.currentAmounts.amountProteins }} g
      </span>
      &nbsp;||||🌱|||| <b>Wasser</b>
      <span class="amount-resource"
        >&nbsp;{{ store.resourcesData.currentAmounts.amountWater }} g </span
      >&nbsp; <br />
      <hr />
      <b> Sekundäre Stoffe</b>
      <span class="amount-resource"
        >&nbsp;{{ store.resourcesData.currentAmounts.amountMetabolites }} g
      </span>

      &nbsp;||||🌱|||| <b>Phosphor</b>
      <span class="amount-resource"
        >&nbsp;{{ store.resourcesData.currentAmounts.amountphosphat }} g
      </span>
      &nbsp; ||||🌱|||| <b>Stickstoff</b>
      <span class="amount-resource"
        >&nbsp;{{ store.resourcesData.currentAmounts.amountNitrogen }} g
      </span>
      &nbsp;||||🌱||||
      <b>Energie</b>
      <span class="amount-resource"
        >&nbsp; {{ store.resourcesData.currentAmounts.amountEnergie }} KJ </span
      >&nbsp;
      <hr />
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
.display-ressource-container {
  background-color: silver;
  z-index: 5;
  height: 90px;
  width: 1000px;
  line-height: 1.5rem;
  padding: 5px;
  position: relative;
}
.amount-resource {
  background-color: aliceblue;
}
.display-time {
  position: absolute;
  background-color: #00524e;
  z-index: 6;
  right: 20px;
  top: 10px;
  width: 250px;
  font-weight: bold;
  color: wheat;
  border-radius: 20px;
  padding: 5px 15px;
}

b {
  font-weight: bold;
}
</style>
