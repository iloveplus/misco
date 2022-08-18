import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { IArrayField, IField } from 'typings';
import ArrayCardWidget from '../../widgets/ArrayCardWidget';

function ArrayField<DecoratorProps, ComponentProps>(props: IArrayField<DecoratorProps, ComponentProps>) {
  const { metaKey, props: _compProps = {} } = props;
  // console.log(props, '=====array====');

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
      // rules={[
      //   {
      //     validator: async (_, names) => {
      //       if (!names || names.length < 2) {
      //         return Promise.reject(new Error('At least 2 passengers'));
      //       } else {
      //         console.log(names);
      //       }
      //     },
      //   },
      // ]}
    >
      {(fields, { add, remove, move }, { errors }) => (
        <>
          <ArrayCardWidget
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
          <Form.Item>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

export default ArrayField;
