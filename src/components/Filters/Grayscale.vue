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
        class="innerInstruction"
        draggable="false"
    >
        {{ name }}
    </div>
</template>

<style scoped></style>
