import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import { Heading1, Heading2, Heading3, List, ListOrdered, CheckSquare, Quote, CodeSquare, Minus } from 'lucide-react';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      icon: <Heading1 className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      icon: <Heading2 className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
      },
    },
    {
      title: 'Heading 3',
      description: 'Small section heading.',
      icon: <Heading3 className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
      },
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bulleted list.',
      icon: <List className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: 'Numbered List',
      description: 'Create a list with numbering.',
      icon: <ListOrdered className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: 'Checklist',
      description: 'Track tasks with a to-do list.',
      icon: <CheckSquare className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: 'Quote',
      description: 'Capture a quote.',
      icon: <Quote className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      title: 'Code',
      description: 'Capture a code snippet.',
      icon: <CodeSquare className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
    {
      title: 'Divider',
      description: 'Visually divide blocks.',
      icon: <Minus className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
  ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10);
};

export const CommandList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
        return true;
      }
      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }
      if (event.key === 'Enter') {
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  if (!props.items.length) {
    return null;
  }

  return (
    <div className="bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] p-1.5 shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] flex flex-col gap-1 w-64 max-h-[300px] overflow-y-auto z-50">
      {props.items.map((item: any, index: number) => (
        <button
          className={`flex items-center gap-3 px-3 py-2 text-left border-2 transition-colors ${
            index === selectedIndex
              ? 'bg-[#FFE52E] text-[#171717] border-[#171717] shadow-[2px_2px_0px_0px_#171717]'
              : 'border-transparent text-subtle hover:bg-[#FFE52E]/30 hover:text-[#171717] dark:hover:text-[#FFFDF5]'
          }`}
          key={index}
          onClick={() => selectItem(index)}
        >
          <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-[#27272A] border-2 border-[#171717] dark:border-[#383838] shrink-0 font-bold">
            {item.icon}
          </div>
          <div>
            <div className="text-sm font-bold">{item.title}</div>
            <div className="text-xs opacity-75 font-medium">{item.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
});
CommandList.displayName = 'CommandList';

const renderItems = () => {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: any) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      if (!props.clientRect) {
        return;
      }

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      });
    },

    onUpdate(props: any) {
      component?.updateProps(props);
      if (!props.clientRect) return;
      popup?.[0]?.setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown(props: any) {
      if (props.event.key === 'Escape') {
        popup?.[0]?.hide();
        return true;
      }
      return (component?.ref as any)?.onKeyDown(props);
    },

    onExit() {
      popup?.[0]?.destroy();
      component?.destroy();
    },
  };
};

export const SlashCommand = Extension.create({
  name: 'slashCommand',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        render: renderItems,
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
