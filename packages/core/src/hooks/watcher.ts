import { IFormField } from 'typings';
import { useEffect } from 'react';

type IWatcher = {
  field: IFormField;
  watchKey: string;
  watch: Record<string, any>;
};

const Watcher = ({ watchKey, watch, field }: IWatcher): any => {
  const namePath = typeof watchKey === 'string' ? watchKey.split('.') : watchKey;
  const value = field.watch(namePath);
  const watchObj = watch[watchKey];

  useEffect(() => {
    const runWatcher = () => {
      if (typeof watchObj === 'function') {
        try {
          watchObj(value, watchKey);
        } catch (error) {
          console.log(`${watchKey}对应的watch函数执行报错：`, error);
        }
      } else {
        console.warn('watch值必须为函数回调');
      }
    };

    runWatcher();
  }, [JSON.stringify(value)]);

  return null;
};

export default Watcher;
