<template>
  <div>
    <viz-input type="text"
              prefix-icon="arrowup"
              prefix="$"
              suffix-icon="arrowdown"
              disabled
              style="width: 300px;">
    </viz-input>
    <br/><br/>
    <viz-input prefix-icon="arrowup"
              prefix="$"
              v-model="test"
              suffix-icon="arrowdown"
              suffix=".00"
              style="width: 300px">
    </viz-input>
    <br/><br/>
    <viz-input-number prefix="￥"
                      v-model="test1">
    </viz-input-number>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 'it\'s gone, it\'s all over baby.',
      test1: 12345
    }
  },
  methods: {
    handleChange() {
      console.log(this.test)
    },
    handleEnter(ev) {
      console.log('keypress: ', ev)
    }
  }
}
</script>