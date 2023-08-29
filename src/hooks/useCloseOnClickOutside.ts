import React from "react";

const useCloseOnClickOutside = <E extends HTMLElement | null, T extends HTMLElement | null>(
  elementToCloseRef: React.MutableRefObject<E>,
  handler: (e?: Event) => unknown,
  triggerElementRef?: React.MutableRefObject<T>,
) => {
  React.useEffect(() => {
    const listener = (e: Event) => {
      const isClickedInsideElementToClose =
        elementToCloseRef.current && elementToCloseRef.current.contains(e.target as Node);
      const isClickedInsideTrigger =
        triggerElementRef &&
        triggerElementRef.current &&
        triggerElementRef.current.contains(e.target as Node);
      if (isClickedInsideElementToClose || isClickedInsideTrigger) {
        return;
      }
      handler(e);
    };

    window.addEventListener("mousedown", listener);
    window.addEventListener("touchstart", listener);

    return () => {
      window.removeEventListener("mousedown", listener);
      window.removeEventListener("touchstart", listener);
    };
  }, []);
};

export default useCloseOnClickOutside;
