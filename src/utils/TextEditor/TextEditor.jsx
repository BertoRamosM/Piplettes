"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  () => import("react-quill"),
  { ssr: false }
);

const RichTextEditor = ({ value = "", onSave }) => {
  const [editorValue, setEditorValue] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setEditorValue(value || "");
  }, [value]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "align",
  ];

  const handleChange = (content) => {
    setEditorValue(content);

    if (typeof onSave === "function") {
      onSave(content);
    }
  };

  if (!isClient) {
    return (
      <div className="border-2 border-zinc-500 p-4 rounded">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="w-full">
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default RichTextEditor;