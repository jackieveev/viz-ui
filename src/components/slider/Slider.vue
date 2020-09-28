<template>
  <div :class="[`${baseClass}-wrapper`]">
    <div :class="[baseClass]" :style="{ width: showInput ? 'calc(100% - 90px)' : '100%' }">
      <div :class="[`${baseClass}__track`]"
          @mousedown="handleMouseDown"
          ref="track">
        <span :class="[`${baseClass}__highlight-track`]"
              :style="{ width: `${length}px` }"
              ref="htrack"></span>
        <tooltip dis-hover 
                :content="value"
                :value="showTooltip"
                :offset="tooltipOffset"
                :placement="tooltipPlacement">
          <div :class="[`${baseClass}__thumb`]"
              :style="{
                transform: `translate3D(${length}px, 0, 0)`
              }">
          </div>
        </tooltip>
      </div>
    </div>
    <input-number v-if="showInput"
                  :value="value"
                  :min="min"
                  :max="max"
                  @on-change="emitValue">
    </input-number>
  </div>
</template>

<script>
import Tooltip from '../tooltip'
import InputNumber from '../input-number'
import { frameDebounce } from '@/util/helpers'

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
    },
    showValue: {
      type: String,
      default: 'drag',
      validator(e) {
        return ['drag', 'always', 'never'].indexOf(e) !== -1
      }
    },
    tooltipPlacement: {
      type: String
    },
    tooltipOffset: {
      type: Number,
      default: 15
    },
    showInput: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Tooltip,
    InputNumber
  },
  data() {
    return {
      baseClass: name,
      drag: false,
      length: 0,
      timer: null
    }
  },
  computed: {
    showTooltip() {
      if (this.showValue === 'drag') {
        return this.drag
      }
      return this.showValue === 'always'
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
      // click to change
      if (srcElement === this.$refs.track || srcElement === this.$refs.htrack) {
        this.emitValue(this.getValue(offsetX))
      }
      // 不区分click和drag应该更省事些，是吗？
      // 或者用以下方式来区分是点击还是拖拽
      // if (clickElement === track) {
      //   this.emitValue()
      // } else {
      //   this.drag = true
      // }
      this.drag = true
    },
    mousemoveHandler({ pageX }) {
      if (this.drag) {
        const rect = this.$refs.track.getBoundingClientRect(),
              value = Math.min(
                Math.max(this.min, this.getValue(pageX - this.$refs.track.getBoundingClientRect().left)),
                this.max
              )
        this.emitValue(value)
      }
    },
    emitValue(value) {
      if (value !== this.value) {
        this.$emit('input', value)
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
    this.handleMouseMove = frameDebounce(this.mousemoveHandler)
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