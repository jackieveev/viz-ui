<template>
  <div :class="[`${baseClass}-wrapper`]"
      v-show="show"
      v-click-outside="handleClickOutside">
    <transition name="fade-y">
      <div :class="[baseClass, dropdown_context.dropdownClass]"
          v-show="show"
          @click="handleItemClick">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { directive } from 'v-click-outside'
const name = 'viz-dropdown-menu'

export default {
  name,
  inject: ['dropdown_context'],
  directives: {
    'click-outside': directive
  },
  data() {
    return {
      baseClass: name
    }
  },
  computed: {
    show() {
      return this.dropdown_context.showMenu
    }
  },
  methods: {
    // IE11 contains方法兼容性不好
    // 判断root是不是target的祖先元素
    contains(root, target) {
      let item = target
      while (item && item !== root) {
        item = item.parentNode
      }
      return !!item
    },
    handleClickOutside(ev) {
      if (this.dropdown_context.trigger === 'hover') {
        return
      }
      // 如果不是ref或ref的子元素触发的则为outside click
      if (ev.target !== this.dropdown_context.refDOM && !this.contains(this.dropdown_context.refDOM, ev.target)) {
        // 关闭
        this.dropdown_context.toggle(false)
      }
    },
    handleItemClick(ev) {
      const item = this.$slots.default.find((e) => this.contains(e.elm, ev.target))
      if (item && item.tag && item.componentInstance) {
        const { name } = item.componentInstance
        this.dropdown_context.$emit('on-menu-click', name)
        this.dropdown_context.toggle(false)
      }
    }
  }
}
</script>