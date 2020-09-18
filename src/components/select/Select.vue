<template>
  <dropdown :class="[baseClass]"
            trigger="custom"
            ref="dropdown"
            :dropdown-class="`${baseClass}__dropdown`"
            @on-menu-click="handleMenuClick"
            @on-menu-select="handleMenuSelect">
    <viz-input :placeholder="placeholder"
              @focus="handleFocus">
    </viz-input>
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
    value: {},
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
    },
    handleMenuSelect(vnode) {
      console.log(vnode)
    },
    handleFocus() {
      this.$refs.dropdown.toggle(true)
    }
  },
  mounted() {
    this.$refs.dropdown.select(this.value)
  }
}
</script>