import React from 'react';
import { InputNumber } from 'antd';
import { IField } from 'typings';
import FormItemWidget from '../../widgets/FormItem';
import WidgetField from '../WidgetField';

function NumberField<DecoratorProps, ComponentProps>(props: IField<DecoratorProps, ComponentProps>) {
  const { widget, maximum, minimum, multipleOf, props: compProps = {} } = props;

  maximum !== undefined && (compProps.max = maximum);
  minimum !== undefined && (compProps.min = minimum);
  multipleOf !== undefined && (compProps.step = multipleOf);

  if (widget) {
    return <WidgetField {...props} />;
  }

  return (
    <FormItemWidget {...props}>
      <InputNumber {...compProps} />
    </FormItemWidget>
  );
}

export default NumberField;
