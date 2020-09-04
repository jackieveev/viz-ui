import Input from './components/input'
import InputNumber from './components/input-number'
import Button from './components/button'
import checkbox from './components/checkbox'

const components = [
  Input,
  InputNumber,
  Button,
  checkbox.Checkbox,
  checkbox.CheckboxGroup
]

const install = (Vue, opt) => {
  if (install.installed) return
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install