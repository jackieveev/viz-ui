<template>
  <div :class="[baseClass]"
      v-click-outside="handleClickOutside">
    <slot></slot>
    <!-- wrapper用于popper使用的dom，因为popper使用到transform，再想做transition不好做
      另外还能用padding-top作为ref和menu的间隙，使得用户在hover时不会快速被关闭 -->
    <div :class="[`${menuClass}-wrapper`]"
        ref="menu"
        v-show="show">
      <transition name="fade-y">
        <div :class="[menuClass]"
            v-show="show"
            @click="handleMenuClick">
          <slot name="menu"></slot>
        </div>
      </transition>
    </div>
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
      menuClass: `${name}__menu`,
      popper: null,
      refDOM: null,
      show: false
    }
  },
  methods: {
    handleClickOutside(ev) {
      if (this.trigger === 'click') {
        this.toggle(false)
      }
    },
    toggle(value) {
      this.show = value
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
        this.handleRefClick = () => this.toggle(true)
        this.refDOM.addEventListener('click', this.handleRefClick)
      }
    },
    updatePopper() {
      this.popper.update()
    },
    handleMenuClick(name) {
      this.$emit('on-menu-click', name)
      this.toggle(false)
    },
    handleMenuClick(ev) {
      const item = this.$slots.menu.find((e) => e.elm.contains(ev.target))
      if (item && item.tag) {
        this.$emit('on-click', item.componentInstance.name)
        this.show = false
      }
    }
  },
  mounted() {
    if (!this.$slots.default) return
    const ref = this.$slots.default.find(e => e.tag)
    if (!ref || !ref.elm) {
      return
    }
    this.refDOM = ref.elm
    this.popper = createPopper(ref.elm, this.$refs.menu, {
      placement: this.placement
    })
    this.$once('updatePopper', this.updatePopper)
    this.addBindings()
  },
  beforeDestroy() {
    this.$el.removeEventListener('mouseenter', this.handleMouseEnter)
    this.$el.removeEventListener('moouseleave', this.handleMouseLeave)
    this.refDOM.removeEventListener('click', this.handleRefClick)
    this.$off('updatePopper', this.updatePopper)
    this.popper.destroy()
    this.refDOM = null
  }
}
</script>