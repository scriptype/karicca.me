export function toDOM(html) {
  const el = document.createElement('div')
  el.innerHTML = html
  return el.firstElementChild
}
