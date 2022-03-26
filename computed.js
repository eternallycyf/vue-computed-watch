class Computed {
  constructor() {
    this.computedData = [];
  }

  addComputed(vm, computed, key) {
    const descriptor = Object.getOwnPropertyDescriptor(computed, key)
    const descriptorFn = descriptor.value.get ? descriptor.value.get : descriptor.value
    const value = descriptorFn.call(vm)
    const get = descriptorFn.bind(vm)
    const dep = this._colletDep(descriptorFn)

    this._addComputedProp({
      key,
      value,
      get,
      dep
    })

    const dataItem = this.computedData.find(item => item.key === key)

    Object.defineProperty(vm, key, {
      get() {
        return dataItem.value;
      },
      set(newValue) {
        dataItem.value = dataItem.get()
      }
    })
  }

  update(key, watch) {
    this.computedData.map(item => {
      const dep = item.dep;
      const _key = dep.find(el => el == key);

      if (_key) {
        const oldValue = item.value
        item.value = item.get();
        watch(item.key, item.value, oldValue)
      }

    })
  }

  _addComputedProp(computedProp) {
    this.computedData.push(computedProp)
  }

  _colletDep(fn) {
    const matched = fn.toString().match(/this\.(.+?)/g)
    return matched.map(item => item.split('.')[1])
  }
}

export default Computed