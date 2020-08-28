<template>
  <div :class="[
          baseClass,
          {
            [`${baseClass}--padding`]: showButton
          }
        ]">
    <viz-input v-model="displayValue"
              @blur="handleBlur"
              v-bind="$attrs"
              v-on="$listeners">
    </viz-input>
    <div v-if="showButton" :class="[buttonClass]">
      <i class="viz-icon arrowup" @click="handleChangeValue(1)"></i>
      <i class="viz-icon arrowdown" @click="handleChangeValue(-1)"></i>
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
    }
  },
  components: {
    VizInput
  },
  data() {
    return {
      baseClass: name,
      buttonClass: `${name}__button`,
      displayValue: ''
    }
  },
  methods: {
    formatValue(value) {
      let res = parseFloat(value)
      if (Number.isNaN(res)) {
        res = 0
      }
      if (this.min !== undefined) {
        res = Math.max(res, this.min)
      }
      if (this.max !== undefined) {
        res = Math.min(res, this.max)
      }
      // 正负无穷
      if (Number.isFinite(res)) {
        return res
      }
      if (this.precise === 0) {
        return 
      }
    },
    handleChangeValue(factor) {
    },
    // 在blur时验证用户输入
    handleBlur() {
      this.displayValue = this.formatValue(this.displayValue)
    }
  },
  created() {
    this.displayValue = this.formatValue(this.value)
  }
}
</script>