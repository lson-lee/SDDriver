import { useState } from 'react';
export const useGlobalAlert = () => {
  const [alertConfig, setAlertConfigState] = useState({
    open: false
  });

  const setAlertConfig = (config) => {
    setAlertConfigState({
      ...config,
    })
  }

  return {
    alertConfig, setAlertConfig
  }
};
