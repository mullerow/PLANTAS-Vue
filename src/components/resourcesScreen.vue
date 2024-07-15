<template>
  <div>
    <div class="display-ressource-container">
      <h3>Ressourcen</h3>
      <b>Kohlenhydrate</b> <span class="amount-resource"> &nbsp; 50 g </span>&nbsp;||||🌱||||
      <b>Lipide</b> <span class="amount-resource">&nbsp;30 g </span> &nbsp; ||||||||||||🌱||||
      <b>Proteine</b> <span class="amount-resource">&nbsp;10 g </span> &nbsp;||||🌱||||
      <b>Wasser</b> <span class="amount-resource">&nbsp;40 g </span>&nbsp; <br />
      <hr />
      <b> Sekundäre Stoffe</b>
      <span class="amount-resource">&nbsp;0 g </span>

      &nbsp;||||🌱|||| <b>Phosphor</b> <span class="amount-resource">&nbsp;0.2 g </span> &nbsp;
      ||||🌱|||| <b>Stickstoff</b> <span class="amount-resource">&nbsp;4 g </span> &nbsp;||||🌱||||
      <b>Energie</b>
      <span class="amount-resource">&nbsp; 81 KJ </span>&nbsp;
      <hr />
    </div>
  </div>
</template>

<script></script>

<style scoped>
.display-ressource-container {
  background-color: silver;
  z-index: 5;
  height: 90px;
  width: 1000px;
  line-height: 1.5rem;
  padding: 5px;
}
.amount-resource {
  background-color: aliceblue;
}

b {
  font-weight: bold;
}
</style>
