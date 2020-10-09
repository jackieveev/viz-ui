<template>
  <dropdown :class="[
              baseClass,
              {
                [`${baseClass}--focus`]: focus,
                [`${baseClass}--clearable`]: isClearable,
                [`${baseClass}--disabled`]: disabled
              }
            ]"
            trigger="custom"
            ref="dropdown"
            :dropdown-class="`${baseClass}__dropdown`"
            @on-menu-click="handleMenuClick"
            @on-visible-change="handleVisibleChange">
    <div>
      <viz-input :placeholder="placeholder"
                :value="label"
                readonly
                @focus="handleFocus"
                :disabled="disabled">
      </viz-input>
      <i :class="[
          'viz-icon',
          'arrowdown',
          `${baseClass}__icon`,
        ]"
        @click="handleIconClick">
      </i>
    </div>
    <dropdown-menu slot="menu" ref="menu">
      <slot></slot>
    </dropdown-menu>
  </dropdown>
</template>

<script>
import VizInput from '../input'
import Drop from '../dropdown'

const name = 'viz-select'

export default {
  name,
  props: {
    value: {},
    placeholder: {
      type: [String, Number],
      default: '请选择'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VizInput,
    Dropdown: Drop.Dropdown,
    DropdownMenu: Drop.DropdownMenu
  },
  provide() {
    return {
      select_context: this
    }
  },
  data() {
    return {
      baseClass: name,
      label: null,
      focus: false
    }
  },
  computed: {
    isClearable() {
      return this.clearable && !this.disabled && this.value !== undefined
    }
  },
  watch: {
    value(nv) {
      if (nv !== this.value) {
        this.select(nv)
      }
    }
  },
  methods: {
    select(value) {
      const target = this.$refs.menu.$slots.default.find((e) =>
        e.componentInstance && e.componentInstance.value === value)
      if (target) {
        const { value, label } = target.componentInstance
        this.handleMenuClick({ value, label })
      }
    },
    handleMenuClick({ value, label }) {
      this.label = label
      if (this.value !== value) {
        this.$emit('input', value)
        this.$emit('on-change', value)
      }
    },
    handleFocus() {
      this.$refs.dropdown.toggle(true)
    },
    handleVisibleChange(visible) {
      this.focus = visible
    },
    handleIconClick() {
      if (this.disabled) {
        return
      }
      if (this.isClearable) {
        this.handleMenuClick({ name: undefined, label: '' })
      } else {
        this.handleFocus()
      }
    }
  },
  mounted() {
    this.select(this.value)
  }
}
</script>