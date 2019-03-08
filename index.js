import Element from './Element'
import patch from './patch'
import { compareDiff } from './diff'

const child1 = new Element({
  tag: 'span',
  props: {'class': 'child1'},
  key: 'child1',
  value: 1
})

let child2 = 2

const root1 = new Element({
  tag: 'div',
  props: {'class': 'root'},
  children: [child1],
  key: 'root1'
})

const root = root1.render()


const root2 = new Element({
  tag: 'div',
  props: {'class': 'root'},
  children: [child1, child2],
  key: 'root1'
})

const change = compareDiff(root2, root1)

patch(root, change)

