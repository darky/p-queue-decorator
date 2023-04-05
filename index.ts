import PQueueOrig from 'p-queue'

export const PQueue =
  (options?: ConstructorParameters<typeof PQueueOrig>[0]) =>
  (
    {},
    {},
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ): TypedPropertyDescriptor<(...args: any[]) => any> => {
    if (typeof descriptor.value !== 'function') {
      throw new Error('Decorator PQueue should be used on class method')
    }

    const _queue = new PQueueOrig(options)

    descriptor.value = new Proxy(descriptor.value, {
      apply(fn, that, args) {
        return _queue.add(() => fn.apply(that, args))
      },
    })

    Object.assign(descriptor.value, { _queue })

    return descriptor
  }
