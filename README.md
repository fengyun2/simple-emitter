#simple-emitter

>简易版的事件模型(支持链式调用)

##使用方法

```js
const emitter = new Emitter()

emitter.on('event', (arg1, arg2) => {
  console.log('get event', arg1, arg2)
}).on('event', (arg1, arg2) => {
  console.log('get event', arg1+arg2)
}).emit('event', 1, 2)

emitter.off('event')
emitter.emit('event', 6, 8)
emitter.emit('event', 10, 11)
// emitter.hasListener('event')
console.log(emitter.hasListener('event'))
console.log(emitter.hasListener('event2'))
```

