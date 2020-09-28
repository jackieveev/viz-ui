<template>
  <label :class="[baseClass]">
    <input type="checkbox"
          :checked="checked"
          :disabled="disabled"
          @change="handleChange">
    <div :class="[displayClass]">
      <span :class="[`${displayClass}__handle`]"></span>
    </div>
  </label>
</template>

<script>
const name = 'viz-switch'

export default {
  name,
  props: {
    value: {},
    disabled: {
      type: Boolean,
      default: false
    },
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    }
  },
  data() {
    return {
      baseClass: name,
      displayClass: `${name}-display`
    }
  },
  computed: {
    checked() {
      return this.value === this.trueValue
    }
  },
  methods: {
    handleChange({ target }) {
      const value = target.checked ? this.trueValue : this.falseValue
      this.$emit('input', value)
      this.$emit('on-change', value)
    }
  }
}
</script>