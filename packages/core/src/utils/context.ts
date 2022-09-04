import { createContext, useContext } from 'react';

export const FormContext = createContext({});

export const useStore = () => {
  return useContext(FormContext);
};
