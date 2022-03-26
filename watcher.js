export default class Watcher {

  constructor() {
    this.watchers = []
  }

  addWatcher(vm, watcher, key) {
    this.watchers.push({
      key,
      fn: watcher[key].bind(vm)
    })
  }

  invoke(key, newValue, oldValue) {
    this.watchers.map(item => {
      if (item.key === key) {
        item.fn(newValue, oldValue)
      }
    })
  }

  _addWatchProp(watchProp) {
    this.watchers.push(watchProp)
  }

} 