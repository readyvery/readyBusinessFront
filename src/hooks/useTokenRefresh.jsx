import { useEffect } from 'react';

const useTokenRefresh = (callback, interval) => {
  useEffect(() => {
    const id = setInterval(callback, interval);
    return () => clearInterval(id);
  }, [callback, interval]);
};

export default useTokenRefresh;