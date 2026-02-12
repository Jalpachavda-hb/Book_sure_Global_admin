import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";
import { getAssociateById } from "../../utils/Handlerfunctions/getdata";
import { updateFounder } from "../../utils/Handlerfunctions/formEditHandlers";


// ✅ Associate Data Interface
interface AssociateForm {
  name: string;
  designation: string;
  description: string;

  image: string;          // preview url
  image_file: File | null; // actual file
}


// ✅ Error Messages Interface
interface FormErrors {
  name?: string;
  designation?: string;
  description?: string;
}


// ✅ API Response Type
interface ApiResponse {
  success: boolean;
  message: string;
}


const EditAssociate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Form State
  const [form, setForm] = useState<AssociateForm>({
    name: "",
    designation: "",
    description: "",
    image: "",
    image_file: null,
  });

  // ✅ Errors State
  const [errors, setErrors] = useState<FormErrors>({});



  /* ======================================= */
  /* ✅ Load Associate Data By ID */
  /* ======================================= */
  useEffect(() => {
    if (id) fetchAssociate();
  }, [id]);

  const fetchAssociate = async (): Promise<void> => {
    const data = await getAssociateById(Number(id));

    if (!data) {
      toast.error("Associate not found ❌");
      navigate("/admin/ourassociates");
      return;
    }

    setForm({
      name: data.name,
      designation: data.designation,
      description: data.description,
      image: data.image,
      image_file: null,
    });
  };



  /* ======================================= */
  /* ✅ Input Change Handler */
  /* ======================================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
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



  /* ======================================= */
  /* ✅ Description Change Handler */
  /* ======================================= */
  const handleDescriptionChange = (val: string): void => {
    setForm((prev) => ({
      ...prev,
      description: val,
    }));

    setErrors((prev) => ({
      ...prev,
      description: undefined,
    }));
  };



  /* ======================================= */
  /* ✅ Image Change Handler */
  /* ======================================= */
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image_file: file,
      image: URL.createObjectURL(file),
    }));
  };



  /* ======================================= */
  /* ✅ Form Validation */
  /* ======================================= */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };



  /* ======================================= */
  /* ✅ Submit Update */
  /* ======================================= */
  const handleSubmit = async (): Promise<void> => {
    if (!id) return;

    if (!validateForm()) {
      toast.error("Please fill all required fields ");
      return;
    }

    setLoading(true);

    const res: ApiResponse = await updateFounder(Number(id), form);

    if (res.success) {
      toast.success(res.message || "Associate updated successfully ");

      // ✅ Redirect after update
      navigate("/admin/our_associate");
    } else {
      toast.error(res.message || "Update failed ");
    }

    setLoading(false);
  };



  /* ======================================= */
  /* ✅ UI */
  /* ======================================= */
  return (
    <div>
      <ComponentCard title="Edit Associate">
        <div className="space-y-6">

          {/* ✅ Image */}
          <div>
            <Label>Associate Image</Label>

            {form.image && (
              <img
                src={form.image}
                alt="Associate Preview"
                className="w-40 h-32 object-cover rounded border mb-2"
              />
            )}

            <FileInput accept="image/*" onChange={handleImageChange} />
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
              <p className="text-red-500 text-sm">{errors.designation}</p>
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
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </div>
      </ComponentCard>


      {/* ✅ Submit */}
      <div className="flex justify-end mt-6">
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 px-6"
        >
          {loading ? "Updating..." : "Update Associate"}
        </Button>
      </div>
    </div>
  );
};

export default EditAssociate;
