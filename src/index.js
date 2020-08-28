import Input from './components/input'
import InputNumber from './components/input-number'

const components = [
  Input,
  InputNumber
]

const install = (Vue, opt) => {
  if (install.installed) return
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install