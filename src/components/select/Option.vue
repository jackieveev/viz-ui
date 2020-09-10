<template>
  <div :class="[baseClass]">
    <slot>{{ label }}</slot>
  </div>
</template>

<script>
const name = 'viz-option'

export default {
  name,
  props: {
    value: {},
    label: {}
  },
  data() {
    return {
      baseClass: name
    }
  }
}
</script>