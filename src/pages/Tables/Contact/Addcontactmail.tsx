import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

import { addcontactEmail } from "../../../utils/Handlerfunctions/formSubmitHandlers";

const Addcontactmail = () => {
  const navigate = useNavigate();

  /* ✅ Form State */
  const [email, setEmail] = useState("");

  /* ✅ Error State */
  const [error, setError] = useState("");

  /* ✅ Validate Email */
  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    // ✅ Email Format Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return false;
    }

    setError("");
    return true;
  };

  /* ✅ Submit */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const success = await addcontactEmail(email);

    if (success) {
      navigate("/admin/contact_email");
    }
  };

  return (
    <div className="mx-auto">
      <ComponentCard title="Add Contact Email">
        <div className="space-y-5">
          {/* ✅ Email Input */}
          <div>
            <Label>
              Email <span className="text-red-500">*</span>
            </Label>

            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* ✅ Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              Add Email
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

export default Addcontactmail;
