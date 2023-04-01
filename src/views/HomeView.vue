<script setup lang="ts">
import Filters from '../components/Filters.vue'
import Instructions from '../components/Instructions.vue'
</script>

<template>
  <div class="container">
    <div class="left">
      <Filters></Filters>
      <Instructions></Instructions>
    </div>
    <div class="right">
      <canvas id="displayCanvas">

      </canvas>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  /* align-items: ; */
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.left {
  background-color: rgb(39, 39, 39);
  flex-basis: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.right {
  background-color: rgb(112, 112, 112);
  flex-basis: 70%;
  height: 100%;
}
</style>
