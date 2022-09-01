import React, { useEffect } from 'react';
import { Button, Form } from 'antd';
import { IFormRender } from 'typings';
import FieldRender from './components/fields';
import useForm from './hooks/useForm';
import { ConfigProvider } from 'antd';

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
  }, []);

  return (
    <ConfigProvider>
      <Form.Provider>
        <Form
          {...layout}
          form={field}
          name={name}
          requiredMark
          onFinish={onFinish}
          onValuesChange={onChange}
          // onFieldsChange={(...res) => console.log('onFieldsChange...', ...res)}
        >
          <FieldRender {...props} metaKey={metaKey} />
          {hasSubmitBtn && (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          )}
        </Form>
      </Form.Provider>
    </ConfigProvider>
  );
}

export default FormRender;

export { useForm };
