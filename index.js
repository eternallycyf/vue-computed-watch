import Vue from './vue.js'

const vm = new Vue({
  data() {
    return {
      a: 1,
      b: 2
    }
  },
  computed: {
    total() {
      console.log('computed is loading');
      return this.a + this.b
    }
  },
  watch: {
    total(newValue, oldValue) {
      console.log('watch total：', newValue, oldValue);
    },
    a(newValue, oldValue) {
      console.log('watch a：', newValue, oldValue);
    },
    b(newValue, oldValue) {
      console.log('watch b：', newValue, oldValue);
    }
  }
})

console.log(vm);

// 第一次执行 后面computed缓存
console.log(vm.total);
console.log(vm.total);
console.log(vm.total);

vm.a = 100;
console.log(vm.total);
console.log(vm.total);
console.log(vm.total);

vm.b = 200;
console.log(vm.total);
console.log(vm.total);
console.log(vm.total);