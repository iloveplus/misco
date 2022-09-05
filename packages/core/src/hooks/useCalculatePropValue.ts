import { IFormField } from 'typings';
import { useState, useMemo, useRef, useContext, useEffect } from 'react';
import { InternalNamePath } from 'antd/es/form/interface';
import { FieldContext } from 'rc-field-form';
import { HOOK_MARK } from 'rc-field-form/es/FieldContext';
import { calculateProps } from '../utils/calculatePropsValue';

type ICalculationProps = Record<string, any>;

// 实现逻辑参考Form.useWatch
function useCalculatePropValue(namePath: InternalNamePath, props: ICalculationProps = {}, form?: IFormField) {
  const [value, setValue] = useState<ICalculationProps>({});

  const valueStr = useMemo(() => JSON.stringify(value), [value]);
  const valueStrRef = useRef(valueStr);
  valueStrRef.current = valueStr;

  const formInstance = form || useContext(FieldContext);
  const isValidForm = formInstance && formInstance._init;

  useEffect(() => {
    // Skip if not exist form instance
    if (!isValidForm) {
      return;
    }

    const { getFieldsValue, getInternalHooks } = formInstance;
    const { registerWatch } = getInternalHooks(HOOK_MARK);

    const cancelRegister = registerWatch((store: any) => {
      const newValue = calculateProps(props, store, namePath);
      const nextValueStr = JSON.stringify(newValue);

      if (valueStrRef.current !== nextValueStr) {
        valueStrRef.current = nextValueStr;
        setValue(newValue);
      }
    });

    const initialValue = calculateProps(props, getFieldsValue(), namePath);
    setValue(initialValue);

    return cancelRegister;
  }, []);

  return value;
}

export default useCalculatePropValue;
