<template>
  <div :class="[
          baseClass,
          {
            [`${baseClass}--disabled`]: disabled
          }
        ]">
    <span v-if="prefix" :class="[iconClass, 'fixed-text']" :data-text="prefix"></span>
    <i v-else-if="prefixIcon" :class="['viz-icon', prefixIcon, iconClass]"></i>
    <span v-if="suffix" :class="[iconClass, 'fixed-text', `${iconClass}--suffix`]" :data-text="suffix"></span>
    <i v-else-if="suffixIcon" :class="['viz-icon', suffixIcon, iconClass, `${iconClass}--suffix`]"></i>
    <input :class="[
              `${baseClass}__input`,
              {
                'with-prefix-icon': prefixIcon || prefix,
                'with-suffix-icon': suffixIcon || suffix
              }
            ]"
            :value="value"
            :type="type"
            :disabled="disabled"
            v-bind="$attrs"
            v-on="{
              ...$listeners,
              input: handleInput
            }" />
    
  </div>
</template>

<script>
const name = 'viz-input'

export default {
  name,
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text',
      validator(e) {
        return ['text', 'password'].indexOf(e) !== -1
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String
    },
    prefixIcon: {
      type: String
    },
    suffix: {
      type: String
    },
    suffixIcon: {
      type: String
    }
  },
  data() {
    return {
      baseClass: name
    }
  },
  computed: {
    iconClass() {
      return `${this.baseClass}__icon`
    }
  },
  methods: {
    handleInput({ target: { value } }) {
      this.$emit('input', value)
      this.$emit('on-change', value)
    }
  }
}
</script>