<script lang="ts">
import { useFiltersStore } from '@/stores/Filters'
import { storeToRefs } from 'pinia'
export default {
    setup() {
        const store = useFiltersStore()
        return {
            store,
        }
    },
    data() {
        return {
            value: 0,
        }
    },
    props: {
        name: String,
        computed: Boolean,
        type: String,
        index: Number,
    },
    computed: {
    },
    methods: {
        changeSelectValue(event: Event) {
            let value = (event.target as HTMLInputElement).value
            this.store.setAdditionalData((this.index as number), { bayer: value })
            this.store.setInstructionsComputed((this.index as number), false)
        },
        changeBiasValue(event: Event) {
            let value = (event.target as HTMLInputElement).checked
            this.store.setAdditionalData((this.index as number), { bayerBias: value })
            this.store.setInstructionsComputed((this.index as number), false)
        },
    },
}

</script>

<template>
    <div
        class="innerInstruction"
        draggable="false"
    >
        {{ name }}
        <select @change="changeSelectValue($event)">
            <option value="0">2x2</option>
            <option value="1">4x4</option>
            <option value="2">8x8</option>
            <option value="3">16x16</option>
            <option value="4">32x32</option>
            <option value="5">64x64</option>
            <option value="6">128x128</option>
        </select>
        Flip bias: <input
            type="checkbox"
            v-model="value"
            @change="changeBiasValue($event)"
        >
    </div>
</template>

<style scoped>
input {
    width: 100%;
}
</style>
