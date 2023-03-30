<script setup lang="ts">
import Filters from '../components/Filters.vue'
</script>

<template>
  <div class="container">
    <div class="left">
    </div>
    <div class="right">

    </div>
    <Filters />

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
    background-color: #f00;
    flex-basis: 20%;
    height: 100%;
  }
  .right{
    background-color: #0f0;
    flex-basis: 80%;
    height: 100%;
  }

</style>
