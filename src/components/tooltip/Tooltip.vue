<script>
const name = 'viz-tooltip'

export default {
  name,
  functional: true,
  props: {
    placement: {
      type: String,
      validator(e) {
        return ['top', 'bottom'].indexOf(e) !== -1
      }
    }
  },
  render(createElement, context) {
    console.log('##', context)
    return '123'
  }
}
</script>