<template>
  <label :class="[baseClass]">
    <input type="radio"
          :name="radioName"
          :checked="checked"
          :disabled="isDisabled"
          @change="handleChange">
    <div :class="[displayClass]">
      <span :class="[`${displayClass}__handle`]"></span>
      <span :class="[`${displayClass}__label`]">
        <slot>{{ label }}</slot>
      </span>
    </div>
  </label>
</template>

<script>
const name = 'viz-radio'
export default {
  name,
  props: {
    value: {
      default: null
    },
    label: {},
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
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
      return this.$parent.$options.name === `${name}-group`
    },
    isDisabled() {
      if (this.isGroup && this.$parent.$props && this.$parent.$props.disabled) {
        return true
      }
      return this.disabled
    },
    radioName() {
      if (this.isGroup && this.$parent.$props && this.$parent.$props.name !== undefined) {
        return this.$parent.$props.name
      }
      return this.name
    },
    checked() {
      if (this.isGroup) {
        return this.$parent.value === this.label
      }
      return this.value === this.label
    }
  },
  methods: {
    handleChange({ target }) {
      if (this.isGroup) {
        this.$parent.handleToggleItem(this.label)
      } else {
        const value = target.checked ? this.label : false
        this.$emit('input', value)
        this.$emit('on-change', value)
      }
    }
  }
}
</script>