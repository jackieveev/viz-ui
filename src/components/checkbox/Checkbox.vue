<template>
  <label :class="[
            baseClass
          ]">
    <input type="checkbox"
          ref="input"
          :checked="checked"
          :disabled="isDisabled"
          @input="handleChange">
    <div :class="[
            displayClass
          ]">
      <i class="viz-icon checked" :class="[`${displayClass}__handle`]"></i>
      <span :class="[`${displayClass}__label`]">
        <slot>{{ label }}</slot>
      </span>
    </div>
  </label>
</template>

<script>
const name = 'viz-checkbox'

export default {
  name,
  props: {
    value: {},
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    },
    label: {},
    disabled: {
      type: Boolean,
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
    isGroup() {
      return this.$parent.$options.name === 'viz-checkbox-group'
    },
    isDisabled() {
      if (this.isGroup && this.$parent.$props && this.$parent.$props.disabled) {
        return true
      }
      return this.disabled
    },
    checked() {
      if (this.isGroup) {
        return this.$parent.value.indexOf(this.label) !== -1
      }
      const value = typeof this.trueValue === 'boolean' ? !!this.value : this.value
      return value === this.trueValue
    }
  },
  methods: {
    handleChange({ target }) {
      if (this.isGroup) {
        this.$parent.handleToggleItem(this.label)
      } else {
        const value = target.checked ? this.trueValue : this.falseValue
        this.$emit('input', value)
        this.$emit('on-change', value)
      }
    }
  }
}
</script>