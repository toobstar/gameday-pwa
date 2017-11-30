<template>
  <svg :class="computedClass" :style="computedStyle"><use v-bind="{'xlink:href': iconName}"></use></svg>
</template>

<script>
  export default {
    name: 'icon',
    props: {
      name: {
        type: String,
        required: true,
      },
      width: {
        type: Number,
        default: 20,
      },
      height: {
        type: Number,
        default: 20,
      },
      clazz: {
        type: String,
        default: '',
      },
      scale: {
        type: Number,
        default: 1,
      },
      rotate: {
        type: Number,
        default: 0,
      },
      color: {
        type: String,
        default: '',
      }
    },
    computed: {
      computedClass() {
        let clazz = 'icon'
        if (this.clazz) {
          clazz += ' '+this.clazz
        }
        return clazz
      },
      iconName () { return "#"+this.name },
      computedStyle() {
        let digitReg = /^\d+$/
        let width = digitReg.test(this.width) ? (this.width * this.scale) + 'px' : this.width
        let height = digitReg.test(this.height) ? (this.height * this.scale) + 'px' : this.height
        return {
          width: width,
          height: height,
          transform: 'rotate('+this.rotate+'deg)',
          fill: this.color
        }
      }
    }
  }
</script>
