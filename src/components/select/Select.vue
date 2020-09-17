<template>
  <dropdown :class="[baseClass]"
            trigger="click"
            ref="dropdown"
            @on-click="handleMenuClick">
    <viz-input :placeholder="placeholder">
    </viz-input>
    <dropdown-menu slot="menu">
      <slot></slot>
    </dropdown-menu>
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
    DropdownMenu: Drop.DropdownMenu
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
  },
  mounted() {
    console.log(this.$slots)
  }
}
</script>