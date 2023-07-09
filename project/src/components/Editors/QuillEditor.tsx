import dynamic from "next/dynamic";

import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorProps {
  editor: string;
  setEditor: React.Dispatch<React.SetStateAction<string>>;
}

const QuillEditor = (props: QuillEditorProps) => {
  const { editor, setEditor } = props;

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "font",
    "code-block",
  ];

  return (
    <div>
      {/* <div id="toolbar">
        <select className="ql-header" defaultValue={""}>
          <option value="1">Title</option>
          <option value="2">Subtitle</option>
          <option value="3">Title 1</option>
          <option value="4">Title 2</option>
          <option selected />
        </select>

        <div>
          <button className="ql-bold" />
        </div>
      </div> */}
      <ReactQuill
        theme="snow"
        value={editor}
        onChange={setEditor}
        modules={modules}
        formats={formats}
        style={{ fontFamily: "Roboto, Verdana, sans-serif" }}
      />
    </div>
  );
};

export { QuillEditor };
