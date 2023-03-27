import styled from "styled-components"

import QuillEditor from "../../components/QuillEditor"
import QuillReader from "../../components/QuillReader"

const EditorWrapper = styled.div`
  border: 1px solid #ccc;
  min-height: 400px;
`

const toolbar = [
  //[{ font: [] }],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
  ["link", "image", "video"],
  ["clean"],
]

export default function DocumentEditor({ editable, value, setValue }) {
  return (
    <EditorWrapper>
      {editable ? (
        <QuillEditor
          value={value}
          setValue={setValue}
          toolbarOptions={toolbar}
        />
      ) : (
        <QuillReader value={value} />
      )}
    </EditorWrapper>
  )
}
