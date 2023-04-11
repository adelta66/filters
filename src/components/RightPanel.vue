<script lang="ts">
export default {
    data() {
        return {
            scale: 1
        }
    },
    methods: {
        updateScale(canvas: any) {
            canvas.style.transform = `scale(${this.$data.scale})`
        },
        canvasScaling(event: KeyboardEvent) {
            const scaleStep = 0.2
            let canvas = document.querySelector('#displayCanvas')
            if (event.key === 'ArrowUp') {
                this.$data.scale += scaleStep
                this.updateScale(canvas)
            } else if (event.key === 'ArrowDown') {
                this.$data.scale -= scaleStep
                this.updateScale(canvas)
            } else if (event.key === 'ArrowLeft') {
                this.$data.scale = 1
                this.updateScale(canvas)
            } else if (event.key === 'ArrowRight') {


            }
        }
    },
    mounted() {
        document.addEventListener('keydown', this.canvasScaling)
    }
}

</script>

<template>
    <div class="right">
        <canvas
            id="displayCanvas"
            @keydown="canvasScaling($event)"
        >

        </canvas>
    </div>
</template>

<style scoped>
.filters {
    background-color: rgb(156, 156, 156);
    width: 100%;
    flex-grow: 0;
    display: flex;
    flex-wrap: wrap;
    padding: 5px
}

#displayCanvas {
    image-rendering: pixelated
}
</style>
