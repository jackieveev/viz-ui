<template>
  <div :class="[baseClass]">
    <slot></slot>
  </div>
</template>

<script>
const name = 'viz-dropdown-item'

export default {
  name,
  data() {
    return {
      baseClass: name
    }
  }
}
</script>