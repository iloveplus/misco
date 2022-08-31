import { Form } from 'antd';
import { useState } from 'react';
import { getParentPath, isUndefined } from '../utils';
import { IFormField, NamePath } from 'typings';

interface IUseFormProps {
  watch?: Record<string, (value: any, key: string) => void>;
  defaultOpenKeys?: Record<string, boolean>;
  defaultExpandAll?: boolean;
  expandExclusion?: boolean;
}

const useForm = (options?: IUseFormProps): IFormField => {
  const [form] = Form.useForm();
  const { watch, defaultExpandAll, expandExclusion, defaultOpenKeys = {} } = options || {};
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

  const fieldOptions = {
    getValue: function <T>(name: NamePath) {
      return form.getFieldValue(name);
    },
    setValue: function <T>(name: NamePath, value: T) {
      form.setFieldValue(name, value);
    },
    getValues: function <T>(names: NamePath[], filterFunc?: (meta: any) => boolean) {
      return form.getFieldsValue(names, filterFunc);
    },
    setValues: function (values: Record<string, any>) {
      form.setFieldsValue(values);
    },
    reset: function (names?: NamePath[]) {
      form.resetFields(names);
    },
    watch: function (name: NamePath) {
      return Form.useWatch(name, form);
    },
    getOpenKey: (name: string) => {
      if (defaultExpandAll && isUndefined(openKeys[name])) {
        return true;
      }

      return openKeys[name];
    },
    setOpenKey: (name: string, value: boolean) => {
      let sameLevelObj = {};

      if (expandExclusion) {
        const prefix = getParentPath(name);

        sameLevelObj = Object.keys(openKeys)
          .filter((key) => getParentPath(key) === prefix)
          .reduce((res: any, cur: string) => {
            res[cur] = false;
            return res;
          }, {});
      }

      setOpenKeys({
        ...openKeys,
        ...sameLevelObj,
        [name]: value,
      });
    },
  };

  // 监听值变化
  if (watch && typeof watch === 'object') {
    Object.keys(watch).forEach((key) => {
      const watchValue = fieldOptions.watch(key.split('.'));

      if (typeof watch[key] === 'function') {
        watch[key](watchValue, key);
      } else {
        console.warn('watch 必须为函数回调');
      }
    });
  }

  return {
    ...form,
    ...fieldOptions,
  };

  //   return new Proxy(form, {
  //     get: (target, prop) => {
  //       if (prop in target) {
  //         return Reflect.get(target, prop);
  //       } else {
  //         return fieldOptions[prop];
  //       }
  //     },
  //   }) as IFormField;
};

export default useForm;
