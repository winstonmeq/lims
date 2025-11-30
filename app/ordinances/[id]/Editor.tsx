// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { Bold, Italic, List, ListOrdered, Heading1, Heading2 } from "lucide-react";
// import { Toggle } from "@/components/ui/toggle"; // ← shadcn toggle button

// export default function RichEditor({ content }: { content: string }) {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: content || "<p>No content</p>",
//     editable: true,
//     immediatelyRender: false,
//   });

//   if (!editor) return null;

//   return (
//     <div className="border rounded-md p-3 bg-white">
//       {/* 🔥 Toolbar */}
//       <div className="flex flex-wrap gap-1 mb-3">
//         <Toggle
//           pressed={editor.isActive("bold")}
//           onPressedChange={() => editor.chain().focus().toggleBold().run()}
//         >
//           <Bold className="h-4 w-4" />
//         </Toggle>

//         <Toggle
//           pressed={editor.isActive("italic")}
//           onPressedChange={() => editor.chain().focus().toggleItalic().run()}
//         >
//           <Italic className="h-4 w-4" />
//         </Toggle>

//         <Toggle
//           pressed={editor.isActive("heading", { level: 1 })}
//           onPressedChange={() =>
//             editor.chain().focus().toggleHeading({ level: 1 }).run()
//           }
//         >
//           <Heading1 className="h-4 w-4" />
//         </Toggle>

//         <Toggle
//           pressed={editor.isActive("heading", { level: 2 })}
//           onPressedChange={() =>
//             editor.chain().focus().toggleHeading({ level: 2 }).run()
//           }
//         >
//           <Heading2 className="h-4 w-4" />
//         </Toggle>

//         <Toggle
//           pressed={editor.isActive("bulletList")}
//           onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
//         >
//           <List className="h-4 w-4" />
//         </Toggle>

//         <Toggle
//           pressed={editor.isActive("orderedList")}
//           onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
//         >
//           <ListOrdered className="h-4 w-4" />
//         </Toggle>
//       </div>

//       {/* 🔥 Editor body */}
//       <div className="prose prose-sm max-w-none">
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }
