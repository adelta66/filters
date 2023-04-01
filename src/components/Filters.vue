<script setup lang="ts">
import FilterPill from './FilterPill.vue'
import { useFiltersStore } from '@/stores/Filters'
const store = useFiltersStore()
const filters = store.allFilters



// defineProps<{
//   msg: string
// }>()
</script>

<template>
  <div class="filters">
    <FilterPill
      v-for="filter in filters"
      :filter-name="(filter as any).name"
      :filter-type="(filter as any).type"
    ></FilterPill>

  </div>
</template>

<style scoped>
.filters {
  background-color: rgb(156, 156, 156);
  width: 100%;
  flex-grow: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 5px
}
</style>
