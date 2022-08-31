import React from 'react';
import { IObjectField } from 'typings';
import { Collapse } from 'antd';
import { toNamePathStr } from '../../../utils';
import './index.less';
import { RightOutlined } from '@ant-design/icons';
import collapseMotion from 'antd/es/_util/motion';

const { Panel } = Collapse;

function CollapseWidget<DecoratorProps, ComponentProps>(props: Partial<IObjectField<DecoratorProps, ComponentProps>>) {
  const { metaKey, title, field, children } = props;

  if (!title) return <React.Fragment>{children}</React.Fragment>;

  const panelKey = toNamePathStr(metaKey);
  const isFold = field.getOpenKey(panelKey);
  const prefixCls = 'ant-collapse';

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
    <div className={`${prefixCls} ${prefixCls}-icon-position-start"`} style={{ marginBottom: 10 }}>
      <Panel {...panelProps}>{children}</Panel>
    </div>
  );
}

export default CollapseWidget;
