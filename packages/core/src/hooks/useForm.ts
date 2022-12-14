import { InternalNamePath } from 'antd/es/form/interface';
import { Form } from 'antd';
import { getNamePath } from '../utils';
import { IFormField, IUseFormProps, NamePath } from 'typings';
import useCollapse from './useCollapse';
import useSet from './useSet';
import useCalculatePropValue from './useCalculatePropValue';

const useForm = (options?: IUseFormProps): IFormField => {
  const [form] = Form.useForm();
  const { getOpenKey, setOpenKey } = useCollapse(options);

  const [state, setState] = useSet({
    formData: {},
  });

  const fieldOptions: IFormField = {
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
    calculatePropsValue: function (namePath: InternalNamePath, props: any) {
      return useCalculatePropValue(namePath, props, form as IFormField) || {};
    },
    getOpenKey,
    setOpenKey,
    ...state,
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
