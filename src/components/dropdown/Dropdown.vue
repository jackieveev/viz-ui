<script>
import Vue from 'vue'
import { createPopper } from '@popperjs/core'
import { directive } from 'v-click-outside'

const baseClass = 'viz-dropdown', menuClass = `${baseClass}__menu`

export default {
  name: baseClass,
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
      type: [String, Array]
    }
  },
  data() {
    return {
      popper: null,
      vnode: null
    }
  },
  render() {
    if (!Array.isArray(this.$slots.default)) return null
    return this.$slots.default.find(e => e.tag)
  },
  methods: {
    toggle(value) {
      if (this.vnode.show !== value) {
        this.$emit('on-visible-change', value)
        this.vnode.show = value
        // 由于dom的display为none，popper的位置
        // 可能有误，所以在显示后要update一次
        if (value) {
          this.popper.update()
        }
      }
    },
    // 选中某一菜单
    select(name) {
      this.vnode.select(name)
    },
    addBindings() {
      if (this.trigger === 'hover') {
        this.handleMouseEnter = () => this.toggle(true)
        this.handleMouseLeave = () => this.toggle(false)
        this.$el.addEventListener('mouseenter', this.handleMouseEnter)
        this.$el.addEventListener('mouseleave', this.handleMouseLeave)
        this.vnode.$el.addEventListener('mouseenter', this.handleMouseEnter)
        this.vnode.$el.addEventListener('mouseleave', this.handleMouseLeave)
        this.removeListeners = () => {
          this.$el.removeEventListener('mouseenter', this.handleMouseEnter)
          this.$el.removeEventListener('mouseleave', this.handleMouseLeave)
          this.vnode.$el.removeEventListener('mouseenter', this.handleMouseEnter)
          this.vnode.$el.removeEventListener('mouseleave', this.handleMouseLeave)
        }
      } else if (this.trigger === 'click') {
        this.handleClick = () => this.toggle(!this.vnode.show)
        this.$el.addEventListener('click', this.handleClick)
        this.removeListeners = () => {
          this.$el.removeListeners('click', this.handleClick)
        }
      }
    }
  },
  mounted() {
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    // 放到body中避免各种overflow问题
    const that = this
    this.vnode = new Vue({
      data: { show: false, current: null },
      directives: { 'click-outside': directive },
      render(h) {
        return h(
          'div',
          {
            class: [`${menuClass}-wrapper`, that.dropdownClass],
            directives: [
              { name: 'show', value: this.show },
              { name: 'click-outside', value: this.handleClickOutside }
            ]
          },
          [h(
            'transition',
            { props: { name: 'fade-y' } },
            [h(
              'div',
              {
                class: menuClass,
                directives: [{ name: 'show', value: this.show }],
                on: {
                  click: this.handleMenuClick
                }
              },
              that.$slots.menu
            )]
          )]
        )
      },
      methods: {
        select(name) {
          this.current = name
          const target = that.$slots.menu.find((e) => e.componentInstance && e.componentInstance.name === name)
          if (target) {
            const { name, label } = target.componentInstance
            that.$emit('on-menu-select', { name, label })
          }
        },
        // IE11 contains方法兼容性不好
        // 判断root是不是target的祖先元素
        contains(root, target) {
          let item = target
          while (item && item !== root) {
            item = item.parentNode
          }
          return !!item
        },
        handleMenuClick(ev) {
          const item = that.$slots.menu.find((e) => this.contains(e.elm, ev.target))
          if (item && item.tag) {
            const { name, label } = item.componentInstance
            that.$emit('on-menu-click', name)
            that.$emit('on-menu-select', { name, label })
            that.toggle(false)
            this.current = name
          }
        },
        handleClickOutside(ev) {
          if (that.trigger === 'hover') {
            return
          }
          // 如果不是ref或ref的子元素触发的则为outside click
          if (ev.target !== that.$el && !this.contains(that.$el, ev.target)) {
            // 关闭
            that.toggle(false)
          }
        }
      }
    }).$mount(dom)
    this.popper = createPopper(this.$el, this.vnode.$el, {
      placement: this.placement
    })
    this.addBindings()
  },
  beforeDestroy() {
    if (this.removeListeners) {
      this.removeListeners()
    }
    this.popper.destroy()
    this.vnode.$destroy()
    this.popper = null
    this.vnode = null
  }
}
</script>