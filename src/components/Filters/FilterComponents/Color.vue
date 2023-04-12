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
            colorData: this.$props.color,
        }
    },
    props: {
        color: String,
        instructionIndex: Number,
        index: Number,
    },
    computed: {
    },
    mounted() {


    },
    methods: {
        setColor(event: Event) {
            this.store.setColor(this.instructionIndex!, this.index!, (event.target as HTMLInputElement).value)
            this.colorData = (event.target as HTMLInputElement).value
        }
    },

}

</script>

<template>
    <input
        class="color"
        type="color"
        :value="colorData"
        @change="setColor($event)"
    >
</template>

<style scoped>
.color {
    border-radius: 50%;
    height: 3em;
    width: 3em;
    border: none;
    outline: none;
    background: none;
    appearance: none;
    cursor: pointer;

}

.color::-webkit-color-swatch-wrapper {
    padding: 0;
}

.color::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
}
</style>
