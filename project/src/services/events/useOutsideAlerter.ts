import { ReactNode, useEffect } from "react";

interface useOutsideAlerterProps {
  ref: any;
  setIsActive: React.Dispatch<React.SetStateAction<ReactNode | null | any>>;
}

function useOutsideAlerter(props: useOutsideAlerterProps) {
  const { ref, setIsActive } = props;

  useEffect(() => {
    function handleClickOutside(event: Event | any) {
      const isClickBlocked = Boolean(
        event.target.getAttribute("data-block-click")
      );
      const mustDisable =
        ref.current && !ref.current.contains(event.target) && !isClickBlocked;

      if (mustDisable) {
        setIsActive(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideAlerter;
