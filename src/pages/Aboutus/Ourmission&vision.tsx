import React, { useEffect, useState, useCallback } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";

import { toast } from "react-toastify";
import { getcompanyhighlight } from "../../utils/Handlerfunctions/getdata";
import { updatecompanyhighlight } from "../../utils/Handlerfunctions/formEditHandlers";

/* ✅ Types */
type Errors = {
  [key: string]: string;
};

interface HighlightForm {
  stat_1_value: string;
  stat_1_text: string;
  stat_2_value: string;
  stat_2_text: string;
  
  stat_4_value: string;
  stat_4_text: string;

  mission_title: string;
  mission_description: string;
  mission_image: File | null;
  mission_image_url: string;

  vision_title: string;
  vision_description: string;
  vision_image: File | null;
  vision_image_url: string;
}

const Companyhighlight: React.FC = () => {
  /* ✅ Initial State */
  const [form, setForm] = useState<HighlightForm>({
    stat_1_value: "",
    stat_1_text: "",
    stat_2_value: "",
    stat_2_text: "",
  
    stat_4_value: "",
    stat_4_text: "",

    mission_title: "",
    mission_description: "",
    mission_image: null,
    mission_image_url: "",

    vision_title: "",
    vision_description: "",
    vision_image: null,
    vision_image_url: "",
  });

  const [preview, setPreview] = useState({
    mission_image: "",
    vision_image: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* ✅ Load Data */
  const loadData = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getcompanyhighlight();

      if (!data) return;

      setForm({
        stat_1_value: data.stat_1_value ?? "",
        stat_1_text: data.stat_1_text ?? "",

        stat_2_value: data.stat_2_value ?? "",
        stat_2_text: data.stat_2_text ?? "",

   

        stat_4_value: data.stat_4_value ?? "",
        stat_4_text: data.stat_4_text ?? "",

        mission_title: data.mission_title ?? "",
        mission_description: data.mission_description ?? "",
        mission_image: null,
        mission_image_url: data.mission_image ?? "",

        vision_title: data.vision_title ?? "",
        vision_description: data.vision_description ?? "",
        vision_image: null,
        vision_image_url: data.vision_image ?? "",
      });

      setPreview({
        mission_image: data.mission_image ?? "",
        vision_image: data.vision_image ?? "",
      });
    } catch {
      toast.error("Failed to load data ❌");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /* ✅ Input Change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* ✅ TextArea Change */
  const handleTextAreaChange = (field: keyof HighlightForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /* ✅ File Change */
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "mission_image" | "vision_image",
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      [field]: file,
    }));

    setPreview((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
  };

  /* ✅ Clear File */
  const handleClearFile = (field: "mission_image" | "vision_image") => {
    setForm((prev) => ({
      ...prev,
      [field]: null,
    }));

    setPreview((prev) => ({
      ...prev,
      [field]:
        field === "mission_image"
          ? form.mission_image_url
          : form.vision_image_url,
    }));
  };

  /* ✅ Form Validation */
  const validateForm = () => {
    const newErrors: Errors = {};

    const requiredFields: (keyof HighlightForm)[] = [
      "stat_1_value",
      "stat_1_text",
      "stat_2_value",
      "stat_2_text",
     
      "stat_4_value",
      "stat_4_text",
      "mission_title",
      "mission_description",
      "vision_title",
      "vision_description",
    ];

    requiredFields.forEach((field) => {
      if (!form[field] || form[field].toString().trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ✅ Submit */
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      const typedKey = key as keyof HighlightForm;
      const value = form[typedKey];

      if (value === null) return;

      if (value instanceof File) {
        formData.append(typedKey, value);
      } else {
        formData.append(typedKey, value.toString());
      }
    });

    const res = await updatecompanyhighlight(1, formData);

    if (res.success) {
      toast.success("Updated Successfully ✅");
      loadData();
    } else {
      toast.error(res.message);
    }

    setLoading(false);
  };

  /* ✅ Loader */
  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div>
      <ComponentCard title="Company Highlight Section">
        <div className="space-y-6">
          {/* ✅ Stats */}
          {[1, 2, 4].map((num) => {
            const valueField = `stat_${num}_value` as keyof HighlightForm;
            const textField = `stat_${num}_text` as keyof HighlightForm;

            return (
              <div key={num} className="border p-4 rounded space-y-3">
                <Label>Value *</Label>
                <Input
                  name={valueField}
                  value={form[valueField] as string}
                  onChange={handleChange}
                  error={!!errors[valueField]}
                  hint={errors[valueField]}
                />

                <Label>Text *</Label>
                <TextArea
                  value={form[textField] as string}
                  onChange={(val) => handleTextAreaChange(textField, val)}
                  error={!!errors[textField]}
                  hint={errors[textField]}
                />
              </div>
            );
          })}

          {/* ✅ Mission */}
          <div className="border p-4 rounded space-y-3">
            <Label>Mission Title *</Label>
            <Input
              name="mission_title"
              value={form.mission_title}
              onChange={handleChange}
              error={!!errors.mission_title}
              hint={errors.mission_title}
            />

            <Label>Description *</Label>
            <TextArea
              value={form.mission_description}
              onChange={(val) =>
                handleTextAreaChange("mission_description", val)
              }
              error={!!errors.mission_description}
              hint={errors.mission_description}
            />

            {preview.mission_image && (
              <div>
                <img
                  src={preview.mission_image}
                  className="w-40 h-28 object-cover rounded"
                />
                {form.mission_image && (
                  <button
                    type="button"
                    onClick={() => handleClearFile("mission_image")}
                    className="text-red-500 text-sm mt-1"
                  >
                    Remove New Image
                  </button>
                )}
              </div>
            )}

            <FileInput
              accept="image/*"
              onChange={(e) => handleFileChange(e, "mission_image")}
            />
          </div>

          {/* ✅ Vision */}
          <div className="border p-4 rounded space-y-3">
            <Label>Vision Title *</Label>
            <Input
              name="vision_title"
              value={form.vision_title}
              onChange={handleChange}
              error={!!errors.vision_title}
              hint={errors.vision_title}
            />

            <Label>Description *</Label>
            <TextArea
              value={form.vision_description}
              onChange={(val) =>
                handleTextAreaChange("vision_description", val)
              }
              error={!!errors.vision_description}
              hint={errors.vision_description}
            />

            {preview.vision_image && (
              <div>
                <img
                  src={preview.vision_image}
                  className="w-40 h-28 object-cover rounded"
                />
                {form.vision_image && (
                  <button
                    type="button"
                    onClick={() => handleClearFile("vision_image")}
                    className="text-red-500 text-sm mt-1"
                  >
                    Remove New Image
                  </button>
                )}
              </div>
            )}

            <FileInput
              accept="image/*"
              onChange={(e) => handleFileChange(e, "vision_image")}
            />
          </div>
        </div>
      </ComponentCard>

      {/* ✅ Submit */}
      <div className="flex justify-end mt-5">
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default Companyhighlight;
