import React from 'react';
import { Button, Form } from 'antd';
import { IFormRender } from 'typings';
import FieldRender from './components/fields';
import useForm from './hooks/useForm';
import { ConfigProvider } from 'antd';

function FormRender<DecoratorProps, ComponentProps>(props: IFormRender<DecoratorProps, ComponentProps>) {
  const { onFinish, field = useForm(), hasSubmitBtn, layout = {} } = props;

  return (
    <ConfigProvider>
      <Form.Provider>
        <Form
          {...layout}
          form={field}
          name="schemaForm"
          requiredMark
          onFinish={onFinish}
          onValuesChange={console.log}
          // onFieldsChange={(...res) => console.log('onFieldsChange...', ...res)}
        >
          <FieldRender {...props} />
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
