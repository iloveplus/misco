import { Form } from 'antd';
import { useState } from 'react';
import { getNamePath, getParentPath, isUndefined } from '../utils';
import { IFormField, IUseFormProps, NamePath } from 'typings';

const useForm = (options?: IUseFormProps): IFormField => {
  const [form] = Form.useForm();
  const { defaultExpandAll, expandExclusion, defaultOpenKeys = {} } = options || {};
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

  const fieldOptions = {
    __options: options,
    getValue: function (path: string) {
      return form.getFieldValue(getNamePath(path));
    },
    setValue: function <T>(path: string, value: T) {
      form.setFieldValue(getNamePath(path), value);
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
