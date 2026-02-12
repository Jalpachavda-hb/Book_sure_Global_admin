import { useEffect, useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { handleUpdateProfile } from "../../utils/Handlerfunctions/formEditHandlers";
import { fetchProfile } from "../../utils/Handlerfunctions/getdata";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    admin_id: "",
    name: "",
    email: "",
    contact_number: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    contact_number?: string;
  }>({});

  // 🔹 Fetch profile
  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setFormData({ ...data, password: "" });
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  // 🔹 Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Contact number → digits only
    if (name === "contact_number") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData({ ...formData, contact_number: digitsOnly });

      if (!digitsOnly)
        setErrors({ ...errors, contact_number: "Contact is required" });
      else if (digitsOnly.length !== 10)
        setErrors({
          ...errors,
          contact_number: "Contact must be 10 digits",
        });
      else setErrors({ ...errors, contact_number: "" });

      return;
    }

    setFormData({ ...formData, [name]: value });

    // Name validation
    if (name === "name") {
      setErrors({ ...errors, name: value.trim() ? "" : "Name is required" });
    }

    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        email: value.trim()
          ? emailRegex.test(value)
            ? ""
            : "Invalid email"
          : "Email is required",
      });
    }
  };

  // 🔹 Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^\d{10}$/.test(formData.contact_number))
      newErrors.contact_number = "Contact must be 10 digits";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!formData.admin_id) {
      console.error("Admin ID missing");
      return;
    }

    handleUpdateProfile(formData, () => {
      console.log("Profile updated successfully ✅");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ComponentCard title="Edit Personal Information">
        <div className="space-y-6">
          {/* Name */}
          <div>
            <Label>Name *</Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label>Email *</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <Label>Contact Number *</Label>
            <Input
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              maxLength={10}
            />
            {errors.contact_number && (
              <p className="text-red-500 text-sm">{errors.contact_number}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
        </div>
      </ComponentCard>

      <div className="mt-6">
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}
