import React, { useEffect, useMemo } from 'react';
import { Button, Form } from 'antd';
import { IFormRender } from 'typings';
import FieldRender from './components/fields';
import useForm from './hooks/useForm';
import { ConfigProvider } from 'antd';
import Watcher from './hooks/watcher';
import { FormContext } from './utils/context';
import { collectDependencies } from './utils/dependencies';

function FormRender<DecoratorProps, ComponentProps>(props: IFormRender<DecoratorProps, ComponentProps>) {
  const {
    hasSubmitBtn,
    schema,
    field,
    layout = {},
    metaKey = [],
    name = 'schemaForm',
    onFinish = () => {},
    onMount = () => {},
    onChange = () => {},
  } = props;

  const form = field || useForm();

  useEffect(() => {
    onMount(form);

    return () => {
      form.resetFields();
    };
  }, []);

  const watch = props.watch || form.__options?.watch || {};
  const watchList = Object.keys(watch);
  const namePath = Array.isArray(metaKey) ? metaKey : [metaKey];

  const dependenciesMap = useMemo(() => collectDependencies(schema), [JSON.stringify(schema)]);
  // console.log('dependenciesMap...', form, dependenciesMap);

  return (
    <ConfigProvider>
      <Form.Provider>
        <FormContext.Provider value={dependenciesMap}>
          <Form
            {...layout}
            form={form}
            name={name}
            requiredMark
            onFinish={onFinish}
            onValuesChange={(changedValues, values) => {
              onChange(changedValues, values);
            }}
            // onFieldsChange={(...res) => console.log('onFieldsChange...', ...res)}
          >
            {watchList.length > 0 &&
              watchList.map((item) => {
                return <Watcher key={item} watchKey={item} watch={watch} field={form} />;
              })}
            <FieldRender {...props} field={form} metaKey={namePath} namePath={namePath} />
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
