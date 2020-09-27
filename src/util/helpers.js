export function getOffset(e) {
  for (let offsetX = 0, offsetY = 0, el = e;
      el != null;
      offsetX += el.offsetLeft, offsetY += el.offsetTop, el = el.offsetParent)
  return { x: offsetX, y: offsetY }
}

// 当使用mousemove来实现拖拽组件可以使用这个函数来提升性能
export function frameDebounce(fn) {
  let timer = null

  return function () {
    const context = this,
          args = arguments
    window.cancelAnimationFrame(timer)
    timer = window.requestAnimationFrame(() => fn.apply(context, args))
  }
}

export const debounce = (fn, delay) => {
  let timer = null
  return function () {
    const context = this,
          args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}