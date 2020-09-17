<template>
  <!-- wrapper用于popper使用的dom，因为popper使用到transform，再想做transition不好做
      另外还能用padding-top作为ref和menu的间隙，使得用户在hover时不会快速被关闭 -->
  <div :class="[`${baseClass}-wrapper`]"
      v-show="show"
      @click.stop="() => {}">
    <transition name="fade-y">
      <div :class="[baseClass]"
          v-show="show"
          @click="handleClick">
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
      const item = this.$slots.default.find((e) => e.elm.contains(ev.target))
      if (item && item.tag) {
        this.$parent.$emit('on-click', item.componentInstance.name)
      }
    }
  }
}
</script>