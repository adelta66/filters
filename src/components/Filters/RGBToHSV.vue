<script lang="ts">
export default {
    props: {
        name: String,
        computed: Boolean,
        type: String,
    },
    computed: {

    }
}

</script>

<template>
    <div
        class="instruction"
        draggable="false"
        :class="type"
    >
        {{ name }}
    </div>
</template>

<style scoped></style>
