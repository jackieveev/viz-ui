<template>
  <div :class="[`${baseClass}-wrapper`]"
      v-show="show"
      @click.stop="() => {}">
    <transition name="fade-y">
      <div :class="[baseClass]"
          v-show="show"
          @click="handleClick"
          ref="menu">
        <slot></slot>
      </div>
    </transition>
  </div>
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
  },
  methods: {
    toggle(value) {
      this.show = value
    },
    handleClick(ev) {
      let item = ev.target
      while (item && item.parentNode !== this.$refs.menu) {
        item = item.parentNode
      }
      if (item) {
        this.$parent.$emit('on-click', item.dataset.name)
        this.show = false
      }
    }
  }
}
</script>