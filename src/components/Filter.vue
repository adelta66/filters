<script lang="ts">
import HSVToRGB from './Filters/HSVToRGB.vue'
import RGBToHSV from './Filters/RGBToHSV.vue'
import ShiftHue from './Filters/ShiftHue.vue'
import Sort from './Filters/Sort.vue'

import { useFiltersStore } from '@/stores/Filters'
import { storeToRefs } from 'pinia'
import Instructions from './Instructions.vue'
import { computed } from '@vue/reactivity'

export default {
    setup() {

        const store = useFiltersStore()
        // const { instructions } = storeToRefs(store)
        return {
            store,
            // instructions
        }
    },
    props: {
        instruction: {
            type: Object as () => instruction,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
    },
    methods: {
        compute() {
            this.store.compute(this.index)
            this.store.displayImage(this.index)
        },
        display() {
            this.store.displayImage(this.index)
        },
        reCompute() {
            this.store.setInstructionsComputed(this.index, false)
            this.store.compute(this.index)
        }
    },
    components: {
        HSVToRGB,
        RGBToHSV,
        ShiftHue,
        Sort,
    },
    mounted() {
        console.log(this.instruction)
    }
}

</script>
<template>
    <div
        class="instruction"
        :class="instruction.type"
    >
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
        <Sort
            v-else-if="instruction.name === 'Sort'"
            :index="index"
            :name="instruction.name"
            :computed="instruction.computed"
            :type="instruction.type"
        ></Sort>

        <button
            v-if="instruction.computed"
            @click="display"
        >&#x1F441;</button>
        <button
            v-if="instruction.computed"
            @click="reCompute"
        >&#8634;</button>
        <button
            v-else
            @click="compute"
        > &#x2699;</button>

    </div>
</template>

<style scoped>
input {
    padding: 10px;
}

button {
    background: rgba(0, 0, 0, 0);
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    margin-right: 5px;
    backdrop-filter: brightness(2);
    font-size: larger;
}

button:hover {
    /* backdrop-filter: brightness(4); */
    backdrop-filter: hue-rotate(180deg);
    transition: 0.25s;
}

.long {
    flex-basis: 100%;
}
</style>
