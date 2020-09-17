<template>
  <dropdown-item :class="[baseClass]"
                :name="value"
                :data-label="label">
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
  computed: {
    // 在dropdown-menu中触发click时抛出的是name
    // 这里重新包装过组件，应该把name也补上
    name() {
      return this.value
    }
  },
  data() {
    return {
      baseClass: name
    }
  }
}
</script>