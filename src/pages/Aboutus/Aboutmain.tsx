import React, { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

import ParagraphEditor from "../../components/form/form-elements/ParagraphEditor";
import DynamicInputFields from "../../components/form/form-elements/DynamicInputFields ";

import { GetAboutmain } from "../../utils/Handlerfunctions/getdata";
import { updateAboutSection } from "../../utils/Handlerfunctions/formEditHandlers";

/* ================= TYPES ================= */

interface AboutForm {
  subtitle: string;
  title: string;
  experience_list: string[];
  main_image_file: File | null;
  main_image: string;
}

interface AboutFormErrors {
  subtitle?: string;
  title?: string;
  description?: string;
  experience_list?: string;
  main_image?: string;
}

/* ================= COMPONENT ================= */

const Aboutmain: React.FC = () => {
  /* ===== FORM STATE ===== */
  const [form, setForm] = useState<AboutForm>({
    subtitle: "",
    title: "",
    experience_list: [],
    main_image_file: null,
    main_image: "",
  });

  /* ✅ PARAGRAPH STATE */
  const [paragraphs, setParagraphs] = useState<string[]>([""]);

  const [errors, setErrors] = useState<Partial<AboutFormErrors>>({});
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await GetAboutmain();

      if (!res?.success) {
        toast.error("Data not found ❌");
        setInitialLoad(false);
        return;
      }

      const data = res.data;

      setForm({
        subtitle: data.subtitle || "",
        title: data.title || "",
        experience_list: Array.isArray(data.experience_list)
          ? data.experience_list
          : [],
        main_image_file: null,
        main_image: data.main_image || "",
      });

      /* 🔥 Convert description → paragraphs */
      setParagraphs(
        data.description
          ? data.description.split(/\r?\n\r?\n+/)
          : [""]
      );

      setInitialLoad(false);
    } catch (error) {
      console.error("Load About Error:", error);
      toast.error("Failed to load data ❌");
      setInitialLoad(false);
    }
  };

  /* ================= HANDLERS ================= */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleExperienceListChange = (list: string[]) => {
    setForm((prev) => ({
      ...prev,
      experience_list: list,
    }));

    setErrors((prev) => ({ ...prev, experience_list: "" }));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      main_image_file: file,
      main_image: URL.createObjectURL(file),
    }));

    setErrors((prev) => ({ ...prev, main_image: "" }));
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    let newErrors: AboutFormErrors = {};

    if (!form.subtitle.trim()) newErrors.subtitle = "Subtitle is required";
    if (!form.title.trim()) newErrors.title = "Title is required";

    if (paragraphs.every((p) => !p.trim())) {
      newErrors.description = "At least one paragraph is required";
    }

    if (
      form.experience_list.length === 0 ||
      form.experience_list.every((x) => !x.trim())
    ) {
      newErrors.experience_list = "Minimum 1 experience point required";
    }

    if (!form.main_image) newErrors.main_image = "Main Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    setLoading(true);

    /* 🔥 Join paragraphs before sending */
    const finalDescription = paragraphs
      .map((p) => p.trim())
      .filter(Boolean)
      .join("\r\n\r\n");

    try {
      const res = await updateAboutSection(1, {
        ...form,
        description: finalDescription,
      });

      if (res.success) {
        toast.success("About Section Updated ✅");
        loadData();
      } else {
        toast.error(res.message || "Update Failed ❌");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */

  if (initialLoad) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  /* ================= UI ================= */

  return (
    <div>
      <ComponentCard title="About Main Section">
        <div className="space-y-6">

          {/* SUBTITLE */}
          <div>
            <Label>Subtitle *</Label>
            <Input
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
            />
            {errors.subtitle && (
              <p className="text-red-500 text-sm">{errors.subtitle}</p>
            )}
          </div>

          {/* TITLE */}
          <div>
            <Label>Title *</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* DESCRIPTION (PARAGRAPHS) */}
          <div>
            <Label>Description *</Label>
            <ParagraphEditor
              paragraphs={paragraphs}
              setParagraphs={setParagraphs}
              charLimit={600}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* EXPERIENCE LIST */}
          <div>
            <Label>Experience List *</Label>
            <DynamicInputFields
              initialValues={form.experience_list}
              onChange={handleExperienceListChange}
            />
            {errors.experience_list && (
              <p className="text-red-500 text-sm">
                {errors.experience_list}
              </p>
            )}
          </div>

          {/* MAIN IMAGE */}
          <div>
            <Label>Main Image *</Label>

            {form.main_image && (
              <img
                src={form.main_image}
                alt="Preview"
                className="w-44 h-28 object-cover rounded border mb-3"
              />
            )}

            <FileInput accept="image/*" onChange={handleMainImageChange} />

            {errors.main_image && (
              <p className="text-red-500 text-sm">{errors.main_image}</p>
            )}
          </div>

        </div>
      </ComponentCard>

      {/* SUBMIT */}
      <div className="flex justify-end mt-6">
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
        >
          {loading ? "Updating..." : "Update Section"}
        </Button>
      </div>
    </div>
  );
};

export default Aboutmain;