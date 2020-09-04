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
    <viz-input-number style="width: 300px"
                      prefix="￥"
                      v-model="test1"
                      :step="10"
                      :min="0"
                      placeholder="请输入"
                      :precise="3">
    </viz-input-number>
    <br/><br/>
    <viz-button>
      确定
    </viz-button>
    <br/><br/>
    <viz-checkbox v-model="test4">
      123
    </viz-checkbox>
    <br/><br/>
    <viz-checkbox-group v-model="test5" >
      <viz-checkbox :label="1" disabled>苹果</viz-checkbox>
      <viz-checkbox :label="2">香蕉</viz-checkbox>
      <viz-checkbox :label="3">西瓜</viz-checkbox>
    </viz-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test4: {},
      test: 'it\'s gone, it\'s all over baby.',
      test1: 12345,
      test5: [1, 3]
    }
  },
  methods: {
    handleChange() {
      console.log(this.test)
    },
    handleEnter(ev) {
      console.log('keypress: ', ev)
    }
  },
  mounted() {
    setTimeout(() => {
      this.test1 += 1.23213123213
    }, 3000)
  }
}
</script>