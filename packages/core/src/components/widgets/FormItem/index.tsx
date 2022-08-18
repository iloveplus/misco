import React from 'react';
import { Form } from 'antd';
import { IField } from 'typings';

function FormItemWidget<DecoratorProps, ComponentProps>(props: IField<DecoratorProps, ComponentProps>) {
  const { title, description, children, metaKey, decoratorProps = {} } = props;

  return React.createElement(
    Form.Item,
    {
      label: title,
      tooltip: !!description && { title: description, icon: undefined },
      name: metaKey,
      ...decoratorProps,
    },
    children,
  );
}

export default FormItemWidget;
