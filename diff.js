export function compareDiff(newDOM, oldDOM) {
  let patch = {} // 记录对比后的差别
  diffVirtualDOM(newDOM, oldDOM, 0, patch)
  return patch
}

function diffVirtualDOM(newDOM, oldDOM, index, patch) {
  let compareCollection = []
  if (newDOM.key === oldDOM.key && newDOM.tag === oldDOM.tag) {
    const props = diffVirtualProps(newDOM, oldDOM)
    if (props.length) compareCollection.push({type: 'changeProps', props})
  } else {
    compareCollection.push({
      type: 'DomReplace',
      node: newDOM.render()
    })
  }
  
  if (patch[index]) patch[index].concat(compareCollection)
  else patch[index] = compareCollection
}

function diffVirtualProps(newDOM, oldDOM) {
  const propsColl = []
  for (let attr in newDOM.props) {
    if (oldDOM.props.hasOwnProperty(attr)) {
      if (newDOM.props[attr] !== oldDOM.props[attr]) {
        propsColl.push({attr, value:newDOM.props[attr]})
      }
    } else {
      propsColl.push({attr, value: newDOM.props[attr]})
    }
  }
  return propsColl
}

function getKeys(list) {
  const keys = []
  list.forEach(val => {
    keys.push(val.key ? val.key : val)
  })
  return keys
}

function listDiff(newList, oldList) {
  const change = [], list = [] // 用来区别子级位置是否改变
  oldList = getKeys(oldList)
  newList = getKeys(newList)

  if (oldList) {
    oldList.forEach(val => {
      if (newList.includes[val]) list.push(key)
      else list.push(null)
    })
  }
  list = list.filter(Boolean)
  if (newList) {
    newList.forEach((val, i) => {
      if (!oldList.includes[val]) {
        change.push({
          type: 'childrenInsert',
          value: val
        })
      } else {
        const index = list.findIndex(li => li === val)
        if (~index && i !== index) {
          change.push({
            type: 'childMove',
            from: index,
            to: i
          })
        }
      }
    })
  }
  return {change, list}
}

function diffChildren(newChildren, oldChildren, index, patch) {
  
}