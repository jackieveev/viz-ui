<template>
  <div :class="[
          baseClass,
          {
            [`${baseClass}--focus`]: focus
          }
        ]">
    <viz-input v-model="inputValue"
              ref="input"
              @focus="handleFocus"
              @blur="handleBlur"
              placeholder="请选择">
    </viz-input>
    <i :class="[
          'viz-icon',
          'arrowdown',
          `${baseClass}__icon`,
        ]">
    </i>
    <div :class="[`${dropdownClass}-wrapper`]"
          v-show="showDropdown"
          ref="dropdown">
      <transition name="fade-y">
        <div :class="[dropdownClass]"
            v-show="showDropdown">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { createPopper } from '@popperjs/core'
import VizInput from '../input'

const name = 'viz-select'

export default {
  name,
  components: {
    VizInput
  },
  data() {
    return {
      baseClass: name,
      inputValue: '',
      focus: false,
      popper: null,
      updated: false,
      dropdownClass: `${name}__dropdown`
    }
  },
  computed: {
    showDropdown() {
      return this.focus
    }
  },
  methods: {
    handleFocus() {
      this.toggle(true)
    },
    handleBlur() {
      this.toggle(false)
    },
    toggle(value) {
      this.focus = value
      // update popper一次
      if (!this.updated && value) {
        this.popper.update()
        this.updated = true
      }
    }
  },
  mounted() {
    this.popper = createPopper(this.$refs.input.$el, this.$refs.dropdown, {
      placement: 'bottom-start',
      modifiers: {
        name: 'offset',
        options: { offset: [0, 5] }
      }
    })
  }
}
</script>