<template>
  <div>
    <div class="display-ressource-container">
      <h3>Ressourcen</h3>
      <b>Kohlenhydrate</b> <span class="amount-resource"> &nbsp; 50 g </span>&nbsp; ||||🌱||||
      <b>Lipide</b> <span class="amount-resource">&nbsp;30 g </span> ||||🌱|||| <b>Proteine</b>
      <span class="amount-resource">&nbsp;10 g </span> ||||🌱|||| <b>Wasser</b>
      <span class="amount-resource">&nbsp;40 g </span> <b><Section></Section>Sekundäre Stoffe</b>
      <span class="amount-resource">&nbsp;0 g </span>

      ||||🌱|||| <b>Phosphor</b> <span class="amount-resource">&nbsp;0.2 g </span> ||||🌱||||
      <b>Stickstoff</b> <span class="amount-resource">&nbsp;4 g </span>||||🌱|||| <b>Energie</b>
      <span class="amount-resource">&nbsp;81 KJ </span>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.display-ressource-container {
  background-color: silver;
  z-index: 3;
  height: 80px;
  width: 1000px;
  line-height: 1.5rem;
}
.amount-resource {
  background-color: aliceblue;
}

b {
  font-weight: bold;
}
</style>
