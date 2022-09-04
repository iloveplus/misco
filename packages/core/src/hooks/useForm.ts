import { Form } from 'antd';
import { getNamePath } from '../utils';
import { IFormField, IUseFormProps, NamePath } from 'typings';
import useCollapse from './useCollapse';

const useForm = (options?: IUseFormProps): IFormField => {
  const [form] = Form.useForm();
  const { getOpenKey, setOpenKey } = useCollapse(options);

  const fieldOptions = {
    __options: options,
    getValue: function (path: string) {
      return form.getFieldValue(getNamePath(path));
    },
    setValue: function <T>(path: string, value: T) {
      form.setFieldValue(getNamePath(path), value);
    },
    getValues: function <T>(names?: NamePath[], filterFunc?: (meta: any) => boolean) {
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
    getOpenKey,
    setOpenKey,
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
