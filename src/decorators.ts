
export function ValidateSpellPower(
  _target: object,
  _propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    const spell = args[0] as { power?: number };

    if (typeof spell?.power === "number" && spell.power < 0) {
      throw new Error("La puissance du sort ne peut pas être négative.");
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}

export function Cache(
  _target: object,
  _propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  const cache = new WeakMap<object, Map<string, unknown>>();

  descriptor.value = function (...args: unknown[]) {
    if ((typeof this !== "object" && typeof this !== "function") || this === null) {
      return originalMethod.apply(this, args);
    }

    let instanceCache = cache.get(this);

    if (!instanceCache) {
      instanceCache = new Map<string, unknown>();
      cache.set(this, instanceCache);
    }

    const key = JSON.stringify(args);

    if (instanceCache.has(key)) {
      return instanceCache.get(key);
    }

    const result = originalMethod.apply(this, args);
    instanceCache.set(key, result);

    return result;
  };

  return descriptor;
}
