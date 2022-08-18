import React from 'react';
import { IFormRender } from 'typings';
import ArrayField from '../fields/ArrayField';
import ObjectField from '../fields/ObjectField';
import BooleanField from '../fields/BooleanField';
import StringField from '../fields/StringField';
import NumberField from '../fields/NumberField';
import WidgetField from '../fields/WidgetField';

function FieldRender<DecoratorProps, ComponentProps>({
  schema = {},
  schemaUi = {},
  layout = {},
  field,
  metaKey,
  isPreview,
  disabled,
  ...options
}: IFormRender<DecoratorProps, ComponentProps>) {
  const {
    type,
    widget,
    readOnly,
    default: defaultValue,
    hidden,
    required,
    items = {},
    properties = {},
    decoratorProps = {},
    props = {},
    ...res
  } = schema;

  const fieldProps: any = {
    type,
    metaKey: typeof metaKey === 'string' ? [metaKey] : metaKey,
    field,
    isPreview,
    layout,
    props: {
      ...props,
      style: {
        width: type !== 'boolean' ? '100%' : 'auto',
        ...((props as any).style || {}),
      },
    },
    decoratorProps: {
      ...decoratorProps,
      initialValue: defaultValue,
    },
    schemaUi,
    disabled,
    ...res,
  };

  if (widget) {
    return <WidgetField {...fieldProps} />;
  }

  let Render: any = null;
  switch (type) {
    case 'object':
      fieldProps.properties = properties;
      Render = <ObjectField {...fieldProps} />;
      break;
    case 'array':
      fieldProps.items = items;
      Render = <ArrayField {...fieldProps} />;
      break;
    case 'boolean':
      fieldProps.decoratorProps.valuePropName = 'checked';
      Render = <BooleanField {...fieldProps} />;
      break;
    case 'number':
      Render = <NumberField {...fieldProps} />;
      break;
    case 'integer':
      fieldProps.props.precision = 0;
      Render = <NumberField {...fieldProps} />;
      break;
    case 'string':
      Render = <StringField {...fieldProps} />;
      break;
    default:
      Render = <WidgetField {...fieldProps} />;
      break;
  }

  return Render;
}

export default FieldRender;
