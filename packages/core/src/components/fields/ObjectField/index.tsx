import React from 'react';
import { IObjectField } from 'typings';
import FieldRender from '..';

function ObjectField<DecoratorProps, ComponentProps>(
  props: IObjectField<DecoratorProps, ComponentProps>,
): React.FC {
  const { metaKey, required, properties = {}, decoratorProps = {}, ...res } = props;

  console.log('ObjectField...', props);
  return (
    <div>
      {Object.entries(properties).map(([key, schema]) => {
        const _metaKey = metaKey?.length ? [...metaKey, key] : [key];
        const _required = required instanceof Array ? required.includes(key) : required;
        return (
          <FieldRender
            key={key}
            metaKey={_metaKey}
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
    </div>
  );
}

export default ObjectField;
