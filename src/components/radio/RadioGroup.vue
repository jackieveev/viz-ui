<template>
  <div :class="[baseClass]">
    <slot></slot>
  </div>
</template>

<script>
const name = 'viz-radio-group'
let counter = 10000

export default {
  name,
  props: {
    value: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: () => `${name}_${++counter}`
    }
  },
  data() {
    return {
      baseClass: name
    }
  },
  methods: {
    handleToggleItem(item) {
      this.$emit('input', item)
      this.$emit('on-change', item)
    }
  }
}
</script>