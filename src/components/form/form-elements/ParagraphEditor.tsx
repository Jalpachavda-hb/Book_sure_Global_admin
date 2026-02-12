import React from "react";
// import Button from "../../ui/button/Button";
import { FiPlus } from "react-icons/fi";
interface ParagraphEditorProps {
  paragraphs: string[];
  setParagraphs: (paras: string[]) => void;
  charLimit?: number;
}

const ParagraphEditor: React.FC<ParagraphEditorProps> = ({
  paragraphs,
  setParagraphs,
  charLimit = 400,
}) => {
  /* ================= UPDATE ================= */
  const updateParagraph = (index: number, value: string) => {
    if (value.length > charLimit) return;

    const updated = [...paragraphs];
    updated[index] = value;
    setParagraphs(updated);
  };

  /* ================= ADD / REMOVE ================= */
  const addParagraph = () => {
    setParagraphs([...paragraphs, ""]);
  };

  const removeParagraph = (index: number) => {
    if (paragraphs.length === 1) return;
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };

  /* ================= DRAG & DROP ================= */
  const onDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("dragIndex", index.toString());
  };

  const onDrop = (e: React.DragEvent, dropIndex: number) => {
    const dragIndex = Number(e.dataTransfer.getData("dragIndex"));
    if (dragIndex === dropIndex) return;

    const updated = [...paragraphs];
    const [movedItem] = updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, movedItem);

    setParagraphs(updated);
  };

  return (
    <div className=" font-[Poppins] text-gray-800">
      {paragraphs.map((para, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, index)}
          className=" relative cursor-move"
        >
          {/* TEXTAREA */}
          <textarea
            rows={4}
            value={para}
            placeholder={`Paragraph ${index + 1}`}
            onChange={(e) => updateParagraph(index, e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />

          {/* FOOTER */}
          <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
            <span>
              {para.length}/{charLimit} characters
            </span>

            {paragraphs.length > 1 && (
              <button
                type="button"
                onClick={() => removeParagraph(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}

      {/* ADD BUTTON */}
      {/* <Button
        type="button"
        onClick={addParagraph}
        className="bg-blue-600 hover:bg-blue-700 w-fit"
      >
        + Add Paragraph
      </Button> */}

      <button
        type="button"
        onClick={addParagraph}
        className="flex items-center gap-2 px-4 py-2 rounded-md border text-blue-600 hover:bg-blue-50"
      >
        <FiPlus /> Add More
      </button>
    </div>
  );
};

export default ParagraphEditor;
