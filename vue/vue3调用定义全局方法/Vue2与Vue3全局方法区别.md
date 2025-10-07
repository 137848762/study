# Vue2 与 Vue3 在全局方法上的主要区别

## 一、全局API的组织方式

### Vue2
Vue2 使用的是全局 API 模式，所有的全局方法都直接挂载在 `Vue` 对象上。

```javascript
// Vue2 中的全局方法使用方式
import Vue from 'vue'

// 全局注册组件
Vue.component('MyComponent', MyComponent)

// 全局注册指令
Vue.directive('focus', {})

// 全局混入
Vue.mixin({})

// 全局使用插件
Vue.use(Plugin)

// 全局配置
Vue.config.productionTip = false
```

### Vue3
Vue3 采用了全新的组合式 API（Composition API），将全局方法组织到不同的模块中导出，不再直接挂载在一个全局对象上。

```javascript
// Vue3 中的全局方法使用方式
import { createApp } from 'vue'

const app = createApp(App)

// 应用实例上注册组件
app.component('MyComponent', MyComponent)

// 应用实例上注册指令
app.directive('focus', {})

// 应用实例上使用插件
app.use(Plugin)

// 应用实例上配置
app.config.errorHandler = (err) => {}
```

## 二、主要全局方法的区别

| 功能 | Vue2 | Vue3 |
|------|------|------|
| 创建应用实例 | `new Vue(options)` | `createApp(options)` |
| 全局注册组件 | `Vue.component(name, component)` | `app.component(name, component)` |
| 全局注册指令 | `Vue.directive(name, directive)` | `app.directive(name, directive)` |
| 使用插件 | `Vue.use(plugin)` | `app.use(plugin)` |
| 全局混入 | `Vue.mixin(mixin)` | 不推荐使用全局混入，鼓励使用组合式函数 |
| 设置全局配置 | `Vue.config.xxx = yyy` | `app.config.xxx = yyy` |
| 全局属性 | `Vue.prototype.$xxx = yyy` | `app.config.globalProperties.$xxx = yyy` |

## 三、全局属性的注册方式

### Vue2
在 Vue2 中，我们通常通过原型链来添加全局属性：

```javascript
Vue.prototype.$http = axios
Vue.prototype.$utils = utils
```

然后在组件中可以这样使用：

```javascript
export default {
  mounted() {
    this.$http.get('/api/data')
    this.$utils.formatDate(new Date())
  }
}
```

### Vue3
在 Vue3 中，我们通过应用实例的 `globalProperties` 来添加全局属性：

```javascript
const app = createApp(App)
app.config.globalProperties.$http = axios
app.config.globalProperties.$utils = utils
app.mount('#app')
```

在选项式 API 中使用方式保持不变：

```javascript
export default {
  mounted() {
    this.$http.get('/api/data')
    this.$utils.formatDate(new Date())
  }
}
```

但在组合式 API 中，需要使用 `getCurrentInstance` 来访问：

```javascript
import { getCurrentInstance } from 'vue'

export default {
  setup() {
    const { proxy } = getCurrentInstance()
    proxy.$http.get('/api/data')
    proxy.$utils.formatDate(new Date())
  }
}
```

## 四、插件的编写方式

### Vue2
Vue2 的插件需要暴露一个 `install` 方法，接收 Vue 构造函数作为参数：

```javascript
const MyPlugin = {
  install(Vue, options) {
    // 添加全局方法
    Vue.myGlobalMethod = () => {}
    
    // 添加全局指令
    Vue.directive('my-directive', {})
    
    // 添加实例方法
    Vue.prototype.$myMethod = function() {}
  }
}

Vue.use(MyPlugin, { someOption: true })
```

### Vue3
Vue3 的插件同样需要暴露一个 `install` 方法，但接收的是应用实例和选项：

```javascript
const MyPlugin = {
  install(app, options) {
    // 添加全局方法
    app.config.globalProperties.$myMethod = () => {}
    
    // 添加全局指令
    app.directive('my-directive', {})
    
    // 提供全局属性（可供组合式 API 使用）
    app.provide('myGlobalProperty', 'value')
  }
}

const app = createApp(App)
app.use(MyPlugin, { someOption: true })
app.mount('#app')
```

## 五、全局混入的使用

### Vue2
在 Vue2 中，全局混入可以影响所有组件：

```javascript
Vue.mixin({
  created() {
    // 所有组件的 created 钩子都会执行这里的代码
  }
})
```

### Vue3
Vue3 仍然支持全局混入，但官方不推荐使用，因为它会影响所有组件，可能导致命名冲突和难以追踪的问题。

```javascript
const app = createApp(App)
app.mixin({
  created() {
    // 所有组件的 created 钩子都会执行这里的代码
  }
})
```

Vue3 鼓励使用组合式函数（Composition Functions）来复用逻辑，而不是使用混入。

## 六、全局配置项

### Vue2
Vue2 的全局配置直接设置在 Vue.config 对象上：

```javascript
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.errorHandler = function(err, vm, info) {}
```

### Vue3
Vue3 的全局配置设置在应用实例的 config 对象上：

```javascript
const app = createApp(App)
app.config.productionTip = false
app.config.devtools = true
app.config.errorHandler = function(err, vm, info) {}
```

## 七、总结

1. **组织方式**：Vue2 采用全局 API，Vue3 采用模块化导出 + 应用实例 API
2. **实例化**：Vue2 使用 `new Vue()`，Vue3 使用 `createApp()`
3. **全局属性**：Vue2 使用 `Vue.prototype`，Vue3 使用 `app.config.globalProperties`
4. **插件机制**：Vue3 的插件接收应用实例而非 Vue 构造函数
5. **混入**：Vue3 不推荐使用全局混入，鼓励使用组合式函数
6. **配置项**：Vue3 的配置项移至应用实例

Vue3 的这些变化使代码更加模块化，避免了全局命名空间污染，并提供了更好的 TypeScript 支持。