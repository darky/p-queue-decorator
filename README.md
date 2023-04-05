# p-queue-decorator

Decorator, that wraps your class methods with dedicated [p-queue](https://github.com/sindresorhus/p-queue) instances

## Example

```ts
import { PQueue } from 'p-queue-decorator'

class Test {
  @PQueue(/* optional https://github.com/sindresorhus/p-queue#options */)
  async method(a: number, b: number) {
    return a + b // method call will be through PQueue instance
  }
  
  @PQueue()
  async method2(a: number, b: number) {
    return a + b // for this method another PQueue instance will be used
  }
}
```

_Note: methods will be forced to Promise returning_
