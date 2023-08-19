import {
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import styles from "../../../styles/components/selectors/custom-selector.module.scss";
import { AiFillCaretDown } from "react-icons/ai";

interface CustomDropDownRootProps {
  children: ReactNode;
  buttonLabel?: string;
  stopCloseOnClickSelf?: boolean;
}

interface DropDownContextType {
  registerItem: (ref: RefObject<HTMLButtonElement>) => void;
}

const DropDownContext = createContext<DropDownContextType | null>(null);

const dropDownPadding = 4;

const CustomDropDownRoot = (props: CustomDropDownRootProps) => {
  const { children, buttonLabel, stopCloseOnClickSelf } = props;

  const [dropDownItems, setDropDownItems] =
    useState<RefObject<HTMLButtonElement>[]>();

  const [highlightedItem, setHighlightedItem] =
    useState<RefObject<HTMLButtonElement>>();

  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const registerItem = useCallback((itemRef: RefObject<HTMLButtonElement>) => {
    setDropDownItems((prev) => (prev ? [...prev, itemRef] : [itemRef]));
  }, []);

  const contextValue = useMemo(() => ({ registerItem }), [registerItem]);

  const handleKeyDown = () => (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!dropDownItems) return;

    const key = event.key;

    if (["Escape", "ArrowUp", "ArrowDown", "Tab"].includes(key)) {
      event.preventDefault();
    }

    if (key === "Escape" || key === "Tab") {
      handleClose();
    } else if (key === "ArrowUp") {
      setHighlightedItem((prev) => {
        if (!prev) return dropDownItems[0];
        const index = dropDownItems.indexOf(prev) - 1;
        return dropDownItems[index === -1 ? dropDownItems.length - 1 : index];
      });
    } else if (key === "ArrowDown") {
      setHighlightedItem((prev) => {
        if (!prev) return dropDownItems[0];
        return dropDownItems[dropDownItems.indexOf(prev) + 1];
      });
    }
  };

  const handleClose = () => {
    setShowDropDown(false);
    if (buttonRef && buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  useEffect(() => {
    if (dropDownItems && !highlightedItem) {
      setHighlightedItem(dropDownItems[0]);
    }

    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current?.focus();
    }
  }, [dropDownItems, highlightedItem]);

  useEffect(() => {
    const button = buttonRef.current;
    const dropDown = dropDownRef.current;
    console.log("buttonRef", buttonRef.current?.offsetHeight);

    if (showDropDown && button !== null && dropDown !== null) {
      const { left } = button.getBoundingClientRect();
      console.log("left", left);
      console.log("dropDown.offsetWidth", dropDown.offsetWidth);
      console.log(
        "window.innerWidth - dropDown.offsetWidth - 20",
        window.innerWidth - dropDown.offsetWidth - 20
      );

      dropDown.style.top = `${button.offsetHeight + dropDownPadding}px`;
      dropDown.style.left = `-${Math.max(
        left / 2,
        dropDown.offsetWidth * 0.7
      )}px`;
    }
  }, [dropDownRef, buttonRef, showDropDown]);

  useEffect(() => {
    const button = buttonRef.current;

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target;
        if (stopCloseOnClickSelf) {
          if (
            dropDownRef.current &&
            dropDownRef.current.contains(target as Node)
          )
            return;
        }
        if (!button.contains(target as Node)) {
          setShowDropDown(false);
        }
      };
      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        className={styles.selectorButton}
      >
        {buttonLabel && (
          <span className={styles.buttonLabel}>{buttonLabel}</span>
        )}
        <AiFillCaretDown
          className={`${styles.arrow} ${showDropDown && styles.active}`}
        />
      </button>
      {showDropDown && (
        <div className={styles.container}>
          <DropDownContext.Provider value={contextValue}>
            <div
              className={styles.itemsWrapper}
              ref={dropDownRef}
              onKeyDown={handleKeyDown}
            >
              {children}
            </div>
          </DropDownContext.Provider>
        </div>
      )}
    </>
  );
};

export { CustomDropDownRoot, DropDownContext };
