<template>
  <div :class="[baseClass]"
      v-click-outside="handleClickOutside">
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
    }
  },
  directives: {
    'click-outside': directive
  },
  data() {
    return {
      baseClass: name,
      popper: null,
      refDOM: null,
      ctx: null
    }
  },
  methods: {
    handleClickOutside(ev) {
      if (this.trigger === 'click') {
        this.toggle(false)
      }
    },
    toggle(value) {
      this.ctx.toggle(value)
      this.$emit('on-change', value)
      // 由于dom的display为none，popper的位置
      // 可能有误，所以在显示后要update一次
      if (value) {
        this.$emit('updatePopper')
      }
    },
    addBindings() {
      if (this.trigger === 'hover') {
        this.handleMouseEnter = () => this.toggle(true)
        this.handleMouseLeave = () => this.toggle(false)
        this.$el.addEventListener('mouseenter', this.handleMouseEnter)
        this.$el.addEventListener('mouseleave', this.handleMouseLeave)
      } else if (this.trigger === 'click') {
        this.handleClick = () => this.toggle(!this.ctx.show)
        this.refDOM.addEventListener('click', this.handleClick)
      }
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
    this.ctx = menu.componentInstance
    this.popper = createPopper(ref.elm, menu.elm, {
      placement: this.placement
    })
    this.$once('updatePopper', () => {
      this.popper.update()
    })
    this.addBindings()
  },
  beforeDestroy() {
    this.$el.removeEventListener('mouseenter', this.handleMouseEnter)
    this.$el.removeEventListener('moouseleave', this.handleMouseLeave)
    this.popper.destroy()
    this.refDOM = null
    this.ctx = null
  }
}
</script>