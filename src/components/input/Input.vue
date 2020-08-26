<template>
  <div :class="[
          baseClass,
          {
            [`${baseClass}--disabled`]: disabled
          }
        ]">
    <input :class="[
              `${baseClass}__input`,
              {
                'with-prefix-icon': prefixIcon
              }
            ]"
            :type="type"
            v-bind="$attrs" />
    <i v-if="prefix" :class="[`${baseClass}__icon`]">{{ prefix }}</i>
    <i v-if="prefixIcon" :class="['viz-icon', prefixIcon, `${baseClass}__icon`, ]"></i>
  </div>
</template>

<script>
export default {
  name: 'viz-input',
  props: {
    type: {
      type: String,
      default: 'text',
      validator(e) {
        return ['text', 'textarea'].indexOf(e) != -1
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
    }
  },
  computed: {
    baseClass () {
      return `viz-${this.type === 'text' ? 'input' : 'textarea'}`
    },

  }
}
</script>