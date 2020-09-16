<template>
  <dropdown :class="[baseClass]"
            trigger="custom"
            :show="show"
            @on-click="handleClick">
    <viz-input @focus="handleFocus">
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
  components: {
    VizInput,
    Dropdown: Drop.Dropdown,
    DropdownMenu: Drop.DropdownMenu
  },
  data() {
    return {
      baseClass: name,
      show: false
    }
  },
  methods: {
    handleFocus() {
      this.show = true
    },
    handleClick(value) {
      console.log('@', value)
    }
  }
}
</script>