import { useState, useEffect } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
// import Label from "../Label";
import Input from "../input/InputField";

interface Props {
  initialValues?: string[];
  onChange?: (data: string[]) => void;

  /* ✅ Optional Custom Props */
  labelText?: string;
  placeholderText?: string;
}

const DynamicInputFields = ({
  initialValues = [],
  onChange,

  /* ✅ Default values for old usage */
  // labelText = "Experience List",
  placeholderText = "Enter Experience Point",
}: Props) => {
  const [inputs, setInputs] = useState<string[]>([""]);

  /* ✅ Prefill */
  useEffect(() => {
    if (initialValues && initialValues.length > 0) {
      const validValues = initialValues
        .map((item) => (item ? item.trim() : ""))
        .filter((item) => item !== "");

      setInputs(validValues.length > 0 ? validValues : [""]);
    }
  }, [initialValues]);

  /* ✅ Add Field */
  const handleAddInput = () => {
    if (!inputs[inputs.length - 1].trim()) return;
    setInputs([...inputs, ""]);
  };

  /* ✅ Change Field */
  const handleInputChange = (index: number, value: string) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
    onChange?.(updated);
  };

  /* ✅ Remove Field */
  const handleDeleteInput = (index: number) => {
    const updated =
      inputs.length === 1 ? [""] : inputs.filter((_, i) => i !== index);

    setInputs(updated);
    onChange?.(updated);
  };

  return (
    <div className="font-[Poppins] text-gray-600">

      {/* ✅ Dynamic Label */}
      {/* <Label className="mb-2 block font-medium"> */}
        {/* {labelText} <span className="text-red-500">*</span> */}
      {/* </Label> */}

      {inputs.map((input, index) => (
        <div key={index} className="flex gap-3 mt-2 items-center">

          {/* ✅ Input */}
          <div className="flex-1">
            <Input
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={placeholderText}
            />
          </div>

          {/* ✅ Delete Button */}
          {inputs.length > 1 && (
            <button
              type="button"
              onClick={() => handleDeleteInput(index)}
              className="px-3 py-2 border rounded text-red-500 hover:bg-red-50"
            >
              <FiTrash2 size={18} />
            </button>
          )}

          {/* ✅ Add Button */}
          {index === inputs.length - 1 && (
            <button
              type="button"
              onClick={handleAddInput}
              className="flex items-center gap-2 px-4 py-2 border rounded text-blue-600 hover:bg-blue-50"
            >
              <FiPlus size={18} />
              Add
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicInputFields;
