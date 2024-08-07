<template>
  <div>
    <div class="display-ressource-container">
      <h3>
        Ressourcen
        /|\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Statische Balance:[[[[
        <span class="amount-resource"> {{ store.structuralAnalysisData.balanceLevel }}</span> ]]]]
      </h3>

      <div class="display-time">
        Abgelaufene Tage: {{ this.store.playTime.timerValue }} <br />
        Jahr: {{ this.store.playTime.ingameYear }} - {{ this.store.playTime.ingameSeason }}
      </div>
      <button class="start-time-button" @click="changeRunTime()">
        <div v-if="this.runTimeActive === false">Start</div>
        <div v-if="this.runTimeActive === true">Stop</div>
      </button>

      <div class="change-speed-button-container">
        <button class="speed-changing-button" @click="changeGameSpeed(1000)">
          <img :src="playButton" alt="play button" />
        </button>
        <button class="speed-changing-button" @click="changeGameSpeed(200)">5x</button>
        <button class="speed-changing-button" @click="changeGameSpeed(50)">20x</button>
      </div>
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
        >&nbsp;{{ store.resourcesData.currentAmounts.amountphosphor }} g
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
  <h4
    class="display-sufficent-resources"
    v-if="this.store.resourcesData.currentAmounts.sufficentResources"
  >
    Aussreichend Ressourcen
  </h4>
</template>

<script>
import { storeData } from '@/stores/store.js'
import playButton from '@/assets/icons/Play--Streamline-Font-Awesome.svg'
export default {
  data() {
    return {
      store: storeData(),
      runTimeActive: false,
      timer: null,
      playButton: playButton
    }
  },
  methods: {
    changeRunTime() {
      this.runTimeActive = !this.runTimeActive

      if (this.runTimeActive) {
        this.timer = setInterval(() => {
          this.store.playTime.timerValue += 1
          this.store.harvestResources()
          if (this.store.playTime.timerValue % 91 === 0) {
            this.changeSeason()
          }
          if (this.store.playTime.timerValue % 365 === 0) {
            this.store.playTime.ingameYear += 1
          }
        }, this.store.playTime.ingameTimeSpeed)
      } else {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    changeSeason() {
      if (this.store.playTime.ingameSeason === 'Frühling') {
        this.store.playTime.ingameSeason = 'Sommer'
      } else if (this.store.playTime.ingameSeason === 'Sommer') {
        this.store.playTime.ingameSeason = 'Herbst'
      } else if (this.store.playTime.ingameSeason === 'Herbst') {
        this.store.playTime.ingameSeason = 'Winter'
      } else if (this.store.playTime.ingameSeason === 'Winter') {
        this.store.playTime.ingameSeason = 'Frühling'
      }
    },
    changeGameSpeed(timeIntervall) {
      this.store.playTime.ingameTimeSpeed = timeIntervall
      if (this.runTimeActive) {
        this.runTimeActive = !this.runTimeActive
        clearInterval(this.timer)
        this.changeRunTime()
      }
    }
  }
}
</script>

<style scoped>
.display-ressource-container {
  background-color: silver;
  z-index: 5;
  height: 85px;
  width: 1000px;
  line-height: 1.5rem;
  padding: 5px;
  margin-bottom: 3px;
  position: relative;
}
.amount-resource {
  background-color: aliceblue;
}
.display-time {
  position: absolute;
  background-color: #00524e;
  z-index: 6;
  right: 0px;
  top: 0px;
  width: 255px;
  font-weight: bold;
  color: wheat;
  border-radius: 20px;
  padding: 5px 15px;
}
.start-time-button {
  position: absolute;
  width: 50px;
  height: 78px;
  z-index: 6;
  right: 0px;
  top: 7px;
  font-weight: bold;
  background-color: #0a918a;
  color: wheat;
  font-size: 18px;
  border-radius: 20px 4px 4px 20px;
}
.start-time-button:hover,
.speed-changing-button:hover {
  background-color: #15d4cb;
  cursor: pointer;
}
.change-speed-button-container {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  background-color: #01413d;
  z-index: 5;
  right: 0px;
  top: 35px;
  width: 255px;
  height: 55px;
  font-weight: bold;
  color: wheat;
  border-radius: 20px;
  padding-left: 5px;
  padding-top: 20px;
  padding-right: 50px;
  padding-top: 25px;
}
.speed-changing-button {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background-color: #0a918a;
  color: wheat;
}
.display-sufficent-resources {
  position: absolute;
  z-index: 20;
  bottom: 100px;
  left: 800px;
  color: wheat;
  border: 2px solid black;
  margin-right: 20px;
  padding: 10px;
}

b {
  font-weight: bold;
}
</style>
