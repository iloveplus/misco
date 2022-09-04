import React, { useEffect } from 'react';
import { Button, Form } from 'antd';
import { IFormRender } from 'typings';
import FieldRender from './components/fields';
import useForm from './hooks/useForm';
import { ConfigProvider } from 'antd';
import Watcher from './hooks/watcher';

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

  const watch = props.watch || field.__options?.watch || {};
  const watchList = Object.keys(watch);

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
          {watchList.length > 0 &&
            watchList.map((item) => {
              return <Watcher key={item} watchKey={item} watch={watch} field={field} />;
            })}
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
