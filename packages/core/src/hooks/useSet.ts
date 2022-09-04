import { useReducer } from 'react';

const useSet = (initState: any) => {
  const [state, setState] = useReducer((state: any, newState: any) => {
    let action = newState;
    if (typeof newState === 'function') {
      action = action(state);
    }
    if (newState.action && newState.payload) {
      action = newState.payload;
      if (typeof action === 'function') {
        action = action(state);
      }
    }
    const result = { ...state, ...action };

    return result;
  }, initState);
  return [state, setState];
};

export default useSet;
