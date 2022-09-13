import React, { useEffect } from 'react';
import { IFormRender } from 'typings';
import ArrayField from '../fields/ArrayField';
import ObjectField from '../fields/ObjectField';
import BooleanField from '../fields/BooleanField';
import StringField from '../fields/StringField';
import NumberField from '../fields/NumberField';
import WidgetField from '../fields/WidgetField';
import { compatXRenderSchema } from '../../utils';

function FieldRender({
  schema = {},
  schemaUi = {},
  layout = {},
  field,
  metaKey,
  namePath,
  isPreview,
  disabled,
  ...options
}: IFormRender<Record<string, any>, Record<string, any>>) {
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

  const calPropsValue = field.calculatePropsValue(namePath, {
    hidden,
    required,
    readOnly: readOnly || props.readOnly,
    disabled: disabled || props.disabled,
    decoratorHidden: decoratorProps.hidden,
    defaultValue: defaultValue || props.defaultValue,
  });

  // console.log(field, calPropsValue, '====>>>');

  // 更新默认值
  const calDefault = calPropsValue.defaultValue;
  useEffect(() => {
    if (typeof calDefault !== 'undefined') {
      field.setFieldValue(namePath, calDefault);
    }
  }, [calDefault]);

  // 处理隐藏逻辑
  const isHidden = calPropsValue.hidden;
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
    required: calPropsValue.required,
    props: {
      ...props,
      style: {
        width: type !== 'boolean' ? '100%' : 'auto',
        ...(props.style || {}),
      },
      placeholder: props.placeholder || placeholder,
      min: props.min || min,
      max: props.max || max,
      readOnly: calPropsValue.readOnly,
      disabled: calPropsValue.disabled,
    },
    decoratorProps: {
      ...decoratorProps,
      ...options,
      initialValue: calDefault,
      hidden: calPropsValue.decoratorHidden,
      rules: decoratorProps.rules || [],
    },
    schemaUi,
    disabled: calPropsValue.disabled,
    format,
    ...res,
  };

  const widgetComp = compatXRenderSchema(type, format, widget, fieldProps);
  if (widgetComp) {
    fieldProps.widget = widgetComp;
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
