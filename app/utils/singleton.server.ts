// eslint-disable-next-line ts/no-explicit-any
type Constructor = new (...args: any) => any

export function singleton<C extends Constructor>(
  ClassName: C,
  args?: ConstructorParameters<C>,
) {
  let instance: InstanceType<C>

  const ProxyClass = new Proxy(ClassName, {
    get(_target, prop, receiver) {
      instance = instance ?? (new ClassName(args) as typeof instance)
      return Reflect.get(instance, prop, receiver)
    },
  })

  return ProxyClass as typeof instance
}
