import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'


const MenuBar = ({ editor }: any) => {

  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("bold") ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("italic") ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("strike") ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("code") ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        code
      </button>
      <button 
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("clearMarks") ? "is-active bg-primary text-primary-foreground" : ""}`}
    >
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("clearNodes") ? "is-active bg-primary text-primary-foreground" : ""}`}
        >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("paragraph") ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("heading", { level: 1 }) ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("heading", { level: 2 }) ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("heading", { level: 3 }) ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("heading", { level: 4 }) ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("heading", { level: 5 }) ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("heading", { level: 6 }) ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("codeBlock") ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("blockquote") ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("undo") ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className={`px-2 border rounded-sm mr-1 my-2" ${editor.isActive("redo") ? "is-active bg-primary text-primary-foreground" : ""}`}
      >
        redo
      </button>
    </>
  )
}

export const RichTextEditor = ({content, onChange}: {content: string, onChange: (richtext: string) => void}) => {
    const editor = useEditor({
        extensions: [StarterKit.configure()],
        content: content,
        editorProps: {
            attributes: {
                class: "rounded-md border min-h-[300px] py-4 px-6 my-4 border-input bg-background text-foreground"
            }
        },
        onUpdate({ editor } : any){
            onChange(editor.getHTML())
        }
    })
    return (
    <div>
        <MenuBar editor={editor}/>
        <EditorContent editor={editor}/>
    </div>
  )
}