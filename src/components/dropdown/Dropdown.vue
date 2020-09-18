<script>
import Vue from 'vue'
import { createPopper } from '@popperjs/core'
// import { directive } from 'v-click-outside'

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
    }
  },
  // directives: {
  //   'click-outside': directive
  // },
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
    updatePopper() {
      this.popper.update()
    },
    toggle(value) {
      this.vnode.show = value
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
        this.vnode.$el.addEventListener('mouseenter', this.handleMouseEnter)
        this.vnode.$el.addEventListener('mouseleave', this.handleMouseLeave)
      } else if (this.trigger === 'click') {
        // this.handleRefClick = () => this.toggle(true)
        // this.refDOM.addEventListener('click', this.handleRefClick)
        
      }
    }
  },
  mounted() {
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    // 放到body中避免各种overflow问题
    const that = this
    this.vnode = new Vue({
      data: { show: false },
      render(h) {
        return h(
          'div',
          {
            class: `${menuClass}-wrapper`,
            directives: [{ name: 'show', value: this.show }]
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
        handleMenuClick(ev) {
          const item = that.$slots.menu.find((e) => e.elm.contains(ev.target))
          if (item && item.tag) {
            this.$emit('on-click', item.componentInstance.name)
            this.show = false
          }
        }
      }
    }).$mount(dom)
    this.popper = createPopper(this.$el, this.vnode.$el, {
      placement: this.placement
    })
    this.$once('updatePopper', this.updatePopper)
    this.addBindings()
  },
  beforeDestroy() {

  }
}
</script>