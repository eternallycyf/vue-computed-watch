import { reactive } from "./reactive.js"
import Computed from './computed.js'
import Watcher from './watcher.js'

class Vue {
  constructor(options) {
    const { data, computed, watch } = options;
    this.$data = data()

    this.init(this, computed, watch)
  }

  init(vm, computed, watch) {
    this.initData(vm)
    const computedIns = this.initComputed(vm, computed)
    const watchIns = this.initWatcher(vm, watch)

    this.$computed = computedIns.update.bind(computedIns)
    this.$watch = watchIns.invoke.bind(watchIns)
  }

  initData(vm) {
    reactive(vm, (key, value) => {
      // console.log(key, value);
    }, (key, newValue, oldValue) => {
      if (newValue == oldValue) return
      // console.log(key, newValue, oldValue);
      this.$computed(key, this.$watch)
      this.$watch(key, newValue, oldValue)
    })
  }

  initComputed(vm, computed) {
    const computedIns = new Computed()
    for (let key in computed) {
      computedIns.addComputed(vm, computed, key)
    }
    return computedIns
  }

  initWatcher(vm, watch) {
    const watchIns = new Watcher()

    for (let key in watch) {
      watchIns.addWatcher(vm, watch, key)
    }
    return watchIns
  }

}

export default Vue;