import { Form } from 'antd';
import { IFormField, NamePath } from 'typings';

interface IUseFormProps {
  watch: Record<string, (value: any, key: string) => void>;
}

const useForm = (options?: IUseFormProps): IFormField => {
  const [form] = Form.useForm();
  const { watch } = options || {};

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
