<template>
  <div>
    <viz-input type="text"
              prefix-icon="arrowup"
              prefix="$"
              :disabled="test12"
              style="width: 300px;">
    </viz-input><br/><br/>
    <viz-switch v-model="test12"></viz-switch> {{ test12 ? 'disabled' : 'enabled' }}
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
                      :max="100000"
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
    <viz-tooltip content="stupid 😂" placement="right-start" v-model="test8" dis-hover>
      tooltip
    </viz-tooltip>
    <br/><br/>
    <viz-tooltip content="stupid 😂2222saldfalsdfjlasflasdfj" placement="bottom">
      tooltip2
    </viz-tooltip>
    <br/><br/><br/>
    <viz-dropdown trigger="click" @on-menu-click="handleEnter">
      <viz-button>下拉菜单 <i class="viz-icon arrowdown"></i></viz-button>
      <viz-dropdown-menu slot="menu">
        <viz-dropdown-item v-for="i in 15"
                          :key="i"
                          :name="i">
          选项{{ i }}
        </viz-dropdown-item>
      </viz-dropdown-menu>
    </viz-dropdown>
    <!-- <viz-button @click="handleChange">
      切换
    </viz-button> -->
    <br/><br/>
    <viz-select v-model="test9" clearable>
      <viz-option value="1" label="蒸羊羔"></viz-option>
      <viz-option value="2" label="蒸熊掌"></viz-option>
      <viz-option value="3" label="当红辣子鸡"></viz-option>
      <viz-option value="4" label="清蒸石斑鱼"></viz-option>
      <viz-option value="5" label="波士顿龙虾"></viz-option>
      <viz-option value="6" label="白饭"></viz-option>
      <viz-option value="7" label="阿娇"></viz-option>
      <viz-option value="8" label="外婆桥"></viz-option>
      <viz-option value="9" label="这些年来"></viz-option>
      <viz-option value="10" label="芜湖"></viz-option>
      <viz-option value="12" label="春夏秋冬"></viz-option>
    </viz-select>
    <viz-select v-model="test9" clearable style="width: 120px">
      <viz-option value="1" label="蒸羊羔"></viz-option>
      <viz-option value="2" label="蒸熊掌"></viz-option>
      <viz-option value="3" label="当红辣子鸡"></viz-option>
      <viz-option value="4" label="清蒸石斑鱼"></viz-option>
      <viz-option value="5" label="波士顿龙虾"></viz-option>
      <viz-option value="6" label="白饭"></viz-option>
      <viz-option value="7" label="阿娇"></viz-option>
      <viz-option value="8" label="外婆桥"></viz-option>
      <viz-option value="9" label="这些年来"></viz-option>
      <viz-option value="10" label="芜湖"></viz-option>
      <viz-option value="12" label="春夏秋冬"></viz-option>
    </viz-select>
    <br/><br/><br/>
    <viz-slider style="width: 300px;" v-model="test10"></viz-slider>
    <br/><br/><br/>
    <viz-slider style="width: 300px;" v-model="test10" show-input></viz-slider>
    <br/><br/>
    <viz-switch v-model="test11"></viz-switch> <viz-switch v-model="test11" disabled></viz-switch>
    <br/><br/>
    <viz-color-picker style="margin-left: 100px;"></viz-color-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test4: {},
      test: 'it\'s gone, it\'s all over baby.',
      test1: '12345',
      test5: [1, 3],
      test6: '123',
      test7: '奇洛李维斯回信',
      test8: true,
      test9: '9',
      test10: 30,
      test11: true,
      test12: true
    }
  },
  methods: {
    handleChange() {
      this.$refs.dropdown.toggle(true)
    },
    handleEnter(v) {
      console.log('change to2: ', v)
    }
  },
  mounted() {
    setTimeout(() => {
      this.test10 = 99
    }, 3000)
  }
}
</script>