<template>
  <transition name="fade">
    <div :class="[baseClass]"
        v-show="show">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
const name = 'viz-dropdown-menu'

export default {
  name,
  data() {
    return {
      baseClass: name,
      show: false
    }
  }
}
</script>