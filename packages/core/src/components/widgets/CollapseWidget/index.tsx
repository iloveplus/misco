import React from 'react';
import { IObjectField } from 'typings';
import { Collapse, Space } from 'antd';
import { toNamePathStr } from '../../../utils';

const { Panel } = Collapse;

function CollapseWidget<DecoratorProps, ComponentProps>(props: Partial<IObjectField<DecoratorProps, ComponentProps>>) {
  const { metaKey, title, field, children } = props;

  if (!title) return <React.Fragment>{children}</React.Fragment>;

  const isFold = field.getOpenKey(metaKey);

  return (
    <Collapse collapsible="header" style={{ marginBottom: 10 }} defaultActiveKey={['1']} onChange={console.log}>
      <Panel header={<div>{title}</div>} key={toNamePathStr(metaKey)}>
        {children}
      </Panel>
    </Collapse>
  );
}

export default CollapseWidget;
