import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Button from "../../../components/ui/button/Button";

import { addFaq } from "../../../utils/Handlerfunctions/formSubmitHandlers";

const AddFaq = () => {
  const navigate = useNavigate();

  /* ✅ Form State */
  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  /* ✅ Errors */
  const [errors, setErrors] = useState({
    question: "",
    answer: "",
  });

  /* ✅ Handle Input Change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // ✅ Remove error while typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ✅ Handle TextArea Change */
  const handleAnswerChange = (value: string) => {
    setForm({ ...form, answer: value });

    setErrors({ ...errors, answer: "" });
  };

  /* ✅ Validate Form */
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      question: "",
      answer: "",
    };

    if (!form.question.trim()) {
      newErrors.question = "Question is required";
      valid = false;
    }

    if (!form.answer.trim()) {
      newErrors.answer = "Answer is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  /* ✅ Submit */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const success = await addFaq(form.question, form.answer);

    if (success) {
      navigate("/admin/faq");
    }
  };

  return (
    <div className="mx-auto">
      <ComponentCard title="Add New FAQ">
        <div className="space-y-5">
          {/* ✅ Question */}
          <div>
            <Label>Question *</Label>
            <Input
              name="question"
              value={form.question}
              onChange={handleChange}
              placeholder="Enter Question"
            />
            {errors.question && (
              <p className="text-red-500 text-sm">{errors.question}</p>
            )}
          </div>

          {/* ✅ Answer */}
          <div>
            <Label>Answer *</Label>
            <TextArea
              value={form.answer}
              onChange={handleAnswerChange}
              placeholder="Enter Answer"
              rows={4}
            />
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer}</p>
            )}
          </div>

          {/* ✅ Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              Add FAQ
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

export default AddFaq;
