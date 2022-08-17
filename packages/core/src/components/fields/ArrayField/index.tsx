import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { IField } from 'typings';

function ArrayField<DecoratorProps, ComponentProps>({
  schema = {},
  schemaUi = {},
  layout = {},
  field,
  metaKey,
  isPreview,
  disabled,
  ...options
}: IField<DecoratorProps, ComponentProps>) {
  return <div>ArrayField</div>;
}

export default ArrayField;
