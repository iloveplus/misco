import React, { useRef } from 'react';
import { Drawer } from 'antd';
import { IArrayField } from 'typings';
import FormRender from '../../../index';
import './index.less';

function ArrayDrawerWidget<DecoratorProps, ComponentProps>(props: IArrayField<DecoratorProps, ComponentProps>) {
  const { metaKey, schema, schemaUi, field, onClose, ...drawerProps } = props;
  const drawerRef = useRef({});
  const data = field.getFieldValue(metaKey);

  const closeDrawer = () => {
    field.setFieldValue(metaKey, drawerRef.current);
    onClose();
  };

  return (
    <Drawer title="编辑" width="50vw" placement="right" {...drawerProps} onClose={closeDrawer} visible={!!metaKey}>
      <FormRender
        schema={{ ...schema, title: '' }}
        schemaUi={schemaUi}
        metaKey={[]}
        name="array-drawer"
        onMount={(f) => {
          f.setFieldsValue(data);
        }}
        onChange={(v, values) => {
          drawerRef.current = values;
          console.log('ArrayDrawerWidget..', v, values);
        }}
      />
    </Drawer>
  );
}

export default ArrayDrawerWidget;
