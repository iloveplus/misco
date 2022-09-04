import React from 'react';
import { IFormRender } from 'typings';
import ArrayField from '../fields/ArrayField';
import ObjectField from '../fields/ObjectField';
import BooleanField from '../fields/BooleanField';
import StringField from '../fields/StringField';
import NumberField from '../fields/NumberField';
import WidgetField from '../fields/WidgetField';
import { compatXRenderSchema } from '../../utils';
import { evaluatePropsValue } from '../../utils/parseSchema';

function FieldRender<DecoratorProps>({
  schema = {},
  schemaUi = {},
  layout = {},
  field,
  metaKey,
  namePath,
  isPreview,
  disabled,
  ...options
}: IFormRender<DecoratorProps, Record<string, any>>) {
  const {
    type,
    widget,
    format,
    min,
    max,
    placeholder,
    readOnly,
    default: defaultValue,
    required,
    hidden,
    items = {},
    properties = {},
    decoratorProps = {},
    props = {},
    ...res
  } = schema;

  const formData = field.formData;
  const isHidden = evaluatePropsValue(hidden, formData, namePath);
  if (isHidden) {
    return null;
  }

  const fieldProps: any = {
    type,
    metaKey,
    namePath,
    field,
    isPreview,
    layout,
    props: {
      ...props,
      style: {
        width: type !== 'boolean' ? '100%' : 'auto',
        ...(props.style || {}),
      },
      placeholder: props.placeholder || placeholder,
      min: props.min || min,
      max: props.max || max,
    },
    decoratorProps: {
      ...decoratorProps,
      initialValue: defaultValue,
    },
    schemaUi,
    disabled,
    format,
    ...res,
  };

  const widgetComp = compatXRenderSchema(type, format, widget, fieldProps);
  if (widgetComp) {
    return <WidgetField widget={widgetComp} {...fieldProps} />;
  }

  let Render: any = React.Fragment;
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
