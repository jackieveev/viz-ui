<template>
  <!-- wrapper用于popper使用的dom，因为popper使用到transform，再想做transition不好做
      另外还能用padding-top作为ref和menu的间隙，使得用户在hover时不会快速被关闭 -->
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
      show: true
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