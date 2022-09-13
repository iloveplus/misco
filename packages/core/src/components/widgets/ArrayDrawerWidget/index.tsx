import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import { IArrayField } from 'typings';
import FormRender, { useForm } from '../../../index';
import './index.less';

function ArrayDrawerWidget<DecoratorProps, ComponentProps>(props: IArrayField<DecoratorProps, ComponentProps>) {
  const { metaKey, schema, schemaUi, field, onClose, ...drawerProps } = props;
  const drawerField = useForm({});
  const isOpen = !!metaKey;

  const closeDrawer = () => {
    field.setFieldValue(metaKey, drawerField.getValues());
    onClose();
    drawerField.reset();
  };

  useEffect(() => {
    const data = field.getFieldValue(metaKey);
    if (isOpen) {
      drawerField.setFieldsValue(data || {});
    }
  }, [isOpen]);

  return (
    <Drawer title="编辑" width="50vw" placement="right" {...drawerProps} onClose={closeDrawer} open={isOpen}>
      <FormRender
        schema={{ ...schema, title: '' }}
        schemaUi={schemaUi}
        metaKey={[]}
        field={drawerField}
        name="array-drawer"
      />
    </Drawer>
  );
}

export default ArrayDrawerWidget;
