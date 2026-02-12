import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

import { addTestimonial } from "../../../utils/Handlerfunctions/formSubmitHandlers";

const AddTestimonial = () => {
  const navigate = useNavigate();

  /* ✅ Form State */
  const [form, setForm] = useState({
    TestimonialMessage: "",
    TestimonialClientName: "",
    TestimonialClientRole: "",
    TestimonialCompanyName: "",
    TestimonialCompanyType: "",
  });

  /* ✅ Only 2 Field Errors */
  const [errors, setErrors] = useState({
    TestimonialMessage: "",
    TestimonialClientName: "",
  });

  /* ✅ Handle Input Change */
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // ✅ Remove error while typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ✅ Validate Only Message + Client Name */
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      TestimonialMessage: "",
      TestimonialClientName: "",
    };

    if (!form.TestimonialMessage.trim()) {
      newErrors.TestimonialMessage = "Message is required";
      valid = false;
    }

    if (!form.TestimonialClientName.trim()) {
      newErrors.TestimonialClientName = "Client Name is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  /* ✅ Submit */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const success = await addTestimonial(form);

    if (success) {
      navigate("/admin/testimonial_section");
    }
  };

  return (
    <div className=" mx-auto">
      <ComponentCard title="Add New Testimonial">
        <div className="space-y-5">

          {/* ✅ Message Field */}
          <div>
            <Label>
              Message <span className="text-red-500">*</span>
            </Label>

            <Input
              name="TestimonialMessage"
              value={form.TestimonialMessage}
              onChange={handleChange}
              placeholder="Enter testimonial message"
            />

            {/* ✅ Error Below Field */}
            {errors.TestimonialMessage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.TestimonialMessage}
              </p>
            )}
          </div>

          {/* ✅ Client Name Field */}
          <div>
            <Label>
              Client Name <span className="text-red-500">*</span>
            </Label>

            <Input
              name="TestimonialClientName"
              value={form.TestimonialClientName}
              onChange={handleChange}
              placeholder="Enter client name"
            />

            {/* ✅ Error Below Field */}
            {errors.TestimonialClientName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.TestimonialClientName}
              </p>
            )}
          </div>

          {/* ✅ Optional Fields (No Validation) */}
          <div>
            <Label>Client Role</Label>
            <Input
              name="TestimonialClientRole"
              value={form.TestimonialClientRole}
              onChange={handleChange}
              placeholder="Enter client role"
            />
          </div>

          <div>
            <Label>Company Name</Label>
            <Input
              name="TestimonialCompanyName"
              value={form.TestimonialCompanyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>

          <div>
            <Label>Company Type</Label>
            <Input
              name="TestimonialCompanyType"
              value={form.TestimonialCompanyType}
              onChange={handleChange}
              placeholder="Enter company type"
            />
          </div>

          {/* ✅ Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              Add Testimonial
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

export default AddTestimonial;
