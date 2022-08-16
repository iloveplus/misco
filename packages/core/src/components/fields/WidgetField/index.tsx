import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { IFormRender } from 'typings';

function WidgetField<DecoratorProps, ComponentProps>({
  schema = {},
  schemaUi = {},
  layout = {},
  field,
  metaKey,
  isPreview,
  disabled,
  ...options
}: IFormRender<DecoratorProps, ComponentProps>): React.FC {
  return <div>WidgetField</div>;
}

export default WidgetField;
