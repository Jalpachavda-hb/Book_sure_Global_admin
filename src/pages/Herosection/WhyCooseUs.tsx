import React, { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

import DynamicSpeciality from "../../components/form/form-elements/Dynamicgroup";
import { SpecialityField } from "../../components/form/form-elements/Dynamicgroup";
import { getWhyChooseUs } from "../../utils/Handlerfunctions/getdata";
import { updateWhyChooseUs } from "../../utils/Handlerfunctions/formEditHandlers";

/* ✅ Error Interface */
interface Errors {
  section_title?: string;
  section_subtitle?: string;
  content_title?: string;
  content_para?: string;
  speciality_list?: string;
}

const WhyChooseUs: React.FC = () => {
  /* ✅ Form States */
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSubtitle, setSectionSubtitle] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [contentPara, setContentPara] = useState("");

  /* ✅ Speciality List Dynamic */
  const [specialityList, setSpecialityList] = useState<SpecialityField[]>([]);

  /* ✅ Image */
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  /* ✅ Loading + Errors */
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  /* ✅ Load Data */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getWhyChooseUs();

    if (res?.success && res.data) {
      setSectionTitle(res.data.section_title || "");
      setSectionSubtitle(res.data.section_subtitle || "");
      setContentTitle(res.data.content_title || "");
      setContentPara(res.data.content_para || "");

      // ✅ Prefill Dynamic List
      setSpecialityList(res.data.speciality_list || []);

      // ✅ Image Preview
      setImagePreview(res.data.whychosseus_image || "");
    }
  };

  /* ✅ Image Change */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ✅ Speciality List Handler */
  const handleSpecialityListChange = (list: SpecialityField[]) => {
    setSpecialityList(list);

    setErrors((prev) => ({
      ...prev,
      speciality_list: "",
    }));
  };
  /* ✅ Validation */
  const validate = () => {
    let newErrors: Errors = {};

    if (!sectionTitle.trim())
      newErrors.section_title = "Section Title is required";

    if (!sectionSubtitle.trim())
      newErrors.section_subtitle = "Section Subtitle is required";

    if (!contentTitle.trim())
      newErrors.content_title = "Content Title is required";

    if (!contentPara.trim())
      newErrors.content_para = "Content Paragraph is required";
    if (
      specialityList.length === 0 ||
      specialityList.every((x) => !x.title.trim() || !x.description.trim())
    ) {
      newErrors.speciality_list = "Minimum 1 speciality required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    setLoading(true);

    /* ✅ Call API with ID */
    const res = await updateWhyChooseUs(
      1, // ✅ ID Required
      sectionTitle,
      sectionSubtitle,
      contentTitle,
      contentPara,
      specialityList,
      imageFile,
    );

    if (res.success) {
      toast.success(res.message || "Updated Successfully ✅");
      loadData();
    } else {
      toast.error(res.message || "Update Failed ❌");
    }

    setLoading(false);
  };
  return (
    <div>
      <ComponentCard title="Why Choose Us Section">
        <div className="space-y-6">
          {/* ✅ Image */}
          <div>
            <Label>Section Image *</Label>

            {imagePreview && (
              <img
                src={imagePreview}
                className="w-48 h-32 rounded-md mb-2 border object-cover"
                alt="Why Choose Us"
              />
            )}

            <FileInput accept="image/*" onChange={handleImageChange} />
          </div>

          {/* ✅ Section Title */}
          <div>
            <Label>Section Title *</Label>
            <Input
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.section_title}</p>
          </div>

          {/* ✅ Section Subtitle */}
          {/* <div>
            <Label>Section Subtitle *</Label>
            <Input
              value={sectionSubtitle}
              onChange={(e) => setSectionSubtitle(e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.section_subtitle}</p>
          </div> */}

          {/* ✅ Content Title */}
          <div>
            <Label>Content Title *</Label>
            <Input
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
            />
            <p className="text-red-500 text-sm">{errors.content_title}</p>
          </div>

          {/* ✅ Content Paragraph */}
          <div>
            <Label>Content Paragraph *</Label>
            <TextArea value={contentPara} onChange={setContentPara} />
            <p className="text-red-500 text-sm">{errors.content_para}</p>
          </div>

          {/* ✅ Dynamic Speciality List */}
          <DynamicSpeciality
            initialValues={specialityList}
            onChange={handleSpecialityListChange}
            labelText="Speciality List"
            titlePlaceholder="Enter Speciality Title"
            descPlaceholder="Enter Speciality Description"
          />

          {errors.speciality_list && (
            <p className="text-red-500 text-sm mt-1">
              {errors.speciality_list}
            </p>
          )}
        </div>
      </ComponentCard>

      {/* ✅ Update Button */}
      <div className="flex justify-end mt-6">
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update Section"}
        </Button>
      </div>
    </div>
  );
};

export default WhyChooseUs;
