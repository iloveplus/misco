import React, { useState } from 'react';
import { Button, Tabs, ConfigProvider } from 'antd';
import { IArrayField } from 'typings';
import FieldRender from '../../fields';
import './index.less';
import { PlusOutlined } from '@ant-design/icons';
import CollapseWidget from '../CollapseWidget';
import TabTitle from './title';

const { TabPane } = Tabs;

const { ConfigContext } = ConfigProvider;

function ArrayTabWidget<DecoratorProps, ComponentProps>(props: IArrayField<DecoratorProps, ComponentProps>) {
  const {
    dataSource,
    metaKey,
    isPreview,
    schemaUi,
    title,
    items,
    field,
    layout,
    disabled,
    onAdd,
    onRemove,
    min,
    max,
    props: compProps = {},
  } = props;
  const [activeKey, setActiveKey] = useState(0);
  const context = React.useContext(ConfigContext);
  const cssPrefix = context.getPrefixCls('array-tab');
  const { titleType, remove: closable, ...tabCompProps } = compProps;

  const onChange = (key: number) => {
    setActiveKey(+key);
  };

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    const len = dataSource.length;
    if (action === 'add') {
      onAdd();

      if (!max || len < max) {
        setTimeout(() => {
          onChange(len);
        }, 0);
      }
    } else {
      const key = +targetKey;
      onRemove(key);

      if (key <= activeKey && (!min || len > min)) {
        onChange(activeKey - 1);
      }
    }
  };

  return (
    <CollapseWidget {...props} className={`${cssPrefix}-list`}>
      <Tabs
        {...tabCompProps}
        type="editable-card"
        hideAdd
        onEdit={onEdit}
        activeKey={activeKey.toString()}
        onChange={onChange}
        tabBarExtraContent={
          <Button onClick={() => onEdit('', 'add')}>
            <PlusOutlined />
            {compProps.addBtnText || '新增一条'}
          </Button>
        }
      >
        {dataSource.map((item, index: number) => {
          return (
            <TabPane
              tab={
                <TabTitle
                  field={field}
                  metaKey={[...metaKey, item.name]}
                  titleType={titleType}
                  defaultTitle={`${title}${index + 1}`}
                />
              }
              key={index}
              closable={closable}
            >
              <FieldRender
                schema={items}
                schemaUi={schemaUi}
                field={field}
                isPreview={isPreview}
                metaKey={[item.name]}
                layout={layout}
                disabled={disabled}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </CollapseWidget>
  );
}

export default ArrayTabWidget;
