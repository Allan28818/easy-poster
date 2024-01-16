import {
  CSSProperties,
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "../../../styles/components/selectors/custom-selector.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { CustomDropDownIcons } from "../../../models/ToolbarProps";
import { CustomDropDown } from ".";

interface CustomDropDownRootProps {
  children: ReactNode;
  buttonLabel?: string;
  buttonIconLabel?: CustomDropDownIcons;
  stopCloseOnClickSelf?: boolean;
  additionalLabelStyles?: CSSProperties;
  additionalDropdownStyles?: CSSProperties;
}

interface DropDownContextType {
  registerItem: (ref: RefObject<HTMLButtonElement>) => void;
}

const DropDownContext = createContext<DropDownContextType | null>(null);

const dropDownPadding = 4;

const CustomDropDownRoot = (props: CustomDropDownRootProps) => {
  const {
    children,
    buttonLabel,
    buttonIconLabel,
    stopCloseOnClickSelf,
    additionalLabelStyles,
    additionalDropdownStyles,
  } = props;

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

    if (showDropDown && button !== null && dropDown !== null) {
      dropDown.style.top = `${button.offsetHeight + dropDownPadding}px`;
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
        style={additionalLabelStyles}
      >
        {buttonIconLabel && (
          <CustomDropDown.Icon
            icon={buttonIconLabel}
            additionalStyles={{ fontSize: "19px" }}
          />
        )}

        {buttonLabel && (
          <span className={styles.buttonLabel}>{buttonLabel}</span>
        )}
        <AiFillCaretDown
          className={`${styles.arrow} ${showDropDown && styles.active}`}
        />
      </button>
      {showDropDown && (
        <div className={styles.container} style={additionalDropdownStyles}>
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
