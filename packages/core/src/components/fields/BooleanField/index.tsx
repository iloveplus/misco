import React from 'react';
import { Checkbox } from 'antd';
import { IField } from 'typings';
import FormItemWidget from '../../widgets/FormItem';
import WidgetField from '../WidgetField';

function BooleanField<DecoratorProps, ComponentProps>(props: IField<DecoratorProps, ComponentProps>) {
  const { widget, props: compProps = {} } = props;

  if (widget) {
    return <WidgetField {...props} />;
  }

  return (
    <FormItemWidget {...props}>
      <Checkbox {...compProps} />
    </FormItemWidget>
  );
}

export default BooleanField;
