import React from 'react';
import { InputNumber } from 'antd';
import { IField } from 'typings';
import FormItemWidget from '../../widgets/FormItem';

function NumberField<DecoratorProps, ComponentProps>(props: IField<DecoratorProps, ComponentProps>) {
  const { maximum, minimum, multipleOf, props: compProps = {} } = props;

  maximum !== undefined && (compProps.max = maximum);
  minimum !== undefined && (compProps.min = minimum);
  multipleOf !== undefined && (compProps.step = multipleOf);

  return (
    <FormItemWidget {...props}>
      <InputNumber {...compProps} />
    </FormItemWidget>
  );
}

export default NumberField;
