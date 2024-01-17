import Image from "next/image";

import { AiFillStar, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { BiListPlus, BiSolidImageAdd } from "react-icons/bi";
import { BsGlobe2 } from "react-icons/bs";
import { FaItalic, FaLock, FaRedo, FaUndo } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import {
  ImIndentDecrease,
  ImIndentIncrease,
  ImUnderline,
} from "react-icons/im";
import { IoLinkSharp } from "react-icons/io5";
import { LuPaintBucket } from "react-icons/lu";
import { MdOutlineInsertComment } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import { RxFontBold, RxText, RxTextNone } from "react-icons/rx";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useReducer, useState } from "react";

import { $isCodeNode, CODE_LANGUAGE_MAP } from "@lexical/code";
import { $isLinkNode } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { $getSelectionStyleValueForProperty } from "@lexical/selection";
import { $isTableNode } from "@lexical/table";
import { CustomDropDownIcons, ListOptions } from "../../models/ToolbarProps";
import {
  ToolbarDataActionKind,
  initialToolbarState,
  toolbarDataReducer,
} from "../../reducers/createAndEditAPost/toolbarDataReducer";
import {
  ToolbarDropdownValuesActionKind,
  initialDropdownValuesState,
  toolbarDropdownValuesReducer,
} from "../../reducers/createAndEditAPost/toolbarDropdownValuesReducer";
import styles from "../../styles/components/toolbars/lexical-toolbar.module.scss";
import {
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  LIST_OPTIONS,
  fontRefToFontInPixels,
} from "../../utils/components/toolbarDropdownsOptions";
import { CustomDropDown } from "../DropDowns/CustomSelector";

import { $isHeadingNode } from "@lexical/rich-text";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import { FontSizesOptions } from "../../models/ToolbarProps";
import { handleDefineFontFamily } from "../../utils/lexical/functions/handleDefineFontFamily";
import { handleDefineFontSize } from "../../utils/lexical/functions/handleDefineFontSize";
import { getSelectedNode } from "../../utils/lexical/getSelectedNode";
import { handleDefineList } from "../../utils/lexical/functions/handleDefineList";

interface LexicalToolbarProps {
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  isPublicPost: boolean;
  profileImageUrl: string | undefined | null;
}

interface HandleSelectDropdownProps {
  value: string;
  displayValue: string;
  editor: LexicalEditor;
  fontSize?: string;
}

export const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

