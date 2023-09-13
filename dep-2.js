import { dep1 } from './dep-1.js'

export function dep2() {
  console.log('dep2')
  dep1()
}

