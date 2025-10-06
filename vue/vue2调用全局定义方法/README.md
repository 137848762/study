# Vue 2 定义全局方法详解

本项目展示了在 Vue 2 中定义和使用全局方法的多种方式，帮助开发者在实际项目中根据需求选择最合适的实现方法。

## 项目结构

```
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── App.vue             # 主组件，展示全局方法的使用
│   ├── main.js             # 入口文件，定义全局方法
│   ├── components/
│   │   └── HelloWorld.vue  # 示例组件
│   └── assets/
│       └── logo.png
├── package.json
└── README.md               # 项目说明文档
```

## 在 Vue 2 中定义全局方法的三种方式

### 1. 通过 Vue.prototype 定义（项目中使用的方式）

这是 Vue 2 中最常用的定义全局方法的方式。

**实现方式：**

在 `main.js` 中通过 `Vue.prototype.$方法名` 的形式定义全局方法：

```javascript
// src/main.js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 定义全局方法
Vue.prototype.$myGlobalMethod = function(){
  console.log("这是一个全局方法")
}

new Vue({
  render: h => h(App),
}).$mount('#app')
```

**使用方式：**

在组件中通过 `this.$方法名` 调用全局方法：

```javascript
// src/App.vue
methods: {
  useGlobalMethod(){
    this.$myGlobalMethod();
  }
}
```

### 2. 通过 Vue.mixin() 定义全局混入

通过混入可以向所有组件注入方法、计算属性等。

**实现方式：**

```javascript
// 在 main.js 中添加
Vue.mixin({
  methods: {
    $anotherGlobalMethod() {
      console.log("这是通过混入定义的全局方法");
    }
  }
})
```

**使用方式：**

与通过 prototype 定义的方法一样，在组件中通过 `this.$方法名` 调用：

```javascript
this.$anotherGlobalMethod();
```

### 3. 通过插件方式定义

对于更复杂的功能集合，可以封装成插件。

**实现方式：**

创建插件文件 `src/plugins/globalMethods.js`：

```javascript
// src/plugins/globalMethods.js
export default {
  install(Vue) {
    // 添加实例方法
    Vue.prototype.$pluginMethod = function() {
      console.log("这是通过插件定义的全局方法");
    }
    
    // 添加静态方法
    Vue.globalMethod = function() {
      console.log("这是Vue的静态全局方法");
    }
  }
}
```

在 `main.js` 中引入并使用插件：

```javascript
// src/main.js
import Vue from 'vue'
import App from './App.vue'
import globalMethods from './plugins/globalMethods.js'

Vue.use(globalMethods)
```

**使用方式：**

```javascript
// 实例方法
this.$pluginMethod();

// 静态方法
import Vue from 'vue'
Vue.globalMethod();
```

## 各种方式的优缺点比较

| 方式 | 优点 | 缺点 |
|------|------|------|
| Vue.prototype | 简单直观，易于使用 | 不支持TypeScript类型提示，难以跟踪方法调用 |
| Vue.mixin() | 可以注入更多类型的属性（data、computed等） | 可能导致命名冲突，影响所有组件 |
| 插件方式 | 结构清晰，可扩展性强，可以添加静态方法 | 实现相对复杂，对于简单需求可能过度设计 |

## 项目设置

```
npm install
```

### 开发模式运行

```
npm run serve
```

### 构建生产版本

```
npm run build
```

### 代码检查

```
npm run lint
```

## 实际应用场景

全局方法适用于以下场景：

1. 工具函数（如日期格式化、字符串处理等）
2. API 调用封装
3. 消息提示、加载动画等通用功能
4. 权限验证、日志记录等横切关注点

## 注意事项

1. 全局方法命名建议使用 `$` 前缀，避免与组件内部方法冲突
2. 不要滥用全局方法，对于只在特定组件使用的功能，应该定义为组件方法
3. 考虑使用 Vuex 或 Composition API 来管理共享状态和逻辑，而不是过度依赖全局方法
4. 在大型项目中，建议为全局方法编写文档，方便团队成员使用
