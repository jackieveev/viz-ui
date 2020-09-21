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
            @on-menu-select="handleMenuSelect"
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
    <slot slot="menu"></slot>
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
      this.$refs.dropdown.select(this.value)
    }
  },
  methods: {
    handleMenuSelect({ name, label }) {
      this.label = label
      if (this.value !== name) {
        this.$emit('input', name)
        this.$emit('on-change', name)
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
        this.handleMenuSelect({ name: undefined, label: '' })
      } else {
        this.handleFocus()
      }
    }
  },
  mounted() {
    this.$refs.dropdown.select(this.value)
  }
}
</script>