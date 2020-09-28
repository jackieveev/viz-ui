import Input from './components/input'
import InputNumber from './components/input-number'
import Button from './components/button'
import checkbox from './components/checkbox'
import radio from './components/radio'
import Tooltip from './components/tooltip'
import select from './components/select'
import dropdown from './components/dropdown'
import Slider from './components/slider'
import Switch from './components/switch'

const components = [
  Input,
  InputNumber,
  Button,
  checkbox.Checkbox,
  checkbox.CheckboxGroup,
  radio.Radio,
  radio.RadioGroup,
  Tooltip,
  select.Select,
  select.Option,
  dropdown.Dropdown,
  dropdown.DropdownItem,
  Slider,
  Switch
]

const install = (Vue, opt) => {
  if (install.installed) return
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install