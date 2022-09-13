import React from 'react';
import { Input, Popover } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { IField } from 'typings';
import FormItemWidget from '../../widgets/FormItem';
import WidgetField from '../WidgetField';

function StringField<DecoratorProps, ComponentProps>(props: IField<DecoratorProps, ComponentProps>) {
  const { widget, metaKey, field, format, props: compProps = {} } = props;

  if (widget) {
    return <WidgetField {...props} />;
  }

  const renderAddonAfter = () => {
    if (format?.startsWith('image')) {
      const src = field.watch(metaKey);

      return (
        <Popover content={<img style={{ minWidth: 120 }} src={src} />} placement="right" trigger="hover">
          <FileImageOutlined />
        </Popover>
      );
    }
    return null;
  };

  return (
    <FormItemWidget {...props}>
      <Input addonAfter={renderAddonAfter()} {...compProps} />
    </FormItemWidget>
  );
}

export default StringField;
