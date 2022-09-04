import get from 'lodash/get';

export function getType(v: any) {
  return /\[object (\w+?)\]/.exec(Object.prototype.toString.call(v))?.[1];
}

export const isObject = (v: any) => {
  return getType(v) === 'Object';
};

export function isFunction(func: any) {
  if (typeof func === 'function') {
    return func;
  }

  if (typeof func === 'string' && /^{{.*}}$/.test(func)) {
    return func.substring(2, func.length - 2);
  }

  return false;
}

export function evaluateString(str: string, formData: any, rootValue: any, extraData: any) {
  try {
    const func = new Function('formData', 'rootValue', 'extraData', `return ${str}`);
    return func(formData, rootValue, extraData);
  } catch (error) {
    return false;
  }
}

export function evaluatePropsValue(val: any, formData: any, parentKey: Array<number | string>, extraData = {}) {
  if (!val) return void 0;

  const levelKey = parentKey.slice(0, parentKey.length - 1);
  const rootValue = get(formData, levelKey);
  if (levelKey.length >= 1) {
    const $index = levelKey[levelKey.length - 1];

    if (typeof $index === 'number' && Array.isArray(get(formData, $index))) {
      rootValue.$index = $index;
    }
  }

  let func = isFunction(val);
  if (func) {
    if (typeof func === 'string') {
      return evaluateString(func, formData, rootValue, extraData);
    } else if (typeof func === 'function') {
      return func(formData, rootValue, extraData);
    }
  }

  return val;
}

export function evaluateProps(propValues: any, formData: any, parentKey: any) {
  return propValues
    .filter((item: any) => isFunction(item))
    .map((item: string) => evaluatePropsValue(item, formData, parentKey));
}
