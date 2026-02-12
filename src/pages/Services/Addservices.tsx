import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";

import { addservices } from "../../utils/Handlerfunctions/formSubmitHandlers";

const Addservices = () => {
  const navigate = useNavigate();

  /* ✅ Form State */
  const [form, setForm] = useState({
    service_name: "",
    slug: "",
    description: "",
  });

  /* ✅ Errors */
  const [errors, setErrors] = useState({
    service_name: "",
    slug: "",
    description: "",
  });

  /* ✅ Handle Input Change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ✅ Handle TextArea Change */
  const handleDescriptionChange = (val: string) => {
    setForm({ ...form, description: val });
    setErrors({ ...errors, description: "" });
  };

  /* ✅ Validation */
  const validateForm = () => {
    let valid = true;

    let newErrors = {
      service_name: "",
      slug: "",
      description: "",
    };

    if (!form.service_name.trim()) {
      newErrors.service_name = "Service Name is required";
      valid = false;
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    if (!form.slug.trim()) {
      newErrors.slug = "Slug is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  /* ✅ Submit */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const success = await addservices(form);

    if (success) {
      navigate("/admin/services");
    }
  };

  return (
    <div className="mx-auto">
      <ComponentCard title="Add New Service">
        <div className="space-y-5">
          {/* ✅ Service Name */}
          <div>
            <Label>
              Service Name <span className="text-red-500">*</span>
            </Label>

            <Input
              name="service_name"
              value={form.service_name}
              onChange={handleChange}
              placeholder="Enter service name"
            />

            {errors.service_name && (
              <p className="text-red-500 text-sm">{errors.service_name}</p>
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
              placeholder="Enter service description"
              rows={4}
            />

            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* ✅ Slug */}
          <div>
            <Label>
              Slug <span className="text-red-500">*</span>
            </Label>

            <Input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="Enter slug (example: bookkeeping)"
            />

            {errors.slug && (
              <p className="text-red-500 text-sm">{errors.slug}</p>
            )}
          </div>

          {/* ✅ Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              Add Service
            </Button>

            <Button
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
};

export default Addservices;