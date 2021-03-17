import { useState, useCallback } from 'react';

const useToggle = (initValue = false) => {
  const [toggle, setToggle] = useState(initValue);

  const onToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  return [toggle, onToggle];
};

export default useToggle;
