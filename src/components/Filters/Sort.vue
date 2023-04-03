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
    // data() {
    //     return {
    //         value: 0,
    //     }
    // },
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
        {{ name }}

    </div>
</template>

<style scoped>
input {
    width: 100%;
}
</style>
