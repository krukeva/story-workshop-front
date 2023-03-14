import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"

function QuillEditor({ value, setValue, toolbarOptions }) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      placeholder="Entrez votre text ici..."
      modules={toolbarOptions ? { toolbar: toolbarOptions } : {}}
    />
  )
}

export default QuillEditor
