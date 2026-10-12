"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { SlashCommand, getSuggestionItems } from './slash-command';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, Link2, Eraser,
  Heading1, Heading2, List, ListOrdered, CheckSquare, Quote, CodeSquare, Minus,
  Undo, Redo
} from 'lucide-react';
import { useEffect } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string, textContent: string, wordCount: number) => void;
  editable?: boolean;
}

export function TiptapEditor({ content, onChange, editable = true }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({
        placeholder: 'Press / for commands, or start typing...',
      }),
      CharacterCount,
      SlashCommand.configure({
        suggestion: {
          items: getSuggestionItems,
        }
      })
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(
        editor.getHTML(), 
        editor.getText(), 
        editor.storage.characterCount.words()
      );
    },
  });

  useEffect(() => {
    if (editor && editor.isEditable !== editable) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      {editor && (
        <BubbleMenu 
          editor={editor} 
          className="flex items-center gap-1 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] px-2 py-1.5 shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] z-50"
        >
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('heading', { level: 1 }) ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('heading', { level: 2 }) ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-[#171717] dark:bg-[#383838] mx-1" />
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('bold') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('italic') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('underline') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('strike') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('code') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <Code className="w-4 h-4" />
          </button>
          
          <div className="w-px h-5 bg-[#171717] dark:bg-[#383838] mx-1" />
          
          <button
            onClick={() => {
              const previousUrl = editor.getAttributes('link').href
              const url = window.prompt('URL', previousUrl)
              if (url === null) return
              if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run()
                return
              }
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
            }}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('link') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <Link2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className="p-1.5 transition-colors border-2 border-transparent text-subtle hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/15"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu 
          editor={editor} 
          className="flex items-center gap-1 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] px-2 py-1.5 shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] ml-8 z-50"
        >
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('heading', { level: 1 }) ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('heading', { level: 2 }) ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('bulletList') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('orderedList') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('taskList') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <CheckSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('blockquote') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 transition-colors border-2 ${editor.isActive('codeBlock') ? 'bg-[#FFE52E] text-[#171717] border-[#171717]' : 'border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30'}`}
          >
            <CodeSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 transition-colors border-2 border-transparent text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E]/30"
          >
            <Minus className="w-4 h-4" />
          </button>
        </FloatingMenu>
      )}

      {editor && (
        <div className="absolute -top-12 right-0 flex gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity z-10">
          <button 
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="w-9 h-9 flex items-center justify-center bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button 
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="w-9 h-9 flex items-center justify-center bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5] hover:bg-[#FFE52E] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      )}

      <EditorContent editor={editor} className="w-full text-xl leading-relaxed text-[var(--foreground)] min-h-[60vh] font-light prose-checklist" />
    </>
  );
}
