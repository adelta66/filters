// import { ref, computed } from 'vue'
import { toRaw } from 'vue'
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
    case "Sort":
      instruction = {
        name: 'Sort',
        key: 'sort',
        inputColorSpace: '',
        type: 'sort',
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
    workerPool: [] as Array<Worker>,
    allFilters: {
      "sort": {
        name: 'Sort',
        type: 'sort',
        inputColorSpace: '',
        apply(image: image, additionalData?: any) {
          const createDirectionArray = (width: number, height: number, type: string, direction = "") => {
            if (type === 'vertical') {
              let arr = []
              for (let i = 0; i < width; i++) {
                let line = []
                for (let j = 0; j < height; j++) {
                  line.push((i + j * width) * 4)
                }
                arr.push(line)
              }
              if (direction === 'reverse') {

              }
              return arr
            } else if (type === 'horizontal') {
              let arr = []
              for (let i = 0; i < height; i++) {
                let line = []
                for (let j = 0; j < width; j++) {
                  line.push((j + i * height) * 4)
                }
                arr.push(line)
              }
              if (direction === 'reverse') {

              }
              return arr
            } else if (type === 'diagonal') {

            }
          }
          let directionArray = createDirectionArray(additionalData.width, additionalData.height, 'vertical', 'reverse') as number[][]
          let newImage = new Uint8ClampedArray(image.length)

          directionArray.forEach((line) => {
            let pixels = [] as Array<Array<number>>
            line.forEach(pixelIndex => {
              pixels.push([
                image[pixelIndex],
                image[pixelIndex + 1],
                image[pixelIndex + 2],
                image[pixelIndex + 3],
              ])
            })
            pixels.sort((a, b) => {
              if (a[0] < b[0]) {
                return -1
              }
              if (a[0] > b[0]) {
                return 1
              }
              return 0
            })

            for (let i = 0; i < line.length; i++) {
              newImage[line[i]] = pixels[i][0]
              newImage[line[i] + 1] = pixels[i][1]
              newImage[line[i] + 2] = pixels[i][2]
              newImage[line[i] + 3] = pixels[i][3]
            }
          })

          return newImage


        }
      },
      "shiftHue": {
        name: 'Shift Hue',
        type: 'color',
        inputColorSpace: 'HSV',
        apply(image: image, additionalData?: any) {
          let deg = (additionalData === undefined) ? 0 : additionalData.value
          let shiftValue = deg / 360 * 255
          // let shiftValue = deg
          console.log(shiftValue, "shiftValue")

          let newImage = new Uint8ClampedArray(image.length)
          for (let i = 0; i < image.length; i += 4) {
            let hue = Math.abs((image[i] + shiftValue) % 255)

            newImage[i] = hue
            newImage[i + 1] = image[i + 1]
            newImage[i + 2] = image[i + 2]
            newImage[i + 3] = image[i + 3]
          }
          return newImage
        }
      },
      "RGBtoHSV": {
        name: 'RGB to HSV',
        type: 'colorSpace',
        inputColorSpace: 'RGB',
        apply(image: image, additionalData?: any) {
          const RGBtoHSV = (r: number, g: number, b: number) => {
            let max = Math.max(r, g, b), min = Math.min(r, g, b),
              d = max - min,
              h,
              s = (max === 0 ? 0 : d / max),
              v = max / 255

            switch (max) {
              case min: h = 0; break
              case r: h = (g - b) + d * (g < b ? 6 : 0); h /= 6 * d; break
              case g: h = (b - r) + d * 2; h /= 6 * d; break
              case b: h = (r - g) + d * 4; h /= 6 * d; break
              default: h = 0; break
            }

            return {
              h: h,
              s: s,
              v: v
            }
          }
          let imageHSV = new Uint8ClampedArray(image.length)
          for (let i = 0; i < image.length; i += 4) {
            let hsv = RGBtoHSV(image[i], image[i + 1], image[i + 2])
            imageHSV[i] = hsv.h * 255
            imageHSV[i + 1] = hsv.s * 255
            imageHSV[i + 2] = hsv.v * 255
            imageHSV[i + 3] = image[i + 3]
          }
          return imageHSV
        }
      },
      "HSVtoRGB": {
        name: 'HSV to RGB',
        type: 'colorSpace',
        inputColorSpace: 'HSV',
        apply(image: image, additionalData?: any) {
          const HSVtoRGB = (h: number, s: number, v: number) => {
            h /= 255
            s /= 255
            v /= 255
            let r, g, b, i, f, p, q, t
            i = Math.floor(h * 6)
            f = h * 6 - i
            p = v * (1 - s)
            q = v * (1 - f * s)
            t = v * (1 - (1 - f) * s)
            switch (i % 6) {
              case 0: r = v, g = t, b = p; break
              case 1: r = q, g = v, b = p; break
              case 2: r = p, g = v, b = t; break
              case 3: r = p, g = q, b = v; break
              case 4: r = t, g = p, b = v; break
              case 5: r = v, g = p, b = q; break
              default: r = 0, g = 0, b = 0; break
            }
            return {
              r: Math.round(r * 255),
              g: Math.round(g * 255),
              b: Math.round(b * 255)
            }
          }
          let imageRGB = new Uint8ClampedArray(image.length)
          for (let i = 0; i < image.length; i += 4) {
            let rgb = HSVtoRGB(image[i], image[i + 1], image[i + 2])
            imageRGB[i] = rgb.r
            imageRGB[i + 1] = rgb.g
            imageRGB[i + 2] = rgb.b
            imageRGB[i + 3] = image[i + 3]
          }
          return imageRGB
        }
      },
    },
    instructions: [] as Array<instruction>,
    images: [] as Array<image>,
    baseImage: new Uint8ClampedArray(0) as image,
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
        let image = ctx.getImageData(0, 0, img.width, img.height).data
        this.baseImage = image

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
      let additionalData = instruction.additionalData == undefined ? {} : instruction.additionalData
      additionalData.width = this.width
      additionalData.height = this.height

      let image
      if (index == 0) {
        image = toRaw(this.baseImage)
      } else {
        if (!(this.instructions[index - 1].computed)) {
          this.compute(index - 1)
        }
        image = toRaw(this.images[index - 1])
      }
      this.startTime()

      let result = (this.allFilters as any)[instruction.key as string].apply(image, additionalData)
      this.images[index] = result

      this.setInstructionComputed(index, true)
      console.log(index, instruction.name, this.endTime() + "ms")
    },
    displayImage(index: number = -1) {
      let canvas: HTMLCanvasElement = document.querySelector('#displayCanvas') as HTMLCanvasElement
      let ctx = canvas.getContext('2d')

      canvas.width = this.width
      canvas.height = this.height

      let image
      this.startTime()
      if (index == -1) {
        image = toRaw(this.baseImage)
      } else {
        image = toRaw(this.images[index])
      }

      ctx?.putImageData(new ImageData(image, this.width, this.height), 0, 0)
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
