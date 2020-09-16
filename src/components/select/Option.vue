<template>
  <dropdown-item :class="[baseClass]"
                :name="value">
    <slot>{{ label }}</slot>
  </dropdown-item>
</template>

<script>
import Drop from '../dropdown'

const name = 'viz-option'

export default {
  name,
  props: {
    value: {
      type: [String, Number]
    },
    label: {
      type: [String, Number]
    }
  },
  components: {
    DropdownItem: Drop.DropdownItem
  },
  data() {
    return {
      baseClass: name
    }
  }
}
</script>