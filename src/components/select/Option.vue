<template>
  <dropdown-item :class="[
                    baseClass,
                    {
                      [`${baseClass}--selected`]: selected
                    }
                  ]"
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
  inject: ['select_context'],
  computed: {
    // 在dropdown-menu中触发click时抛出的是name
    // 这里重新包装过组件，应该把name也补上
    name() {
      return {
        value: this.value,
        label: this.label
      }
    },
    selected() {
      return this.select_context.value === this.value
    }
  },
  data() {
    return {
      baseClass: name
    }
  }
}
</script>