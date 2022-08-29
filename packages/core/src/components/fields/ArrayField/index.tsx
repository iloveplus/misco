import React from 'react';
import { Form } from 'antd';
import { IArrayField } from 'typings';
import ArrayBaseWidget from './base';

function ArrayField<DecoratorProps, ComponentProps>(props: IArrayField<DecoratorProps, ComponentProps>) {
  const { metaKey, props: _compProps = {} } = props;
  // console.log(props, '=====array====');
  const min = _compProps.min;
  const max = _compProps.max;

  const compProps = {
    add: true,
    remove: true,
    sort: true,
    copy: true,
    ..._compProps,
  };

  const arrayProps = {
    ...props,
    props: compProps,
  };

  return (
    <Form.List
      name={metaKey as any}
      rules={[
        {
          validator: async (_, names) => {
            if (min && (!names || names.length < min)) {
              return Promise.reject(new Error(`数组至少保留${min}项`));
            } else if (max && (!names || names.length > max)) {
              return Promise.reject(new Error(`数组最多保留${max}项`));
            } else {
              return Promise.resolve();
            }
          },
        },
      ]}
    >
      {(fields, { add, remove, move }, { errors }) => (
        <>
          <ArrayBaseWidget
            dataSource={fields}
            {...arrayProps}
            onAdd={() => add()}
            onCopy={(index: number) => add({}, index)}
            onRemove={(index: number) => {
              remove(fields[index].name);
            }}
            onUp={(index: number) => {
              move(index, index - 1);
            }}
            onDown={(index: number) => {
              move(index, index + 1);
            }}
          />
          {errors.length > 0 && (
            <Form.Item>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          )}
        </>
      )}
    </Form.List>
  );
}

export default ArrayField;
