// 将虚拟DOM转换为真实DOM
export default function patch(root, change) {
  console.log(root)
  if (JSON.stringify(change) === '{}') return
  for (let cha in change) {
    change[cha].forEach(val => {
      switch(val.type) {
        case 'DomReplace':
          root.parentNode.appendChild(val.node)
          root.remove()
          return
        case 'changeProps':
          val.props.forEach(prop => {
            console.log(prop)
            root.props[prop.attr] = prop.value
          })
          break;
        default:
          break
      }
    })
  }
}