<template>
  <div :class="[baseClass]">
    <div :class="[`${baseClass}__track`]"
        @mousedown="handleMouseDown"
        ref="track">
      <span :class="[`${baseClass}__highlight-track`]" :style="{ width: `${length}px` }"></span>
      <tooltip content="123" :hover="false" :value="drag">
        <div :class="[`${baseClass}__thumb`]"
            :style="{
              transform: `translate3D(${length}px, 0, 0)`
            }">
        </div>
      </tooltip>
    </div>
  </div>
</template>

<script>
import Tooltip from '../tooltip'
import { getOffset } from '@/util/helpers'

const name = 'viz-slider'

export default {
  name,
  props: {
    value: {
      type: Number,
      default: 0,
      required: true
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    }
  },
  components: {
    Tooltip
  },
  data() {
    return {
      baseClass: name,
      drag: false,
      length: 0
    }
  },
  watch: {
    value() {
      this.setLength()
    }
  },
  methods: {
    handleMouseDown(ev) {
      const { srcElement, pageX, offsetX } = ev
      ev.preventDefault()
      // click
      if (srcElement === this.$refs.track) {
        // this.$emit('input', this.getValue(offsetX))
        
      } else {
        // drag
        this.drag = true
      }
    },
    handleMouseMove({ pageX }) {
      if (this.drag) {
        const rect = this.$refs.track.getBoundingClientRect()
        this.$emit('input', Math.min(Math.max(this.min, this.getValue(pageX - this.$refs.track.getBoundingClientRect().left)), this.max))
      }
    },
    getValue(value) {
      return Math.round(value / this.getTrackLength() * (this.max - this.min) + this.min, 2)
    },
    getTrackLength() {
      return parseFloat(getComputedStyle(this.$refs.track, null).width)
    },
    handleMouseUp() {
      this.drag = false
    },
    setLength() {
      this.length = Math.round((this.value - this.min) / (this.max - this.min) * this.getTrackLength())
    }
  },
  created() {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  },
  mounted() {
    this.setLength()
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }
}
</script>