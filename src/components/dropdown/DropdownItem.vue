<template>
  <div :class="[
          baseClass,
          {
            [`${baseClass}--selected`]: selected
          }
        ]"
        :data-name="name">
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
  },
  computed: {
    selected() {
      return false
    }
  }
}
</script>