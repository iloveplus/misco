import React from 'react';
import { IField } from 'typings';
import FormItemWidget from '../../widgets/FormItem';
import { widgetMap } from './widget';

function WidgetField<DecoratorProps, ComponentProps>(props: IField<DecoratorProps, ComponentProps>) {
  const { widget, schemaUi, props: compProps = {} } = props;
  let Component = null;

  if (widget) {
    Component = schemaUi[widget] || widgetMap[widget];
    if (['select', 'picker'].some((item) => widget.toLowerCase().indexOf(item) >= 0)) {
      compProps.style = {
        width: '100%',
        ...(compProps.style || {}),
      };
    }
  }

  if (!Component) {
    console.warn(widget, 'is not found', props);
    return null;
  }

  return (
    <FormItemWidget {...props}>
      <Component {...compProps} />
    </FormItemWidget>
  );
}

export default WidgetField;
