import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"

function QuillReader({ value }) {
  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly={true}
      placeholder="Ce champ n'est pas encore rempli."
    />
  )
}

export default QuillReader
