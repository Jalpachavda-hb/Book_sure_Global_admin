// import React from 'react'

// const AddAssociate = () => {
//   return (
//     <div>AddAssociate</div>
//   )
// }

// export default AddAssociate

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";

import { toast } from "react-toastify";
import { addFounder } from "../../utils/Handlerfunctions/formSubmitHandlers";


/* ✅ Form Interface */
interface AssociateForm {
  name: string;
  designation: string;
  description: string;

  image: string; // preview url
  image_file: File | null;
}

/* ✅ Errors Interface */
interface FormErrors {
  name?: string;
  designation?: string;
  description?: string;
  image?: string;
}

const AddAssociate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /* ✅ Form State */
  const [form, setForm] = useState<AssociateForm>({
    name: "",
    designation: "",
    description: "",
    image: "",
    image_file: null,
  });

  /* ✅ Error State */
  const [errors, setErrors] = useState<FormErrors>({});

  /* ✅ Handle Input Change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  /* ✅ Description Change */
  const handleDescriptionChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      description: val,
    }));
  };

  /* ✅ Image Change */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image_file: file,
      image: URL.createObjectURL(file),
    }));

    setErrors((prev) => ({
      ...prev,
      image: undefined,
    }));
  };

  /* ✅ Validation */
  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.designation.trim())
      newErrors.designation = "Designation is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.image_file)
      newErrors.image = "Image is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ✅ Submit Add */
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    setLoading(true);

    const res = await addFounder(form);

    if (res.success) {
      toast.success(res.message || "Associate Added Successfully ✅");
      navigate("/admin/our_associate");
    } else {
      toast.error(res.message || "Add Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div>
      <ComponentCard title="Add New Associate">
        <div className="space-y-6">

          {/* ✅ Image */}
          <div>
            <Label>
              Associate Image <span className="text-red-500">*</span>
            </Label>

            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="w-40 h-32 object-cover rounded border mb-2"
              />
            )}

            <FileInput accept="image/*" onChange={handleImageChange} />

            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
          </div>

          {/* ✅ Name */}
          <div>
            <Label>
              Name <span className="text-red-500">*</span>
            </Label>

            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* ✅ Designation */}
          <div>
            <Label>
              Designation <span className="text-red-500">*</span>
            </Label>

            <Input
              name="designation"
              value={form.designation}
              onChange={handleChange}
            />

            {errors.designation && (
              <p className="text-red-500 text-sm">
                {errors.designation}
              </p>
            )}
          </div>

          {/* ✅ Description */}
          <div>
            <Label>
              Description <span className="text-red-500">*</span>
            </Label>

            <TextArea
              value={form.description}
              onChange={handleDescriptionChange}
            />

            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description}
              </p>
            )}
          </div>
        </div>
      </ComponentCard>

      {/* ✅ Submit Button */}
      <div className="flex justify-end mt-6">
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-indigo-700 hover:bg-indigo-900 px-6"
        >
          {loading ? "Adding..." : "Add Associate"}
        </Button>
      </div>
    </div>
  );
};

export default AddAssociate;
