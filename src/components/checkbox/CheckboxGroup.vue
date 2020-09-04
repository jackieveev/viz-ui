<template>
  <div :class="[
          baseClass
        ]">
    <slot></slot>
  </div>
</template>

<script>
const name = 'viz-checkbox-group'

export default {
  name,
  props: {
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      baseClass: name
    }
  },
  methods: {
    handleToggleItem(item) {
      const index = this.value.indexOf(item)
      if (index !== -1) {
        this.value.splice(index, 1)
      } else {
        this.value.push(item)
      }
      this.$emit('input', this.value)
      this.$emit('on-change', this.value)
    }
  }
}
</script>