import { useEffect, useRef } from "react";

export function usePolling(callback, delay) {
  const callBackRef = useRef();

  //Remember the last callback function
  useEffect(() => {
    callBackRef.current = callback;
  }, [callback]);

  // setup the interval
  useEffect(() => {
    function tick() {
      callBackRef.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
}
