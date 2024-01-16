import { FontSizesOptions, ListOptions } from "../../models/ToolbarProps";

type fontRefToFontInPixelsProps = {
  [key in FontSizesOptions]: string;
};

const FONT_SIZE_OPTIONS: [string, FontSizesOptions][] = [
  ["Normal", "normal"],
  ["Title", "title"],
  ["Subtitle", "subtitle"],
  ["Title 1", "title-1"],
  ["Title 2", "title-2"],
  ["Title 3", "title-3"],
];

const FONT_FAMILY_OPTIONS: string[] = [
  "Arial",
  "Courier New",
  "Georgia",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];

// Should match with LexicalToolbarProps.ts
const LIST_OPTIONS: [string, ListOptions][] = [
  ["Bullet List", "bullet-list"],
  ["Check List", "check-list"],
  ["Numbered List", "numbered-list"],
];

const fontRefToFontInPixels: fontRefToFontInPixelsProps = {
  normal: "11px",
  title: "26px",
  subtitle: "15",
  "title-1": "20px",
  "title-2": "16px",
  "title-3": "14px",
};

export {
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  LIST_OPTIONS,
  fontRefToFontInPixels,
};
