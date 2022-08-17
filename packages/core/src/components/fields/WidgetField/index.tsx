import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { IField } from 'typings';

function WidgetField<DecoratorProps, ComponentProps>({
  schema = {},
  schemaUi = {},
  layout = {},
  field,
  metaKey,
  isPreview,
  disabled,
  ...options
}: IField<DecoratorProps, ComponentProps>) {
  return <div>WidgetField</div>;
}

export default WidgetField;
