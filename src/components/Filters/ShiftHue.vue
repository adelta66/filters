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
        <input
            type="range"
            name=""
            id=""
            value="50"
            min="0"
            max="100"
        >
    </div>
</template>

<style scoped></style>
