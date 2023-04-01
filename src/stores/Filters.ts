// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
type imageHSV = Array<Array<number>>
type imageRGB = Array<Array<number>>
interface instruction {
  name: string,
  key: string,
  inputColorSpace: string,
  type: string,
  computed: boolean,
}

const makeInstruction = (name: string): instruction | {} => {
  let instruction
  switch (name) {
    case "HSV to RGB":
      instruction = {
        name: 'HSV to RGB',
        key: 'HSVtoRGB',
        inputColorSpace: 'HSV',
        type: 'colorSpace',
        computed: false,
      }
      break
    case "RGB to HSV":
      instruction = {
        name: 'RGB to HSV',
        key: 'RGBtoHSV',
        inputColorSpace: 'RGB',
        type: 'colorSpace',
        computed: false,
      }
      break
    case "Shift Hue":
      instruction = {
        name: 'Shift Hue',
        key: 'shiftHue',
        inputColorSpace: 'HSV',
        type: 'color',
        computed: false,
      }
      break
    default:
      instruction = {}
      break
  }
  return instruction
}
export const useFiltersStore = defineStore('filters', {
  state: () => ({
    width: 0,
    height: 0,
    allFilters: {
      "shiftHue": {
        name: 'Shift Hue',
        type: 'color',
        inputColorSpace: 'HSV',
        apply(image: imageHSV) {
          // do something
        }
      },
      "RGBtoHSV": {
        name: 'RGB to HSV',
        type: 'colorSpace',
        inputColorSpace: 'RGB',
        apply(image: imageRGB) {
          // do something
        }
      },
      "HSVtoRGB": {
        name: 'HSV to RGB',
        type: 'colorSpace',
        inputColorSpace: 'HSV',
        apply(image: imageHSV) {
          // do something
        }
      },
    },
    instructions: [] as Array<instruction>,
    images: [] as Array<{ colorSpace: string, data: imageHSV | imageRGB }>,
    baseImage: {} as { colorSpace: string, data: imageHSV | imageRGB },
  }),
  getters: {

  },
  actions: {
    setBaseImage(event: Event) {
      let img = new Image()
      img.src = URL.createObjectURL((event.target as HTMLInputElement).files![0])
      img.onload = () => {
        let canvas: HTMLCanvasElement = document.querySelector('#displayCanvas') as HTMLCanvasElement
        canvas.width = img.width
        canvas.height = img.height
        this.width = img.width
        this.height = img.height
        let ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)
        let imageData = ctx.getImageData(0, 0, img.width, img.height)
        let data = imageData.data
        let image: imageRGB = []
        for (let i = 0; i < data.length; i += 4) {
          image.push([data[i], data[i + 1], data[i + 2], data[i + 3]])
        }
        this.baseImage = {
          colorSpace: 'RGB',
          data: image
        }

        this.setInstructionsComputed(this.instructions.length, false)
      }

    },
    addInstruction(name: string, index: number) {
      let instruction: any = makeInstruction(name)

      this.instructions.splice(index + 1, 0, instruction)
      this.setInstructionsComputed(index + 2, false)
      console.log(this.instructions)

    },
    setInstructionComputed(index: number, computed: boolean) {
      this.instructions[index].computed = computed
    },
    setInstructionsComputed(index: number, computed: boolean) {
      for (let i = index; i < this.instructions.length; i++) {
        this.setInstructionComputed(i, computed)
      }
    },
    compute(index: number) {
      let instruction = this.instructions[index]
      let image = (index != 0) ? this.images[this.images.length - 1] : this.baseImage
      if (instruction.inputColorSpace != image.colorSpace) {
        //TODO: zmień colorspace
      }
      let result = (this.allFilters as any)[instruction.key as string].apply(image)
      this.images[index + 1] = {
        colorSpace: instruction.inputColorSpace,
        data: result
      }
      this.setInstructionComputed(index, true)
    },
    displayImage(index: number = -1) {
      let canvas: HTMLCanvasElement = document.querySelector('#displayCanvas') as HTMLCanvasElement
      let ctx = canvas.getContext('2d')

      canvas.width = this.width
      canvas.height = this.height

      let image
      if (index == -1) {
        image = this.baseImage.data
      } else {
        image = this.images[index].data
      }
      let imageUint8 = new Uint8ClampedArray(image.flat())

      ctx?.putImageData(new ImageData(imageUint8, this.width, this.height), 0, 0)

    }

  },
})
