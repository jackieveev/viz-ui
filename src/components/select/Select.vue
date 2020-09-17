<template>
  <dropdown :class="[baseClass]"
            trigger="click"
            ref="dropdown"
            @on-click="handleMenuClick">
    <viz-input :placeholder="placeholder"></viz-input>
    <slot slot="menu"></slot>
  </dropdown>
</template>

<script>
import VizInput from '../input'
import Drop from '../dropdown'

const name = 'viz-select'

export default {
  name,
  props: {
    placeholder: {
      type: [String, Number],
      default: '请选择'
    }
  },
  components: {
    VizInput,
    Dropdown: Drop.Dropdown,
  },
  data() {
    return {
      baseClass: name
    }
  },
  methods: {
    handleMenuClick(value) {
      console.log('@', value)
    }
  }
}
</script>