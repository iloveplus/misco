import React from 'react';
import { IObjectField } from 'typings';
import { Collapse } from 'antd';
import { toNamePathStr } from '../../../utils';
import { RightOutlined } from '@ant-design/icons';
import collapseMotion from 'antd/es/_util/motion';
import { ConfigContext } from 'antd/lib/config-provider';
import Title from './title';
import './index.less';

const { Panel } = Collapse;

function CollapseWidget<DecoratorProps, ComponentProps>(props: Partial<IObjectField<DecoratorProps, ComponentProps>>) {
  const { required, metaKey, title, description, field, children, className = '', props: compProps = {} } = props;
  const context = React.useContext(ConfigContext);
  const prefixCls = context.getPrefixCls('collapse');

  if (!title) return <React.Fragment>{children}</React.Fragment>;

  const canFold = compProps.canFold;
  if (!canFold) {
    return (
      <div className={`${prefixCls}-unfold ${className}`}>
        <Title title={title} description={description} prefixCls={prefixCls} required={required} />
        <div>{children}</div>
      </div>
    );
  }

  const panelKey = toNamePathStr(metaKey);
  const isFold = field.getOpenKey(panelKey);

  const renderExpandIcon = (panelProps: any = {}) => {
    return <RightOutlined className={`${prefixCls}-arrow`} rotate={panelProps.isActive ? 90 : undefined} />;
  };

  const panelProps: any = {
    panelKey,
    header: <div>{title}</div>,
    isActive: isFold,
    prefixCls,
    destroyInactivePanel: true,
    openMotion: {
      ...collapseMotion,
      motionAppear: false,
      leavedClassName: `${prefixCls}-content-hidden`,
    },
    onItemClick: () => field.setOpenKey(panelKey, !isFold),
    expandIcon: renderExpandIcon,
    // collapsible: 'header', //'disabled',
  };

  return (
    <div className={`${prefixCls} ${className} ${prefixCls}-icon-position-start"`} style={{ marginBottom: 10 }}>
      <Panel {...panelProps}>{children}</Panel>
    </div>
  );
}

export default CollapseWidget;
