import React from 'react';
import { Button, ConfigProvider } from 'antd';
import { IArrayField } from 'typings';
import FieldRender from '../../fields';
import './index.less';
import { ArrowDownOutlined, ArrowUpOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import CollapseWidget from '../CollapseWidget';

const { ConfigContext } = ConfigProvider;

function ArrayCardWidget<DecoratorProps, ComponentProps>(props: IArrayField<DecoratorProps, ComponentProps>) {
  const {
    dataSource,
    items,
    field,
    layout,
    disabled,
    onAdd,
    onRemove,
    onCopy,
    onDown,
    onUp,
    props: compProps = {},
  } = props;
  const context = React.useContext(ConfigContext);
  const cssPrefix = context.getPrefixCls('array-card');
  // console.log(props, context, '=====>>');

  return (
    <CollapseWidget {...props} className={`${cssPrefix}-list`}>
      {dataSource.map((item, index) => {
        return (
          <div key={item.key} className={`${cssPrefix}-item`}>
            <div className={`${cssPrefix}-header`}>
              <div className={`${cssPrefix}-tag`}>{index + 1}</div>
              <div className={`${cssPrefix}-op-list`}>
                {[
                  compProps.copy && (
                    <Button
                      type="text"
                      key="copy"
                      disabled={disabled}
                      onClick={() => onCopy(index)}
                      icon={<CopyOutlined />}
                    />
                  ),
                  compProps.sort && (
                    <Button
                      type="text"
                      key="up"
                      disabled={disabled || index === 0}
                      onClick={() => onUp(index)}
                      icon={<ArrowUpOutlined />}
                    />
                  ),
                  compProps.sort && (
                    <Button
                      type="text"
                      key="down"
                      disabled={disabled || index === dataSource.length - 1}
                      onClick={() => onDown(index)}
                      icon={<ArrowDownOutlined />}
                    />
                  ),
                  compProps.remove && (
                    <Button
                      type="text"
                      key="remove"
                      disabled={disabled}
                      onClick={() => onRemove(index)}
                      icon={<DeleteOutlined />}
                    />
                  ),
                ].filter(Boolean)}
              </div>
            </div>

            <div className={`${cssPrefix}-body`}>
              <FieldRender schema={items} field={field} metaKey={[item.name]} layout={layout} disabled={disabled} />
            </div>
          </div>
        );
      })}

      {compProps.add && (
        <Button key="add" onClick={onAdd}>
          {compProps.addBtnText || '新增一条'}
        </Button>
      )}
    </CollapseWidget>
  );
}

export default ArrayCardWidget;
