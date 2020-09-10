import Input from './components/input'
import InputNumber from './components/input-number'
import Button from './components/button'
import checkbox from './components/checkbox'
import radio from './components/radio'
import Tooltip from './components/tooltip'
import select from './components/select'

const components = [
  Input,
  InputNumber,
  Button,
  checkbox.Checkbox,
  checkbox.CheckboxGroup,
  radio.Radio,
  radio.RadioGroup,
  Tooltip,
  select.Option,
  select.Select
]

const install = (Vue, opt) => {
  if (install.installed) return
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install