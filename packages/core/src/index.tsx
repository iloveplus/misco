import React, { useEffect, useMemo } from 'react';
import { Button, Form } from 'antd';
import { IFormRender } from 'typings';
import FieldRender from './components/fields';
import useForm from './hooks/useForm';
import { ConfigProvider } from 'antd';
import Watcher from './hooks/watcher';
import { FormContext } from './utils/context';

function FormRender<DecoratorProps, ComponentProps>(props: IFormRender<DecoratorProps, ComponentProps>) {
  const {
    hasSubmitBtn,
    layout = {},
    metaKey = [],
    name = 'schemaForm',
    field = useForm(),
    onFinish = () => {},
    onMount = () => {},
    onChange = () => {},
  } = props;

  useEffect(() => {
    onMount(field);

    return () => {
      field.resetFields();
    };
  }, []);

  const watch = props.watch || field.__options?.watch || {};
  const watchList = Object.keys(watch);
  const namePath = Array.isArray(metaKey) ? metaKey : [metaKey];

  const formData = useMemo(() => field.formData, [JSON.stringify(field.formData)]);

  return (
    <ConfigProvider>
      <Form.Provider>
        <FormContext.Provider value={formData}>
          <Form
            {...layout}
            form={field}
            name={name}
            requiredMark
            onFinish={onFinish}
            onValuesChange={(changedValues, values) => {
              onChange(changedValues, values);
              field.setState({ formData: values });
            }}
            // onFieldsChange={(...res) => console.log('onFieldsChange...', ...res)}
          >
            {watchList.length > 0 &&
              watchList.map((item) => {
                return <Watcher key={item} watchKey={item} watch={watch} field={field} />;
              })}
            <FieldRender {...props} metaKey={namePath} namePath={namePath} />
            {hasSubmitBtn && (
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            )}
          </Form>
        </FormContext.Provider>
      </Form.Provider>
    </ConfigProvider>
  );
}

export default FormRender;

export { useForm };
