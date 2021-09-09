<script>
import Vue from 'vue'
import { createPopper } from '@popperjs/core'

const name = 'viz-tooltip'

export default {
  name,
  props: {
    content: {},
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
    value: {},
    // 默认hover控制显示
    disHover: {
      type: Boolean,
      default: false
    },
    // popper offset from ref
    offset: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      popper: null,
      vnode: null
    }
  },
  watch: {
    content(nv) {
      this.vnode.content = nv
    },
    value(nv) {
      if (nv !== this.vnode.show) {
        this.vnode.show = nv
      }
    }
  },
  methods: {
    toggle(value) {
      if (this.vnode.show !== value) {
        this.vnode.show = value
        this.$emit('input', value)
        this.$emit('on-change', value)
        // 由于dom的display为none，popper的位置
        // 可能有误，所以在显示后要update一次
        if (value) {
          this.popper.update()
        }
      }
    }
  },
  render(h) {
    if (!Array.isArray(this.$slots.default)) return null
    const vn = this.$slots.default[0]
    if (vn.tag) {
      return vn
    }
    // comment node
    return h('span', vn.text)
  },
  updated() {
    this.popper.update()
  },
  mounted() {
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    // 放到body中避免各种overflow问题
    this.vnode = new Vue({
      data: {
        show: false,
        content: this.content
      },
      template: `<transition name="fade">
        <div class="${name}" v-show="show">
          {{ content }}
        </div>
      </transition>`
    }).$mount(dom)
    document.body.appendChild(this.vnode.$el)
    this.popper = createPopper(this.$el, this.vnode.$el, {
      placement: this.placement,
      modifiers: {
        name: 'offset',
        options: { offset: [0, this.offset] }
      }
    })
    if (this.disHover) {
      this.vnode.show = this.value
      return
    }
    const handleMouseEnter = () => this.toggle(true),
          handleMouseLeave = () => this.toggle(false)
    this.$el.addEventListener('mouseenter', handleMouseEnter)
    this.$el.addEventListener('mouseleave', handleMouseLeave)
    this.vnode.$el.addEventListener('mouseenter', handleMouseEnter)
    this.vnode.$el.addEventListener('mouseleave', handleMouseLeave)

    this.$once('hook:beforeDestory', () => {
      this.$el.removeEventListener('mouseenter', handleMouseEnter)
      this.$el.removeEventListener('mouseleave', handleMouseLeave)
      this.vnode.$el.removeEventListener('mouseenter', handleMouseEnter)
      this.vnode.$el.removeEventListener('mouseleave', handleMouseLeave)
      this.popper.destroy()
      this.vnode.$destroy()
    })
  }
}
</script>