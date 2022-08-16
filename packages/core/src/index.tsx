import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { IFormRender } from 'typings';
import FieldRender from './components/fields';

function FormRender<DecoratorProps, ComponentProps>(
  props: IFormRender<DecoratorProps, ComponentProps>,
): React.FC {
  const { onFinish, layout = {} } = props;

  return (
    <Form.Provider>
      <Form
        {...layout}
        name="schemaForm"
        onValuesChange={console.log}
        onFieldsChange={(...res) => console.log('onFieldsChange...', ...res)}
      >
        <FieldRender {...props} />
      </Form>
    </Form.Provider>
  );
}

export default FormRender;
