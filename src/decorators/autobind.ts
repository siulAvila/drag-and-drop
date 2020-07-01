export function AutoBind(
  _: any,
  _2: string,
  originalDescriptor: PropertyDescriptor
) {
  const method = originalDescriptor.value;

  const descriptor: PropertyDescriptor = {
    get() {
      return method.bind(this);
    },
    enumerable: false,
  };

  return descriptor;
}
