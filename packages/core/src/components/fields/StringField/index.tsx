import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { IField } from 'typings';
import FormItemWidget from '../../widgets/FormItem';

function StringField<DecoratorProps, ComponentProps>(props: IField<DecoratorProps, ComponentProps>) {
  const { widget, props: compProps = {} } = props;

  return (
    <FormItemWidget {...props}>
      <Input {...compProps} />
    </FormItemWidget>
  );
}

export default StringField;
