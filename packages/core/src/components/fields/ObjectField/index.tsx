import React from 'react';
import CollapseWidget from '../../widgets/CollapseWidget';
import { IObjectField } from 'typings';
import FieldRender from '..';

function ObjectField<DecoratorProps, ComponentProps>(props: IObjectField<DecoratorProps, ComponentProps>) {
  const { metaKey, namePath, required, properties = {}, decoratorProps = {}, ...res } = props;

  // console.log('ObjectField...', props);
  return (
    <CollapseWidget {...props}>
      {Object.entries(properties).map(([key, schema]) => {
        const _metaKey = Array.isArray(metaKey) ? [...metaKey, key] : [key];
        const _required = required instanceof Array ? required.includes(key) : required;
        return (
          <FieldRender
            key={key}
            metaKey={_metaKey}
            namePath={Array.isArray(namePath) ? [...namePath, key] : [key]}
            schema={{
              required: _required,
              ...schema,
              decoratorProps: {
                ...(schema.decoratorProps || {}),
                hidden: decoratorProps.hidden || schema.decoratorProps?.hidden,
              },
            }}
            {...res}
          />
        );
      })}
    </CollapseWidget>
  );
}

export default ObjectField;