const LexicalToolbar = (props: LexicalToolbarProps) => {
  const { isFavorite, setIsFavorite, isPublicPost, profileImageUrl } = props;

  const [toolbarState, dispatchToolbarState] = useReducer(
    toolbarDataReducer,
    initialToolbarState
  );

  const [dropdownValues, dispatchDropdownValues] = useReducer(
    toolbarDropdownValuesReducer,
    initialDropdownValuesState
  );

  const [toolbarActionType, setToolbarActionType] =
    useState<CustomDropDownIcons>();

  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      dispatchToolbarState({
        type: ToolbarDataActionKind.SET_ALL,
        bold: selection.hasFormat("bold"),
        italic: selection.hasFormat("italic"),
        underline: selection.hasFormat("underline"),
        strikeLine: selection.hasFormat("strikethrough"),
        subscript: selection.hasFormat("subscript"),
        superscript: selection.hasFormat("superscript"),
        code: selection.hasFormat("code"),
      });

      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        dispatchToolbarState({ type: ToolbarDataActionKind.LINK, link: true });
      } else {
        dispatchToolbarState({ type: ToolbarDataActionKind.LINK, link: false });
      }

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        dispatchToolbarState({
          type: ToolbarDataActionKind.ROOT_TYPE,
          rootType: "table",
        });
      } else {
        dispatchToolbarState({
          type: ToolbarDataActionKind.ROOT_TYPE,
          rootType: "root",
        });
      }

      if (element !== null) {
        dispatchToolbarState({
          type: ToolbarDataActionKind.ELEMENT_KEY,
          elementKey,
        });

        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListTYpe()
            : element.getListType();

          dispatchToolbarState({
            type: ToolbarDataActionKind.BLOCK_TYPE,
            blockType: type,
          });
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();

          if (type in blockTypeToBlockName) {
            dispatchToolbarState({
              type: ToolbarDataActionKind.BLOCK_TYPE,
              blockType: type as keyof typeof blockTypeToBlockName,
            });
          }
          if ($isCodeNode(element)) {
            const language =
              element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            dispatchToolbarState({
              type: ToolbarDataActionKind.CODE_LANGUAGE,
              codeLanguage: language
                ? CODE_LANGUAGE_MAP[language] || language
                : "",
            });
            return;
          }
        }
      }

      dispatchToolbarState({
        type: ToolbarDataActionKind.FONT_SIZE,
        fontSize: $getSelectionStyleValueForProperty(
          selection,
          "font-size",
          "15px"
        ),
      });
      dispatchToolbarState({
        type: ToolbarDataActionKind.FONT_COLOR,
        fontColor: $getSelectionStyleValueForProperty(
          selection,
          "color",
          "#1e272e"
        ),
      });
      dispatchToolbarState({
        type: ToolbarDataActionKind.FONT_FAMILY,
        fontFamily: $getSelectionStyleValueForProperty(
          selection,
          "font-family",
          "Arial"
        ),
      });
      dispatchToolbarState({
        type: ToolbarDataActionKind.BACKGROUND_COLOR,
        backgroundColor: $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          "#fff"
        ),
      });
    }
  }, [activeEditor]);

  const handleSetFontSize = (props: HandleSelectDropdownProps) => {
    const { displayValue, value } = props;

    handleDefineFontSize({
      editor,
      nodeModel: value as FontSizesOptions,
    });

    dispatchDropdownValues({
      type: ToolbarDropdownValuesActionKind.FONT_SIZE,
      fontSize: displayValue,
    });
  };

  const handleSetFontFamily = (props: HandleSelectDropdownProps) => {
    const { displayValue, value } = props;

    handleDefineFontFamily({ editor, fontFamily: displayValue });

    dispatchDropdownValues({
      type: ToolbarDropdownValuesActionKind.FONT_FAMILY,
      fontFamily: value,
    });
  };

  const handleSetList = (props: HandleSelectDropdownProps) => {
    const { displayValue, value } = props;

    handleDefineList({
      editor,
      listType: displayValue as ListOptions,
      toolbarState,
    });

    dispatchDropdownValues({
      type: ToolbarDropdownValuesActionKind.LIST,
      list: value,
    });
  };

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

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        dispatchToolbarState({
          type: ToolbarDataActionKind.EDITABLE,
          editable,
        });
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          dispatchToolbarState({
            type: ToolbarDataActionKind.UNDO,
            undo: payload,
          });
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          dispatchToolbarState({
            type: ToolbarDataActionKind.REDO,
            redo: payload,
          });
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [updateToolbar, activeEditor, editor]);

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
                <CustomDropDown.Root buttonLabel={dropdownValues.fontSize}>
                  {FONT_SIZE_OPTIONS.map(([displayName, fontSize]) => {
                    return (
                      <CustomDropDown.Option key={fontSize}>
                        <CustomDropDown.Text
                          text={displayName}
                          fontSize={fontSize}
                          value={fontRefToFontInPixels[fontSize]}
                          onClick={(props) =>
                            handleSetFontSize({
                              ...props,
                              value: props?.fontSize || "",
                              editor,
                            })
                          }
                        />
                      </CustomDropDown.Option>
                    );
                  })}
                </CustomDropDown.Root>
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.toolButtonDropDown}>
                <RxText className={styles.fontFamilyIcon} />
                <CustomDropDown.Root buttonLabel={dropdownValues.fontFamily}>
                  {/* Font family dropdown */}
                  {FONT_FAMILY_OPTIONS.map((fontFamily) => {
                    return (
                      <CustomDropDown.Option key={fontFamily}>
                        <CustomDropDown.Text
                          key={fontFamily}
                          text={fontFamily}
                          fontSize="normal"
                          value={fontFamily}
                          onClick={(props) =>
                            handleSetFontFamily({ ...props, editor })
                          }
                        />
                      </CustomDropDown.Option>
                    );
                  })}
                </CustomDropDown.Root>
              </button>
            </div>
            <div className={styles.toolGroup}>
              <button className={styles.fontSizeButton}>
                <RiSubtractFill className={styles.fontSizeButtonIcon} />
              </button>
              <input className={styles.fontSizeInput} type="number" min={1} />{" "}
              {/* Font size box */}
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
              <button className={styles.toolButtonDropDown}></button>
              <button className={styles.toolButton}>
                {/* List */}

                <CustomDropDown.Root hideArrow buttonIconLabel="check-list">
                  {LIST_OPTIONS.map(([displayName, listType]) => {
                    return (
                      <CustomDropDown.Option key={listType}>
                        <CustomDropDown.Icon icon={listType} />
                        <CustomDropDown.Text
                          key={listType}
                          text={displayName}
                          value={listType}
                          onClick={(props) =>
                            handleSetList({
                              ...props,
                              value: props?.fontSize || "",
                              editor,
                            })
                          }
                        />
                      </CustomDropDown.Option>
                    );
                  })}
                </CustomDropDown.Root>
              </button>
              <button className={styles.toolButtonDropDown}></button>
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
