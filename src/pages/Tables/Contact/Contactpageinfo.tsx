import React, { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Button from "../../../components/ui/button/Button";
import { toast } from "react-toastify";

import {
  GetContactPageInfo,
} from "../../../utils/Handlerfunctions/getdata";

import {
  updateContactpageinfo,
} from "../../../utils/Handlerfunctions/formEditHandlers";

interface ContactForm {
  title: string;
  description: string;
  address: string;
  phone: string;
  email: string;
}

const Contactpageinfo = () => {
  const [form, setForm] = useState<ContactForm>({
    title: "",
    description: "",
    address: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  /* ✅ Prefill Data Load */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await GetContactPageInfo();

    if (!data) return;

    setForm({
      title: data.title ?? "",
      description: data.description ?? "",
      address: data.address ?? "",
      phone: data.phone ?? "",
      email: data.email ?? "",
    });
  };

  /* ✅ Handle Change */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* ✅ Handle TextArea Change */
  const handleTextAreaChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [field]: "",
    }));
  };

  /* ✅ Validation */
  const validateForm = () => {
    let newErrors: any = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.email.trim()) newErrors.email = "Email is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ✅ Submit Update */
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    setLoading(true);

    const res = await updateContactpageinfo(1, form);

    if (res.success) {
      toast.success("Contact Page Updated ✅");
      loadData();
    } else {
      toast.error(res.message);
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto">
      <ComponentCard title="Contact Page Info">
        <div className="space-y-5">

          {/* ✅ Title */}
          <div>
            <Label>Title <span className="text-red-500 text-sm">*</span></Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* ✅ Description */}
          <div>
            <Label>Description <span className="text-red-500 text-sm">*</span></Label>
            <TextArea
              value={form.description}
              onChange={(val) =>
                handleTextAreaChange("description", val)
              }
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* ✅ Address */}
          <div>
            <Label>Address <span className="text-red-500 text-sm">*</span></Label>
            <TextArea
              value={form.address}
              onChange={(val) =>
                handleTextAreaChange("address", val)
              }
              rows={3}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* ✅ Phone */}
          <div>
            <Label>Phone<span className="text-red-500 text-sm">*</span></Label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter Phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* ✅ Email */}
          <div>
            <Label>Email<span className="text-red-500 text-sm">*</span></Label>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* ✅ Button */}
          <div className="flex justify-end mt-6">
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
};

export default Contactpageinfo;
