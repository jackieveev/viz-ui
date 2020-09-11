<template>
  <div :class="[baseClass]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave">
    <slot></slot>
    <slot name="menu"></slot>
  </div>
</template>

<script>
const name = 'viz-dropdown'
import { createPopper } from '@popperjs/core'

export default {
  name,
  props: {
    placement: {
      type: String,
      default: 'bottom',
      validator(e) {
        return ['top', 'top-start', 'top-end',
                'bottom', 'bottom-start', 'bottom-end',
                'right', 'right-start', 'right-end',
                'left', 'left-start', 'left-end'].indexOf(e) !== -1
      }
    },
    trigger: {
      type: String,
      default: 'hover',
      validator(e) {
        return ['hover', 'click'].indexOf(e) !== -1
      }
    }
  },
  data() {
    return {
      baseClass: name,
      popper: null,
      offsetValue: 10,
      updated: false,
      refDOM: null,
      menuCtx: null
    }
  },
  methods: {
    toggle(value) {
      this.$emit('on-change', value)
      if (!this.updated && value) {
        this.popper.update()
        this.updated = true
      }
    },
    handleMouseEnter() {
      this.menuCtx.show = true
      this.toggle(true)
    },
    handleMouseLeave() {
      this.menuCtx.show = false
      this.toggle(false)
    }
  },
  mounted() {
    if (!this.$slots.default || !this.$slots.menu) return
    const ref = this.$slots.default.find(e => e.tag),
          menu = this.$slots.menu.find(e => e.tag)
    if (!ref || !ref.elm || !menu || !menu.elm) {
      return
    }
    this.refDOM = ref.elm
    this.menuCtx = menu.componentInstance
    this.popper = createPopper(ref.elm, menu.elm, {
      placement: this.placement,
      modifiers: {
        name: 'offset',
        options: { offset: [0, this.offsetValue] }
      }
    })
  }
}
</script>