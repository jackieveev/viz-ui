<template>
  <dropdown :class="[baseClass]"
            trigger="click">
    <div :class="[`${baseClass}__handle`]"></div>
  </dropdown>
</template>

<script>
import Drop from '../dropdown'
name = 'viz-color-picker'

export default {
  name,
  components: {
    Dropdown: Drop.Dropdown
  },
  data() {
    return {
      baseClass: name
    }
  }
}
</script>