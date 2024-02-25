import { useEffect, useState } from 'react';

function useWindowEvents() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('focus', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focus', handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowEvents;
