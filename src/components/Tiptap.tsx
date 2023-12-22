"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import Heading from "@tiptap/extension-heading"

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure(), Heading.configure({
        HTMLAttributes: {
            class: 'text-xl font-bold',
            levels: [2],
        }
    })],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-input disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  })

  return (
    <div className="flex flex-col justify-stretch min-h-full">
        <Toolbar editor={editor}/>
        <EditorContent editor={editor} />
    </div>
  )
}
function configure(arg0: {}): import("@tiptap/react").AnyExtension {
    throw new Error("Function not implemented.");
}

