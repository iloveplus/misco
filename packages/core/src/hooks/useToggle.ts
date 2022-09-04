import { useState } from 'react';

const useToggle = (initVisible = false) => {
  const [visible, setVisible] = useState(initVisible);
  const toggle = () => setVisible(!visible);
  return [visible, toggle];
};

export default useToggle;
