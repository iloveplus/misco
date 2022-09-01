import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

type ITitle = {
  required?: any;
  title: string;
  description?: string;
  prefixCls: string;
};

const Title = ({ title, required, description, prefixCls }: ITitle) => {
  return (
    <div className={`${prefixCls}-title`}>
      {required && <span>*</span>}
      {title}
      {Boolean(description) && (
        <Tooltip placement="top" title={description}>
          <QuestionCircleOutlined style={{ marginLeft: 4, color: 'rgba(0, 0, 0, 0.7)' }} />
        </Tooltip>
      )}
    </div>
  );
};

export default Title;
