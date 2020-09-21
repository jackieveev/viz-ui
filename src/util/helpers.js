export function getOffset(e) {
  for (let offsetX = 0, offsetY = 0, el = e;
      el != null;
      offsetX += el.offsetLeft, offsetY += el.offsetTop, el = el.offsetParent)
  return { x: offsetX, y: offsetY }
}