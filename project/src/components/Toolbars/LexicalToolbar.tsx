import Image from "next/image";

import { AiFillStar, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { BiListPlus, BiSolidImageAdd } from "react-icons/bi";
import { BsGlobe2, BsListUl } from "react-icons/bs";
import { FaItalic, FaLock, FaRedo, FaUndo } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { GrTextAlignCenter, GrTextAlignFull } from "react-icons/gr";
import {
  ImIndentDecrease,
  ImIndentIncrease,
  ImUnderline,
} from "react-icons/im";
import { IoLinkSharp } from "react-icons/io5";
import { LuPaintBucket } from "react-icons/lu";
import { MdOutlineInsertComment } from "react-icons/md";
import { PiListChecksBold } from "react-icons/pi";
import { RiSubtractFill } from "react-icons/ri";
import { RxFontBold, RxText, RxTextNone } from "react-icons/rx";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useReducer, useState } from "react";
import {
  $getSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

import styles from "../../styles/components/toolbars/lexical-toolbar.module.scss";
import {
  initialToolbarState,
  toolbarDataReducer,
} from "../../reducers/createAndEditAPost/toolbarDataReducer";
import { CustomDropDown } from "../DropDowns/CustomSelector";
import { CustomDropDownIcons } from "../../models/components/DropDowns/CustomDropDown";

interface LexicalToolbarProps {
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  isPublicPost: boolean;
  profileImageUrl: string | undefined | null;
}

const LexicalToolbar = (props: LexicalToolbarProps) => {
  const { isFavorite, setIsFavorite, isPublicPost, profileImageUrl } = props;

  const [toolbarState, dispatchToolbarState] = useReducer(
    toolbarDataReducer,
    initialToolbarState
  );

  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  return (
    <header className={styles.toolbar}>
      <div className={styles.imageContainer}>
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/easy-poster-d747a.appspot.com/o/website-images%2Ficon-512x512.png?alt=media&token=94ccb26f-56f8-4ba5-8e2a-a63a681c6ec7"
          }
          alt={"Easy Poster"}
          width={70}
          height={70}
          className={styles.logoImage}
        />
      </div>
      <div className={styles.toolsContainer}>
        <div className={styles.topInfo}>
          <div className={styles.secondaryTools}>
            <div className={styles.postNameContainer}>
              <input
                className={styles.postNameInput}
                type="text"
                placeholder="Type your post name..."
              />
              <button
                className={styles.starPostButton}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? (
                  <AiFillStar className={styles.starIcon} />
                ) : (
                  <AiOutlineStar className={styles.starIcon} />
                )}
              </button>
            </div>
            <div className={styles.secondaryToolsWrapper}>
              <button className={styles.secondaryToolButton}>File</button>
              <button className={styles.secondaryToolButton}>Insert</button>
              <button className={styles.secondaryToolButton}>Tools</button>
              <button className={styles.secondaryToolButton}>Format</button>
            </div>
          </div>
          <div className={styles.publishWrapper}>
            <button className={styles.publishButton}>
              {isPublicPost ? (
                <BsGlobe2 className={styles.publishButtonIcon} />
              ) : (
                <FaLock className={styles.publishButtonIcon} />
              )}
              <p className={styles.publishButtonText}>Publish</p>
            </button>
            {!!profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt={"Profile Image"}
                width={46}
                height={46}
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.profileImagePlaceholder}>
                <FiUser className={styles.userIcon} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.bottomInfo}>
          <div className={styles.primaryTools}>
            <div className={styles.toolGroup}>
              <button className={styles.toolButton}>
                <FaUndo className={styles.historyButtons} />
              </button>
              <button className={styles.toolButton}>
                <FaRedo className={styles.historyButtons} />
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.toolButtonDropDown}>
                <BiListPlus className={styles.fontSizeIcon} />
                <CustomDropDown.Root buttonLabel="Normal">
                  <CustomDropDown.Option>
                    <CustomDropDown.Text text="Normal" fontSize="normal" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Text text="Title" fontSize="title" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Text text="Subtitle" fontSize="subtitle" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Text text="Title 1" fontSize="title-1" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Text text="Title 2" fontSize="title-2" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Text text="Title 3" fontSize="title-3" />
                  </CustomDropDown.Option>
                </CustomDropDown.Root>
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.toolButtonDropDown}>
                <RxText className={styles.fontFamilyIcon} />
                <CustomDropDown.Root buttonLabel="Aria Label">
                  <CustomDropDown.Option>
                    <CustomDropDown.Text text="Aria Label" fontSize="normal" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Text text="Aria Label" fontSize="normal" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Text text="Aria Label" fontSize="normal" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Text text="Aria Label" fontSize="normal" />
                  </CustomDropDown.Option>
                </CustomDropDown.Root>
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.fontSizeButton}>
                <RiSubtractFill className={styles.fontSizeButtonIcon} />
              </button>
              <input className={styles.fontSizeInput} type="number" min={1} />
              <button className={styles.fontSizeButton}>
                <AiOutlinePlus className={styles.fontSizeButtonIcon} />
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.toolButton}>
                <RxFontBold className={styles.boldIcon} />
              </button>
              <button className={styles.toolButton}>
                <FaItalic className={styles.italicIcon} />
              </button>
              <button className={styles.toolButton}>
                <ImUnderline className={styles.underlineIcon} />
              </button>
              <button className={styles.colorToolButton}>
                <p className={styles.textColorTool}>A</p>
                <div className={styles.textColorIndicator} />
              </button>
              <button className={styles.colorToolButton}>
                <LuPaintBucket className={styles.inkBucket} />
                <div className={styles.textColorIndicator} />
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.toolButton}>
                <IoLinkSharp className={styles.linkIcon} />
              </button>
              <button className={styles.toolButton}>
                <BiSolidImageAdd className={styles.imageIcon} />
              </button>
              <button className={styles.toolButton}>
                <MdOutlineInsertComment className={styles.commentIcon} />
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.toolButtonDropDown}>
                <CustomDropDown.Root
                  buttonIconLabel={CustomDropDownIcons.LEFT_ALIGN}
                  additionalLabelStyles={{ width: "50px" }}
                  additionalDropdownStyles={{ left: "-100%" }}
                >
                  <CustomDropDown.Option>
                    <CustomDropDown.Icon
                      icon={CustomDropDownIcons.LEFT_ALIGN}
                    />
                    <CustomDropDown.Text text="Left Align" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Icon
                      icon={CustomDropDownIcons.CENTER_ALIGN}
                    />
                    <CustomDropDown.Text text="Center Align" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Icon
                      icon={CustomDropDownIcons.RIGHT_ALIGN}
                    />
                    <CustomDropDown.Text text="Right Align" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Icon
                      icon={CustomDropDownIcons.JUSTIFY_ALIGN}
                    />
                    <CustomDropDown.Text text="Justify Align" />
                  </CustomDropDown.Option>
                </CustomDropDown.Root>
              </button>
              <button className={styles.toolButton}>
                <PiListChecksBold className={styles.checkListIcon} />
              </button>
              <button className={styles.toolButtonDropDown}>
                <CustomDropDown.Root
                  buttonIconLabel={CustomDropDownIcons.BULLET_LIST}
                  additionalLabelStyles={{ width: "50px" }}
                  additionalDropdownStyles={{ left: "-100%" }}
                >
                  <CustomDropDown.Option>
                    <CustomDropDown.Icon
                      icon={CustomDropDownIcons.BULLET_LIST}
                    />
                    <CustomDropDown.Text text="Bullet List" />
                  </CustomDropDown.Option>
                  <CustomDropDown.Option>
                    <CustomDropDown.Icon
                      icon={CustomDropDownIcons.NUMBERED_LIST}
                    />
                    <CustomDropDown.Text text="Numbered List" />
                  </CustomDropDown.Option>
                </CustomDropDown.Root>
              </button>
              <button className={styles.toolButton}>
                <ImIndentDecrease className={styles.indentIcon} />
              </button>
              <button className={styles.toolButton}>
                <ImIndentIncrease className={styles.indentIcon} />
              </button>
              <button className={styles.toolButton}>
                <RxTextNone className={styles.clearTextIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { LexicalToolbar };
