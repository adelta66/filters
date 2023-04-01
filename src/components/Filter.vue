<!-- <script setup lang="ts">
import HSVToRGB from './Filters/HSVToRGB.vue'
import RGBToHSV from './Filters/RGBToHSV.vue'
import ShiftHue from './Filters/ShiftHue.vue'
import DroppableSpace from './Filters/DroppableSpace.vue'


import { storeToRefs } from 'pinia'
import { useFiltersStore } from '@/stores/Filters'
const store = useFiltersStore()
const { instructions } = storeToRefs(store)
// export default {

// }

</script>

<template>
    <div class="">


            <HSVToRGB
                v-if="instruction.name === 'HSV to RGB'"
                :index="index"
                :name="instruction.name"
                :computed="instruction.computed"
                :type="instruction.type"
            ></HSVToRGB>

            <RGBToHSV
                v-else-if="instruction.name === 'RGB to HSV'"
                :index="index"
                :name="instruction.name"
                :computed="instruction.computed"
                :type="instruction.type"
            ></RGBToHSV>

            <ShiftHue
                v-else-if="instruction.name === 'Shift Hue'"
                :index="index"
                :name="instruction.name"
                :computed="instruction.computed"
                :type="instruction.type"
            ></ShiftHue>

            <DroppableSpace :index="index"></DroppableSpace>

    </div>
</template>

<style scoped>
input {
    padding: 10px;
}

.long {
    flex-basis: 100%;
}
</style> -->
