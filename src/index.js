import Input from './components/input'


const install = (Vue, opt) => {
  if (install.installed) return
  Vue.component('viz-input', Input)
}

export default install