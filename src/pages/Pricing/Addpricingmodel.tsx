import React, { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DynamicInputFields from "../../components/form/form-elements/DynamicInputFields ";

import { addPricingModel } from "../../utils/Handlerfunctions/formSubmitHandlers";

/* ✅ Pricing Form Interface */
interface PricingForm {
  title: string;
  price: string;
  short_description: string;
  features: string[];
}

/* ✅ Error Interface */
interface PricingErrors {
  title?: string;
  price?: string;
  short_description?: string;
  features?: string;
}

const AddPricingModel: React.FC = () => {
  /* ✅ Form State */
  const [form, setForm] = useState<PricingForm>({
    title: "",
    price: "",
    short_description: "",
    features: [""],
  });

  const [errors, setErrors] = useState<PricingErrors>({});
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  /* ✅ Input Change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ✅ Description Change */
  const handleDescriptionChange = (val: string) => {
    setForm((prev) => ({ ...prev, short_description: val }));
    setErrors((prev) => ({ ...prev, short_description: "" }));
  };

  /* ✅ Features List Change */
  const handleFeaturesChange = (list: string[]) => {
    setForm((prev) => ({ ...prev, features: list }));
    setErrors((prev) => ({ ...prev, features: "" }));
  };

  /* ✅ Validation */
  const validate = () => {
    let newErrors: PricingErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";

    if (!form.price.trim()) newErrors.price = "Price is required";

    if (!form.short_description.trim())
      newErrors.short_description = "Short Description required";

    if (
      form.features.length === 0 ||
      form.features.every((x) => !x.trim())
    ) {
      newErrors.features = "Minimum 1 feature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ✅ Submit Handler */
const handleSubmit = async () => {
  if (!validate()) {
    toast.error("Please fill all required fields ❌");
    return;
  }

  setLoading(true);

  const payload = {
    title: form.title,
    price: Number(form.price),
    short_description: form.short_description,
    features: form.features,
    created_by: "admin",
  };

  const res = await addPricingModel(payload);

  if (res.success) {
    toast.success("Pricing Model Added ✅");

    // ✅ Reset Form
    setForm({
      title: "",
      price: "",
      short_description: "",
      features: [""],
    });

    // ✅ Navigate After Success
    navigate("/admin/pricing_model");
  } else {
    toast.error(res.message || "Add Failed ❌");
  }

  setLoading(false);
};

  return (
    <div>
      <ComponentCard title="Add Pricing Model">
        <div className="space-y-6">
          {/* ✅ Title */}
          <div>
            <Label>Plan Title *</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* ✅ Price */}
          <div>
            <Label>Price *</Label>
            <Input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          {/* ✅ Short Description */}
          <div>
            <Label>Short Description *</Label>
            <TextArea
              value={form.short_description}
              onChange={handleDescriptionChange}
            />
            {errors.short_description && (
              <p className="text-red-500 text-sm">
                {errors.short_description}
              </p>
            )}
          </div>

          {/* ✅ Features Dynamic List */}
          <div>
            <Label>Features *</Label>
            <DynamicInputFields
              initialValues={form.features}
              onChange={handleFeaturesChange}
            />
            {errors.features && (
              <p className="text-red-500 text-sm">{errors.features}</p>
            )}
          </div>
        </div>
      </ComponentCard>

      {/* ✅ Submit Button */}
      <div className="flex justify-end mt-6">
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2"
        >
          {loading ? "Saving..." : "Add Pricing Model"}
        </Button>
      </div>
    </div>
  );
};

export default AddPricingModel;