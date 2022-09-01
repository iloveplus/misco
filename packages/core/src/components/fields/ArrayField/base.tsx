import React, { isValidElement, useEffect } from 'react';
import { IArrayField } from 'typings';
import ArrayCardWidget from '../../widgets/ArrayCardWidget';
import ArrayTabWidget from '../../widgets/ArrayTabWidget';
import ArrayTableWidget from '../../widgets/ArrayTableWidget';
import ArrayLineWidget from '../../widgets/ArrayLineWidget';

export enum ArrayMode {
  Card = 'card',
  Tab = 'tab',
  Table = 'table',
  Drawer = 'drawer',
  Line = 'line',
}

function ArrayBaseWidget<DecoratorProps, ComponentProps>(props: IArrayField<DecoratorProps, ComponentProps>) {
  const { dataSource, min, onAdd, schemaUi, widget, props: compProps = {} } = props;

  useEffect(() => {
    if (!dataSource.length && min > 0) {
      [...new Array(min)].forEach(() => onAdd());
    }
  }, [min]);

  // 处理自定义数组组件
  const CustomArrayWidget: any = schemaUi?.[widget];
  if (CustomArrayWidget) {
    if (typeof CustomArrayWidget === 'function') {
      return CustomArrayWidget(props);
    }

    if (isValidElement(CustomArrayWidget)) {
      return React.cloneElement(CustomArrayWidget, props);
    }
  }

  switch (compProps.mode) {
    case ArrayMode.Tab: {
      return <ArrayTabWidget {...props} />;
    }
    case ArrayMode.Table: {
      return <ArrayTableWidget {...props} />;
    }
    case ArrayMode.Drawer: {
      return <ArrayTableWidget {...props} />;
    }
    case ArrayMode.Card: {
      return <ArrayCardWidget {...props} />;
    }
    case ArrayMode.Line: {
      return <ArrayLineWidget {...props} />;
    }
    default: {
      return <ArrayCardWidget {...props} />;
    }
  }
}

export default ArrayBaseWidget;
