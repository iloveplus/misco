import React from 'react';
import { Checkbox } from 'antd';
import { IField } from 'typings';
import FormItemWidget from '../../widgets/FormItem';

function BooleanField<DecoratorProps, ComponentProps>(props: IField<DecoratorProps, ComponentProps>) {
  const { maximum, minimum, multipleOf, props: compProps = {} } = props;

  maximum !== undefined && (compProps.max = maximum);
  minimum !== undefined && (compProps.min = minimum);
  multipleOf !== undefined && (compProps.step = multipleOf);

  return (
    <FormItemWidget {...props}>
      <Checkbox {...compProps} />
    </FormItemWidget>
  );
}

export default BooleanField;
