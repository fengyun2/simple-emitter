/**
 * 简易版的事件模型(支持链式调用), 主要目的主要是用来说明前端 addEventListener 是如何工作的
 * 最重要的两个方法分别是: on、emit
 */
class Emitter {
  constructor() {
      this._listeners = {}
    }
    // 注册事件
  on(eventName, callback) {
      const listeners = this._listeners[eventName] || []
      listeners.push(callback)
      this._listeners[eventName] = listeners
      return this
    }
    //触发事件
  emit(eventName, ...args) {
    const listeners = this._listeners[eventName]

    if (!Array.isArray(listeners)) {
      return this
    }

    listeners.forEach(callback => {
      try {
        // callback.apply(this, args)
        callback(...args)
      } catch (err) {
        console.error(err)
      }
    })
    return this
  }

  // 关闭一个事件/多个事件
  off(eventName, callback) {
    // 关闭所有事件
    if (!eventName) {
      this._listeners = {}
      return this
    }

    const listeners = this._listeners[eventName]
    // 如果这个事件不存在, 直接返回它本身
    if(!listeners) {
      return this
    }

    delete this._listeners[eventName]

    return this
  }
  // 返回一个事件
  listeners(eventName) {
    const listeners= this._listeners[eventName] || []
    return listeners
  }
  // 检查一个事件是否已经被注册
  hasListener(eventName) {
    return !!this.listeners(eventName).length
  }
}

module.exports = Emitter

/*// 实例(用法)
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

// emitter.emit('event', 'arg1', 'arg2')*/
