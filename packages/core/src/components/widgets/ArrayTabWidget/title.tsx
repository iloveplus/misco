import React from 'react';
import { IFormField } from 'typings';

type ITabTitle = {
  field: IFormField;
  metaKey: Array<string | number>;
  titleType?: string;
  defaultTitle: string;
};

const TabTitle = ({ field, metaKey, titleType, defaultTitle }: ITabTitle) => {
  const item = field.watch(metaKey);
  return <span>{item?.[titleType] || defaultTitle}</span>;
};

export default TabTitle;
