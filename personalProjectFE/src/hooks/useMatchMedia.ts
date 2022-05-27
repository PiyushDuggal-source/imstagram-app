import { useEffect, useRef, useState } from "react";

const useMatchMedia = (winWidth = 600): boolean => {
  const [toggleChange, setToggleChange] = useState<boolean>(false);
  const matchMediaRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    matchMediaRef.current = window.matchMedia(`(max-width: ${winWidth}px)`);

    const initialMatch: boolean = matchMediaRef.current.matches;

    if (initialMatch) {
      setToggleChange(true);
    } else {
      setToggleChange(false);
    }
    const test = (event: { matches: boolean }) => {
      if (event.matches) {
        setToggleChange(true);
      } else {
        setToggleChange(false);
      }
    };

    matchMediaRef.current?.addEventListener("change", test);

    return () => {
      matchMediaRef.current?.removeEventListener("change", test);
    };
  }, [winWidth]);

  return toggleChange;
};

export default useMatchMedia;
