import { useState, useEffect } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";

export interface SpecialityField {
  title: string;
  description: string;
}

interface Props {
  initialValues?: SpecialityField[];
  onChange?: (data: SpecialityField[]) => void;

  /* ✅ Extra Props */
  labelText?: string;
  titlePlaceholder?: string;
  descPlaceholder?: string;
}

const DynamicSpeciality = ({
  initialValues = [],
  onChange,
  labelText = "Add Speciality",
  titlePlaceholder = "Enter Title",
  descPlaceholder = "Enter Description",
}: Props) => {
  const [fields, setFields] = useState<SpecialityField[]>([
    { title: "", description: "" },
  ]);

  /* ✅ Prefill values for edit */
  useEffect(() => {
    if (initialValues.length > 0) {
      setFields(initialValues);
    }
  }, [initialValues]);

  /* ✅ Handle Change */
  const handleFieldChange = (
    index: number,
    key: keyof SpecialityField,
    value: string,
  ) => {
    const updated = fields.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );

    setFields(updated);
    onChange?.(updated);
  };

  /* ✅ Add Field */
  const handleAddField = () => {
    const updated = [...fields, { title: "", description: "" }];
    setFields(updated);
    onChange?.(updated);
  };

  /* ✅ Delete Field */
  const handleDeleteField = (index: number) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
    onChange?.(updated);
  };

  return (
    <div className="font-[Poppins] text-gray-700">
      <Label className="mb-2 block font-semibold">{labelText}</Label>

      {fields.map((field, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg mt-3 space-y-3 bg-gray-50"
        >
          {/* ✅ Title */}
          <Input
            value={field.title}
            onChange={(e) => handleFieldChange(index, "title", e.target.value)}
            placeholder={titlePlaceholder}
          />

          {/* ✅ Description */}

          <TextArea
            value={field.description || ""}
            onChange={(value) => handleFieldChange(index, "description", value)}
            placeholder={descPlaceholder}
          />

          {/* ✅ Buttons */}
          <div className="flex gap-3">
            {index === fields.length - 1 && (
              <button
                type="button"
                onClick={handleAddField}
                className="flex items-center gap-2 px-4 py-2 rounded-md border text-blue-600 hover:bg-blue-50"
              >
                <FiPlus /> Add More
              </button>
            )}

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => handleDeleteField(index)}
                className="flex items-center gap-2 px-4 py-2 rounded-md border text-red-500 hover:bg-red-50"
              >
                <FiTrash2 /> Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicSpeciality;
