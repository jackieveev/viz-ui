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
              maxlength="10"
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
    <br/><br/>
    <viz-radio v-model="test6" label="123" disabled>
      456
    </viz-radio>
    <br/><br/>
    <viz-radio-group v-model="test7">
      <viz-radio label="八百壮士">八百壮士</viz-radio>
      <viz-radio label="花木兰">花木兰</viz-radio>
      <viz-radio label="奇洛李维斯回信" disabled>奇洛李维斯回信</viz-radio>
    </viz-radio-group>
    <br/><br/>
    <viz-tooltip content="stupid 😂" placement="right-start" v-model="test8">
      tooltip
    </viz-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test4: {},
      test: 'it\'s gone, it\'s all over baby.',
      test1: 12345,
      test5: [1, 3],
      test6: '123',
      test7: '奇洛李维斯回信',
      test8: false
    }
  },
  methods: {
    handleChange() {
      console.log(this.test)
    },
    handleEnter(v) {
      console.log('change to: ', v)
    }
  },
  mounted() {
    setTimeout(() => {
    }, 3000)
  }
}
</script>