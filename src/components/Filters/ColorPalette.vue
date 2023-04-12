<script lang="ts">
import { useFiltersStore } from '@/stores/Filters'
import { storeToRefs } from 'pinia'
import Color from './FilterComponents/Color.vue'
export default {
    setup() {
        const store = useFiltersStore()
        // const { colors } = storeToRefs(store.instructions[0].additionalData.colors)
        const { instructions } = storeToRefs(store)

        return {
            store,
            instructions
        }
    },
    data() {
        return {
            colors: (this.instructions as any)[this.index!].additionalData.colors
        }
    },
    props: {
        name: String,
        computed: Boolean,
        type: String,
        index: Number,
    },
    components: {
        Color
    },
    computed: {
    },
    methods: {
        addColor(event: Event) {
            this.store.setColor(this.index!, this.colors.length, '#ff0000')
        }
    },

}

</script>

<template>
    <div
        class="innerInstruction"
        draggable="false"
    >
        {{ name }}
        <div class="colors">
            <Color
                v-for="(color, i) in colors"
                :key="i"
                :color="color"
                :instructionIndex="index"
                :index="i"
            >
            </Color>
            <div>
                <input
                    class="addColor"
                    type="button"
                    @click="addColor($event)"
                    value="+"
                    v-if="colors.length < 8"
                >
            </div>
        </div>


    </div>
</template>

<style scoped>
.colors {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    width: 100%;

}

.addColor {
    border-radius: 50%;
    height: 3em;
    width: 3em;
    border: none;
    outline: none;
    background: none;
    appearance: none;
    cursor: pointer;
    backdrop-filter: hue-rotate(180deg);
    color: white;

}

.addColor::-webkit-color-swatch-wrapper {
    padding: 0;
}

.addColor::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
}
</style>
