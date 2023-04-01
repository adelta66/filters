// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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
    computationStart: new Date(),
    allFilters: {
      "shiftHue": {
        name: 'Shift Hue',
        type: 'color',
        inputColorSpace: 'HSV',
        apply(image: imageHSV, additionalData?: any) {
          let deg = additionalData.value
          let shiftValue = deg / 360 * 255
          return image.map((pixel) => {
            let hue = pixel[0] + shiftValue
            if (hue > 255) {
              hue -= 255
            } else if (hue < 0) {
              hue += 255
            }
            return [hue, pixel[1], pixel[2], pixel[3]]
          })
        }
      },
      "RGBtoHSV": {
        name: 'RGB to HSV',
        type: 'colorSpace',
        inputColorSpace: 'RGB',
        apply(image: imageRGB, additionalData?: any) {
          const pixelRgbToHsv = (r: number, g: number, b: number, a: number) => {
            r /= 255
            g /= 255
            b /= 255

            let max = Math.max(r, g, b)
            let min = Math.min(r, g, b)
            let h, s, v = max

            let d = max - min
            s = max == 0 ? 0 : d / max

            if (max == min) {
              h = 0
            } else {
              switch (max) {
                case r:
                  h = (g - b) / d + (g < b ? 6 : 0)
                  break
                case g:
                  h = (b - r) / d + 2
                  break
                case b:
                  h = (r - g) / d + 4
                  break
              }
              if (h === undefined) h = 0
              h /= 6
            }
            return [h * 255, s * 255, v * 255, a]
          }
          let imageHSV = image.map((pixel) => {
            return pixelRgbToHsv(pixel[0], pixel[1], pixel[2], pixel[3])
          })
          return imageHSV
        }
      },
      "HSVtoRGB": {
        name: 'HSV to RGB',
        type: 'colorSpace',
        inputColorSpace: 'HSV',
        apply(image: imageHSV, additionalData?: any) {
          const pixelHsvToRgb = (h: number, s: number, v: number, a: number) => {
            h /= 255
            s /= 255
            v /= 255
            let r, g, b

            let i = Math.floor(h * 6)
            let f = h * 6 - i
            let p = v * (1 - s)
            let q = v * (1 - f * s)
            let t = v * (1 - (1 - f) * s)

            switch (i % 6) {
              case 0:
                r = v, g = t, b = p
                break
              case 1:
                r = q, g = v, b = p
                break
              case 2:
                r = p, g = v, b = t
                break
              case 3:
                r = p, g = q, b = v
                break
              case 4:
                r = t, g = p, b = v
                break
              case 5:
                r = v, g = p, b = q
                break
            }
            if ((r === undefined) || (g === undefined) || (b === undefined)) {
              r = 0
              g = 0
              b = 0
            }
            return [r * 255, g * 255, b * 255, a]
          }

          let imageRGB = image.map((pixel) => {
            return pixelHsvToRgb(pixel[0], pixel[1], pixel[2], pixel[3])
          })
          return imageRGB
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
      let additionalData = instruction.additionalData
      let image
      if (index == 0) {
        image = this.baseImage
      } else {
        if (!this.instructions[index - 1].computed) {
          this.compute(index - 1)
        }
        image = this.images[this.images.length - 1]
      }
      this.startTime()

      let result = (this.allFilters as any)[instruction.key as string].apply(image.data, additionalData)
      this.images[index] = {
        colorSpace: instruction.inputColorSpace,
        data: result
      }
      this.setInstructionComputed(index, true)
      console.log(index, instruction.name, this.endTime() + "ms")

    },
    displayImage(index: number = -1) {
      console.log(index)
      console.log(this.images)


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

    },
    setAdditionalData(index: number, data: any) {
      this.instructions[index].additionalData = data
    },
    startTime() {
      this.computationStart = new Date()
    },
    endTime() {
      let computationEnd = new Date()
      return computationEnd.getTime() - this.computationStart.getTime()
    }
  },
})
