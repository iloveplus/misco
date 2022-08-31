import React, { useMemo } from 'react';
import { Form, message } from 'antd';
import { IArrayField } from 'typings';
import ArrayBaseWidget from './base';

export const ArrayAction = {
  Add: 'add',
  Remove: 'remove',
  Up: 'up',
  Down: 'down',
  Copy: 'copy',
};

function ArrayField<DecoratorProps, ComponentProps>(props: IArrayField<DecoratorProps, ComponentProps>) {
  const { metaKey, isPreview, minItems = 1, maxItems, props: _compProps = {} } = props;
  const min = _compProps.min || minItems;
  const max = _compProps.max || maxItems;

  const actionProps = useMemo(() => {
    return ['add', 'remove', 'sort', 'copy'].reduce((actions, key) => {
      actions[key] = isPreview ? false : key in _compProps ? _compProps[key] : true;
      return actions;
    }, _compProps);
  }, [isPreview]);

  const onArrayChange = (action: string, index: number) => {
    console.log('onArrayChange...', action, index);
  };

  console.log(actionProps, '=====array====');

  return (
    <Form.List
      name={metaKey}
      rules={[
        {
          validator: async (_, names) => {
            if (min && (!names || names.length < min)) {
              return Promise.reject(new Error(`列表项至少保留${min}项`));
            } else if (max && (!names || names.length > max)) {
              return Promise.reject(new Error(`列表项最多保留${max}项`));
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
            {...props}
            props={actionProps}
            dataSource={fields}
            onAdd={() => {
              const len = fields.length;
              if (max && len >= max) {
                message.error(`列表项最多保留${max}项`);
                return;
              }

              add();
              onArrayChange(ArrayAction.Add, len);
            }}
            onCopy={(index: number) => {
              const len = fields.length;
              if (max && len >= max) {
                message.error(`列表项最多保留${max}项`);
                return;
              }

              add(undefined, index);
              onArrayChange(ArrayAction.Copy, index + 1);
            }}
            onRemove={(index: number) => {
              const len = fields.length;
              if (min && len <= min) {
                message.error(`列表项至少保留${min}项`);
                return;
              }

              remove(fields[index].name);
              onArrayChange(ArrayAction.Remove, index);
            }}
            onUp={(index: number) => {
              move(index, index - 1);
              onArrayChange(ArrayAction.Up, index - 1);
            }}
            onDown={(index: number) => {
              move(index, index + 1);
              onArrayChange(ArrayAction.Down, index + 1);
            }}
            min={min}
            max={max}
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
