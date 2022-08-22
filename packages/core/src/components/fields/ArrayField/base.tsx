import React, { useEffect } from 'react';
import { IArrayField } from 'typings';
import ArrayCardWidget from '../../widgets/ArrayCardWidget';

function ArrayBaseWidget<DecoratorProps, ComponentProps>(props: IArrayField<DecoratorProps, ComponentProps>) {
  const { onAdd, props: compProps = {} } = props;
  const { min } = compProps;

  useEffect(() => {
    if (min > 0 || min === undefined) {
      [...new Array(min || 1)].forEach(() => onAdd());
    }
  }, [min]);

  return <ArrayCardWidget {...props} />;
}

export default ArrayBaseWidget;
