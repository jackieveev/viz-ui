<template>
  <div :class="[
          baseClass,
          {
            [`${baseClass}--padding`]: showButton
          }
        ]">
    <viz-input v-model="displayValue"
              @blur="handleBlur"
              :disabled="disabled"
              v-bind="$attrs">
    </viz-input>
    <div v-if="showButton"
        :class="[
          buttonClass,
          {
            [`${buttonClass}--disabled`]: disabled
          }
        ]"
        @mousedown="handleMouseDown">
      <i class="viz-icon arrowup" :data-increase="1"></i>
      <i class="viz-icon arrowdown"></i>
    </div>
  </div>
</template>

<script>
import VizInput from '../input'

const name = 'viz-input-number'

export default {
  name,
  props: {
    value: {
      type: [Number, String]
    },
    showButton: {
      type: Boolean,
      default: true
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    precise: {
      type: Number,
      default: 0,
      validator(value) {
        return Number.isInteger(value) && value >= 0
      }
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VizInput
  },
  data() {
    return {
      baseClass: name,
      buttonClass: `${name}__button`,
      displayValue: '',
      previousValue: 0,
      timer: null
    }
  },
  computed: {
    pow() {
      return Math.pow(10, this.precise)
    }
  },
  watch: {
    value(nv) {
      if (nv !== this.displayValue) {
        this.changeValue(nv)
      }
    }
  },
  methods: {
    formatValue(value) {
      let res = +value
      if (Number.isNaN(res)) {
        res = this.previousValue
      }
      if (this.min !== undefined) {
        res = Math.max(res, this.min)
      }
      if (this.max !== undefined) {
        res = Math.min(res, this.max)
      }
      // 正负无穷
      if (!Number.isFinite(res)) {
        return res
      }
      if (this.precise === 0) {
        return Math.floor(res)
      }
      return Math.floor(res * this.pow) / this.pow
    },
    changeValue(value) {
      this.displayValue = this.formatValue(value)
      this.previousValue = this.displayValue
      if (this.displayValue !== this.value) {
        this.emitValue()
      }
    },
    emitValue() {
      this.$emit('input', this.displayValue)
      this.$emit('on-change', this.displayValue)
    },
    changeValueByStep(factor) {
      // 在某些浏览器中会自动将值转换成string，例如IE11，所以要parseFloat
      this.displayValue = this.formatValue(factor * this.step + parseFloat(this.value))
      this.emitValue()
    },
    // 在blur时验证用户输入
    handleBlur() {
      this.changeValue(this.displayValue)
    },
    stepTimer(factor) {
      this.changeValueByStep(factor)
      // 触摸事件300ms，会导致触摸一次加了多个step的距离
      this.timer = window.setTimeout(() => {
        this.stepTimer(factor)
      }, 100)
    },
    handleMouseDown(e) {
      e.preventDefault()
      if (!this.disabled) {
        const factor = e.target.dataset.increase ? 1 : -1
        this.stepTimer(factor)
      }
    },
    handleWindowMouseUp() {
      window.clearTimeout(this.timer)
    }
  },
  created() {
    this.changeValue(this.value)
  },
  mounted() {
    window.addEventListener('mouseup', this.handleWindowMouseUp)
  },
  beforeDestroy() {
    window.clearTimeout(this.timer)
    window.removeEventListener('mouseup', this.handleWindowMouseUp)
  }
}
</script>