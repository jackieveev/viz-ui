<template>
  <div :class="[baseClass]">
    <slot></slot>
  </div>
</template>

<script>
const name = 'viz-dropdown-item'

export default {
  name,
  props: {
    name: {
      type: [String, Number]
    }
  },
  data() {
    return {
      baseClass: name
    }
  }
}
</script>