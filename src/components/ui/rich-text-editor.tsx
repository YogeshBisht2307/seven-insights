import React from 'react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import Typography from '@tiptap/extension-typography';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Editor } from '@tiptap/react';
import classNames from 'classnames';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import {all, createLowlight} from 'lowlight';

import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiParagraph,
  RiListOrdered,
  RiListUnordered,
  RiCodeBoxLine,
  RiLink,
  RiLinkUnlink,
  RiDoubleQuotesL,
  RiSeparator,
  RiTextWrap,
  RiFormatClear,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
} from 'react-icons/ri';


function setLink(editor: Editor) {
  const previousUrl = editor.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  if (url === null) {
    return
  }

  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
}


interface MenuBarProps {
  editor: Editor | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const isCursorOverLink = editor?.getAttributes('link').href;

  if (!editor) {
    return null
  }

  return (
    <div>
      <div className="Toolbar">
        <div className="icon" onClick={() => editor.chain().focus().toggleBold().run()}>
          <RiBold />
        </div>
        <div className="icon" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <RiItalic />
        </div>
        <div className="icon" onClick={() => editor.chain().focus().toggleStrike().run()}>
          <RiStrikethrough />
        </div>
        <div className="icon" onClick={() => editor.chain().focus().toggleCode().run()}>
          <RiCodeSSlashLine />
        </div>
        <div className="divider"></div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <RiH1 />
        </div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <RiH2 />
        </div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <RiH3 />
        </div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
          <RiH4 />
        </div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
          <RiH5 />
        </div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}>
          <RiH6 />
        </div>
        <div className="icon" onClick={() => editor.chain().focus().setParagraph().run()}>
          <RiParagraph />
        </div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <RiListOrdered />
        </div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <RiListUnordered />
        </div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <RiCodeBoxLine />
        </div>
        <div className="divider"></div>
        <div className="icon" onClick={() => setLink(editor)}>
          <RiLink />
        </div>
        <div
          className={classNames('icon', { disabled: !isCursorOverLink })}
          onClick={() => setLink(editor)}>
          <RiLinkUnlink />
        </div>
        <div className="divider"></div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <RiDoubleQuotesL />
        </div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <RiSeparator />
        </div>
        <div className="divider"></div>
        <div className="icon" onClick={() => editor.chain().focus().setHardBreak().run()}>
          <RiTextWrap />
        </div>
        <div
          className="icon"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
          <RiFormatClear />
        </div>
        <div className="divider"></div>
        <div className="icon" onClick={() => editor.chain().focus().undo().run()}>
          <RiArrowGoBackLine />
        </div>
        <div className="icon" onClick={() => editor.chain().focus().redo().run()}>
          <RiArrowGoForwardLine />
        </div>
      </div>
    </div>
  )
}

const CodeBlockComponent = ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }: any) => (
  <NodeViewWrapper className="code-block relative">
    <select className='absolute right-2 top-2 rounded' contentEditable={false} defaultValue={defaultLanguage} onChange={event => updateAttributes({ language: event.target.value })}>
      <option value="null">
        auto
      </option>
      <option disabled>
        —
      </option>
      {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
)


export const RichTextEditor = ({ content, onChange }: { content: string, onChange: (richtext: string) => void }) => {
  const lowlight = createLowlight(all);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({...({ codeBlock: false })}),
      CodeBlockLowlight
        .extend({
          addNodeView() {
            return ReactNodeViewRenderer(CodeBlockComponent)
          },
        })
        .configure({ lowlight }),
      Link.configure({linkOnPaste: false, openOnClick: false}),
      Placeholder.configure({placeholder: "Enter Value"}),
      TaskList,
      TaskItem,
      Typography
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[300px] py-4 px-6 my-4 border-input"
      }
    },
    onUpdate({ editor }: any) {
      onChange(editor.getHTML())
    }
  })
  return (
    <div className="WhiteCard">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  )
}