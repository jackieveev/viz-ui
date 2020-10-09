<template>
  <div :class="[baseClass]">
    <slot></slot>
    <slot name="menu"></slot>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import { directive } from 'v-click-outside'

const name = 'viz-dropdown'

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
        return ['hover', 'click', 'custom'].indexOf(e) !== -1
      }
    },
    dropdownClass: {
      type: String
    }
  },
  provide() {
    return {
      dropdown_context: this
    }
  },
  data() {
    return {
      baseClass: name,
      popper: null,
      showMenu: false,
      refDOM: null,
      menuDOM: null
    }
  },
  methods: {
    toggle(value) {
      if (value !== this.showMenu) {
        this.showMenu = value
        this.$emit('on-visible-change', value)
        // menu的位置可能不对，显示时update一下
        if (value) {
          this.popper.update()
        }
      }
    }
  },
  mounted() {
    if (!Array.isArray(this.$slots.default)) return
    const ref = this.$slots.default.find(e => e && e.tag)
    if (!ref) return
    if (!Array.isArray(this.$slots.menu)) return
    const menu = this.$slots.menu.find(e => e && e.tag)
    if (!menu) return
    this.refDOM = ref.elm
    this.menuDOM = menu.elm
    document.body.appendChild(this.menuDOM)
    this.popper = createPopper(this.refDOM, this.menuDOM, {
      placement: this.placement
    })
    // dom events
    if (this.trigger === 'hover') {
        this.handleMouseEnter = () => this.toggle(true)
        this.handleMouseLeave = () => this.toggle(false)
        [this.refDOM, this.menuDOM].forEach(dom => {
          dom.addEventListener('mouseenter', this.handleMouseEnter)
          dom.addEventListener('mouseleave', this.handleMouseLeave)
        })
        this.removeListeners = () => {
          [this.refDOM, this.menuDOM].forEach(dom => {
            dom.removeEventListener('mouseenter', this.handleMouseEnter)
            dom.removeEventListener('mouseleave', this.handleMouseLeave)
          })
        }
      } else if (this.trigger === 'click') {
        this.handleClick = () => this.toggle(!this.showMenu)
        this.refDOM.addEventListener('click', this.handleClick)
        this.removeListeners = () => {
          this.refDOM.removeListeners('click', this.handleClick)
        }
      }
  },
  beforeDestroy() {
    if (this.removeListeners) {
      this.removeListeners()
    }
    this.popper.destroy()
    this.popper = null
    this.refDOM = null
    this.menuDOM = null
  }
}
</script>