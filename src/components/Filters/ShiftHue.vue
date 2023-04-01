<script lang="ts">
import { useFiltersStore } from '@/stores/Filters'
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
        changeValue(event: Event) {
            let value = (event.target as HTMLInputElement).value
            this.store.setAdditionalData((this.index as number), { value: value })
            this.store.setInstructionsComputed((this.index as number), false)
        }
    }
}

</script>

<template>
    <div
        class="innerInstruction"
        draggable="false"
    >
        {{ name }} {{ value }}
        <input
            type="range"
            name=""
            id=""
            v-model="value"
            min="-180"
            max="180"
            @input="changeValue($event)"
        >
    </div>
</template>

<style scoped>
input {
    width: 100%;
}
</style>
