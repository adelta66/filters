<script lang="ts">
import { useFiltersStore } from '@/stores/Filters'

export default {
    setup() {
        const store = useFiltersStore()
        return {
            store
        }
    },
    props: {
        index: Number,
    },
    methods: {
        onDrop(event: DragEvent) {
            let filterName: string = event.dataTransfer?.getData('filterName') as string
            this.store.addInstruction(filterName, this.index as number)
        }
    }
}
</script>
<script lang="ts">

</script>

<template>
    <div
        class="instruction droppableSpace"
        @drop="onDrop($event)"
        @dragover.prevent
        @dragenter.prevent
    >

    </div>
</template>

<style scoped></style>
