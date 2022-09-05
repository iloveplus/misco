import get from 'lodash/get';
import { isFunction } from '.';

export function calculateString(str: string, formData: any, rootValue: any, extraData: any) {
  try {
    const func = new Function('formData', 'rootValue', 'extraData', `return ${str}`);
    return func(formData, rootValue, extraData);
  } catch (error) {
    return false;
  }
}

export function calculatePropsValue(val: any, formData: any, parentKey: Array<number | string>, extraData = {}) {
  if (!val) return void 0;

  const levelKey = parentKey.slice(0, parentKey.length - 1);
  const rootValue = get(formData, levelKey);
  if (levelKey.length >= 1) {
    const $index = levelKey[levelKey.length - 1];
    const $parentArrayKey = levelKey.slice(0, levelKey.length - 1);

    if (typeof $index === 'number' && Array.isArray(get(formData, $parentArrayKey))) {
      rootValue.$index = $index;
    }
  }

  let func = isFunction(val);
  if (func) {
    if (typeof func === 'string') {
      return calculateString(func, formData, rootValue, extraData);
    } else if (typeof func === 'function') {
      return func(formData, rootValue, extraData);
    }
  }

  return val;
}

/**
 * 计算动态Props值
 * @param props
 * @param formData
 * @param namePath
 * @returns
 */
export function calculateProps(props: any, formData: any, namePath: any) {
  return Object.keys(props).reduce((res, key) => {
    let val = props[key];
    const isFunc = isFunction(val);
    if (isFunc) {
      val = calculatePropsValue(val, formData, namePath);
    }

    return {
      ...res,
      [key]: val,
    };
  }, {});
}
