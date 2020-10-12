<template>
  <dropdown :class="[baseClass]"
            :dropdown-class="`${baseClass}__dropdown`"
            trigger="custom"
            placement="top"
            ref="dropdown"
            @on-visible-change="handleDropdownVisibleChange">
    <div :class="[
            `${baseClass}__handle`,
            {
              [`${baseClass}__handle--focus`]: show
            }
          ]" @click="handleClick"></div>
    <dropdown-menu slot="menu">
      <div :class="[`${baseClass}__pallet`]">
        <div :class="[`${baseClass}__tranparent-bg`]"></div>
        <span :class="[`${baseClass}__picker`]"></span>
      </div>
      <div :class="[`${baseClass}__hue`]"></div>
      
    </dropdown-menu>
  </dropdown>
</template>

<script>
import Drop from '../dropdown'
name = 'viz-color-picker'

export default {
  name,
  components: {
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
    handleClick() {
      this.show = !this.show
      this.$refs.dropdown.toggle(this.show)
    },
    handleDropdownVisibleChange(value) {
      this.show = value
    }
  }
}
</script>