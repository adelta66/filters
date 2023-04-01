<script setup lang="ts">
import HSVToRGB from './Filters/HSVToRGB.vue'
import RGBToHSV from './Filters/RGBToHSV.vue'
import ShiftHue from './Filters/ShiftHue.vue'
import DroppableSpace from './Filters/DroppableSpace.vue'

import Filter from './Filter.vue'

import { storeToRefs } from 'pinia'
import { useFiltersStore } from '@/stores/Filters'
const store = useFiltersStore()
const { instructions } = storeToRefs(store)
// export default {

// }

</script>

<template>
    <div class="instructionsContainer">
        <input
            type="file"
            @change="store.setBaseImage"
        />
        <DroppableSpace
            :index="-1"
            class=""
        ></DroppableSpace>
        <div
            v-for="(instruction, index) in instructions"
            class="instructionContainer"
        >
            <Filter
                :instruction="instruction"
                :index="index"
            ></Filter>
            <DroppableSpace :index="index">
            </DroppableSpace>
        </div>
        <DroppableSpace
            :index="instructions.length"
            class="long"
        ></DroppableSpace>

    </div>
</template>

<style scoped>
input {
    padding: 10px;
}

.long {
    flex-basis: 100%;
}
</style>
