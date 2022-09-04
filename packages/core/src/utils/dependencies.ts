import cloneDeep from 'lodash/cloneDeep';
import { isFunction, isObject } from './parseSchema';

export function collectDependencies(_schema: any, metaKey: any = [], result = new Map()) {
  const schema = cloneDeep(_schema);

  if (isObjType(schema)) {
    Object.keys(schema.properties).forEach((key) => {
      collectDependencies(schema.properties[key], [...metaKey, key], result);
    });
  } else if (isListType(schema)) {
    collectDependencies(schema.items, [...metaKey, 0], result);
  } else {
    Object.keys(schema || {}).forEach((key) => {
      const value = schema[key];
      if (isFunction(value)) {
        parseDependencies(value, key, metaKey, result);
      } else if (typeof key === 'string' && key.toLowerCase().indexOf('props') > -1) {
        if (isObject(value)) {
          Object.keys(value).forEach((k) => {
            if (isFunction(value[k])) {
              parseDependencies(value[k], `${key}.${k}`, metaKey, result);
            }
          });
        }
      }
    });
  }

  return result;
}

function parseDependencies(value: string, propKey = '', metaKey: Array<string | number>, result: Map<any, any>) {
  const regex = /((rootValue|formData|extraData).(\w|\.)+)(\s|})/g;

  let dependencies = [];
  let v;

  while ((v = regex.exec(value)) !== null) {
    dependencies.push(v[1]);
  }

  if (result.has(metaKey)) {
    result.set(metaKey, [...result.get(metaKey), { dependencies, propKey }]);
  } else {
    result.set(metaKey, [{ dependencies, propKey }]);
  }
}

export function isObjType(schema: any) {
  return schema && schema.type === 'object' && schema.properties && !schema.widget;
}

export function isListType(schema: any) {
  return schema && schema.type === 'array' && isObjType(schema.items) && schema.enum === undefined;
}
