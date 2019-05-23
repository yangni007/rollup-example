#### rollup与webpack的区别：
- webpack主要是代码拆分，按需加载
- rollup将所有的资源打包到一个文件.能够直接被其他js库引用模块.
- webpack比较适合打包应用，rollup适合打包js库或者框架
- 如果你需要代码拆分(Code Splitting)，或者你有很多静态资源需要处理，再或者你构建的项目需要引入很多CommonJS模块的依赖，那么 webpack 是个很不错的选择
- 如果您的代码库是基于 ES2015 模块的，而且希望你写的代码能够被其他人直接使用，你需要的打包工具可能是 Rollup
- 使用哪个没有绝对的限制。

#### 使用
##### 1. 使用 npm install --global rollup 进行安装
##### 2. 创建src文件夹，并且创建一个main.js， foo.js文件
```
// src/rollup/main.js
import foo from './foo.js';
export default function () {
  console.log(foo);
}
```

```
// src/rollup/foo.js
export default 'hello world!';
```
命令行执行命令

```
rollup src/rollup/main.js -f cjs
```
cjs是输出的文件类型是commonjs，输出的文件严格按照commonjs规范，没有import export 有module.export , require

输出到文件：

```
rollup src/rollup/main.js -o bundle.js -f cjs
```

```
'use strict';

var foo = 'hello world!';

var main = function () {
  console.log(foo);
};

module.exports = main;
```
现在看看umd通用格式：

```
rollup src/rollup/main.js -f umd -o bound.js -n bound
```

```
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.bound = factory());
}(this, function () { 'use strict';

    var foo = 'hello world';

    function main () {
        console.log(foo);
    }

    return main;

}));
```
输出的code 是判断是否支持commonjs,是否支持amd,如果都不支持，输出es5普通方法。从这可以看出，为什么rollup打包出来的库可以被其他库直接使用

##### 使用配置文件

```
// rollup.config.js
export default {
    input: 'src/rollup/main.js',
    output: {
        file: 'bound.js',
        format: 'cjs'
    }
}
```
执行命令
```
rollup -c -o bound.js
```
##### 使用插件
###### rollup-plugin-json：

使用 rollup-plugin-json，令 Rollup 从 JSON 文件中读取数据

```
npm install --save-dev rollup-plugin-json
```

```
// src/rollup/main.js
import { version } from '../package.json';

export default function () {
  console.log('version ' + version);
}
```
配置文件
```
// rollup.config.js
import json from 'rollup-plugin-json';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ json() ]
};
```

###### rollup-plugin-node-resolve：
 rollup-plugin-node-resolve 插件可以告诉 Rollup 如何查找外部模块
 
```
// src/rollup/main.js
import answer from 'the-answer';

export default function () {
  console.log('the answer is ' + answer);
}
```
配置文件
```
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ resolve() ]
};
```
###### rollup-plugin-commonjs
 rollup-plugin-commonjs 插件就是用来将 CommonJS 转换成 ES2015 模块
###### 外部的引用，使用externals

```
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [resolve({
    // 将自定义选项传递给解析插件
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  })],
  // 指出应将哪些模块视为外部模块
  external: ['lodash']
};
```

###### Babel等

#### webpack
配置文件

```
module.exports= {
    entry: '/src/webpack/main.js',
    output : {
        filename: 'bound.js'
    }
}
```
打包之后：

```
!function(e){
    var t={};
    function n(r){
        if(t[r])
        return t[r].exports;
        var o=t[r]={i:r,l:!1,exports:{}};
        return e[r].call(o.exports,o,o.exports,n),
            o.l=!0,
            o.exports
        }
        n.m=e,
        n.c=t,
        n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},
        n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),
            Object.defineProperty(e,"__esModule",{value:!0})
        },
        n.t=function(e,t){
            if(1&t&&(e=n(e)),8&t)
            return e;
            if(4&t&&"object"==typeof e&&e&&e.__esModule)
            return e;
            var r=Object.create(null);
            if(n.r(r),
            Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)
            for(var o in e)
            n.d(r,o,function(t){return e[t]}.bind(null,o));
            return r
            },
        n.n=function(e){
            var t=e&&e.__esModule?function(){return e.default}:function(){return e};
            return  n.d(t,"a",t),t
            },
        n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},
        n.p="",
        n(n.s=0)
}([function(e,t){(function(t){e.exports={entry:t+"/src/webpack/main.js",output:{path:t+"/public",filename:"bound.js"}}}).call(this,"/")}]);
```

打包之后的代码没那么清晰