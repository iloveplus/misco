import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { IFormRender } from 'typings';

function NumberField<DecoratorProps, ComponentProps>({
  schema = {},
  schemaUi = {},
  layout = {},
  field,
  metaKey,
  isPreview,
  disabled,
  ...options
}: IFormRender<DecoratorProps, ComponentProps>): React.FC {
  return <div>NumberField</div>;
}

export default NumberField;
