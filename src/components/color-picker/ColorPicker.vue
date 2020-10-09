<template>
  <dropdown :class="[baseClass]"
            trigger="click"
            :dropdown-class="`${baseClass}__dropdown`">
    <div :class="[`${baseClass}__handle`]"></div>
    <dropdown-menu slot="menu">
      sadlfkjaslfkd
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
      baseClass: name
    }
  }
}
</script>