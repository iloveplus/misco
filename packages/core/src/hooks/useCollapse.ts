import { ICollapse } from './../../typings.d';
import { useState } from 'react';
import { getParentPath, isUndefined } from '../utils';

const useCollapse = (options: any): ICollapse => {
  const { defaultExpandAll, expandExclusion, defaultOpenKeys = {} } = options || {};
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

  const getOpenKey = (name: string) => {
    if (defaultExpandAll && isUndefined(openKeys[name])) {
      return true;
    }

    return openKeys[name];
  };

  const setOpenKey = (name: string, value: boolean) => {
    let sameLevelObj = {};

    if (expandExclusion) {
      const prefix = getParentPath(name);

      sameLevelObj = Object.keys(openKeys)
        .filter((key) => getParentPath(key) === prefix)
        .reduce((res: any, cur: string) => {
          res[cur] = false;
          return res;
        }, {});
    }

    setOpenKeys({
      ...openKeys,
      ...sameLevelObj,
      [name]: value,
    });
  };

  return { getOpenKey, setOpenKey };
};

export default useCollapse;
