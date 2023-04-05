import { test } from 'node:test'
import { PQueue } from '.'
import assert from 'node:assert'
import PQueueOrig from 'p-queue'

test('check queue creation', async () => {
  class Test {
    @PQueue({ concurrency: 7 })
    async method(a: number, b: number) {
      return a + b
    }
  }

  assert.strictEqual((Reflect.get(Test.prototype.method, '_queue') as PQueueOrig).concurrency, 7)
})

test('correct proxy for success', async () => {
  class Test {
    @PQueue()
    async method(a: number, b: number) {
      return a + b
    }
  }

  const obj = new Test()

  assert.strictEqual(await obj.method(1, 1), 2)
})

test('correct proxy for error', async () => {
  class Test {
    @PQueue()
    async method() {
      throw new Error('test')
    }
  }

  const obj = new Test()

  assert.rejects(() => obj.method())
})
