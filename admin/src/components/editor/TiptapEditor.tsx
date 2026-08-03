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
  Heading1, Heading2, Heading3, List, ListOrdered, CheckSquare, Quote, CodeSquare, Minus,
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
          // Re-importing renderItems locally if needed or import from slash-command
          // We must import renderItems if we export it, wait, we didn't export it.
          // Let's rely on the plugin itself to use it.
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
          className="flex items-center gap-1 material-layer-elevated px-2 py-1 shadow-2xl rounded-full"
        >
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-[var(--border-strong)] mx-1" />
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('bold') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('italic') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('underline') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('strike') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('code') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <Code className="w-4 h-4" />
          </button>
          
          <div className="w-px h-4 bg-[var(--border-strong)] mx-1" />
          
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
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('link') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <Link2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className="p-1.5 rounded-full transition-colors text-subtle hover:text-red-500 hover:bg-red-500/10"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu 
          editor={editor} 
          className="flex items-center gap-1 material-layer-elevated px-2 py-1 shadow-2xl rounded-full ml-8"
        >
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('bulletList') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('orderedList') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('taskList') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <CheckSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('blockquote') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded-full transition-colors ${editor.isActive('codeBlock') ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]'}`}
          >
            <CodeSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded-full transition-colors text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)]"
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
            className="w-10 h-10 flex items-center justify-center rounded-full material-layer shadow-sm text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button 
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="w-10 h-10 flex items-center justify-center rounded-full material-layer shadow-sm text-subtle hover:text-[var(--foreground)] hover:bg-[var(--layer-2)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
