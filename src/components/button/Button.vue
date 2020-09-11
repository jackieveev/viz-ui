<template>
  <button :class="[
            baseClass,
            {
              [`${baseClass}--loading`]: loading
            }
          ]"
          :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
const name = 'viz-button'
export default {
  name,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      baseClass: name
    }
  }
}
</script>