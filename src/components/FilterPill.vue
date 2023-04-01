<script lang="ts">
export default {
    props: {
        filterName: String,
        filterType: String,
    },
    computed: {
        filterTypeClass(): object {
            return {
                typeSort: this.filterType === 'Sort',
                typeColor: this.filterType === 'Color',
                typeMask: this.filterType === 'Mask',
                typeColorSpace: this.filterType === 'colorSpace',
            }
        }
    },
    methods: {
        startDrag(event: DragEvent, filterName: string) {
            event.dataTransfer?.setData('filterName', filterName)
        }
    }
}

</script>

<template>
    <div
        class="filter"
        draggable="true"
        :class="filterTypeClass"
        @dragstart="startDrag($event, filterName as string)"
    >
        {{ filterName }}
    </div>
</template>

<style scoped>
.filter {
    background-color: rgb(255, 184, 184);
    margin: auto;
    padding: 5px;
    border-radius: 20px;
    border: 1px solid rgb(66, 66, 66);
    flex-grow: 0;
    color: white;
    user-select: none;
    cursor: grabbing
}

.typeSort {
    background-color: rgb(255, 120, 120);
}

.typeColorSpace {
    background-color: rgb(131, 255, 193);
    color: black;
}

.typeColor {
    background-color: rgb(255, 184, 184);
}

.typeMask {
    background-color: rgb(255, 184, 184);
}
</style>
