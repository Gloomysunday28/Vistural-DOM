export default class Element {
  constructor({tag, props, children, key, value}) {
    this.tag = tag
    this.props = props
    if (Array.isArray(children)) {
      this.children = children
    } else this.children = null
    if (key) this.key = key
    if (value) this.value = value
  }
  render() {
    const element = this.createDOMTree()
    document.body.appendChild(element)
    return element
  }
  createDOMTree(tag = this.tag, props = this.props, children = this.children, key = this.key, value = this.value) {
    const el = document.createElement(tag)
    for (let attr in props) {
      el.setAttribute(attr, props[attr])
    }
    if (key) el.setAttribute('key', key)
    if (value) el.innerHTML = value
    if (children) {
      children.forEach(element => {
        let child
        console.log(element)
        if (element instanceof Element) { // 判断是否是节点
          child = this.createDOMTree(element.tag, element.props, element.children, element.key, element.value)
        } else {
          child = document.createTextNode(element)
        }
        el.appendChild(child)
      })
    }
    return el
  }
}