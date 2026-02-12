import React, { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import Select from "../../components/form/Select";
import DynamicInputFields from "../../components/form/form-elements/DynamicInputFields ";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getActiveServices } from "../../utils/Handlerfunctions/getdata";
import { addSubService } from "../../utils/Handlerfunctions/formSubmitHandlers";

/* ✅ Service Interface */
interface ServiceItem {
  id: number;
  service_name: string;
}
export interface ApiResponse {
  success: boolean;
  message: string;
  id?: number;
}
/* ✅ SubService Form Interface */
interface SubServiceForm {
  service_id: number;
  title: string;
  description: string;
  points: string[];
  image_file: File | null;
}

const AddSubServices = () => {
  /* ✅ Services Dropdown State */
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState("");

  /* ✅ Form State */
  const [form, setForm] = useState<SubServiceForm>({
    service_id: 0,
    title: "",
    description: "",
    points: [],
    image_file: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  /* ✅ Load Services */
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const res = await getActiveServices();

    if (!res || res.length === 0) {
      toast.error("No Services Found ❌");
      return;
    }

    setServices(res);
  };

  /* ✅ Convert Services into Select Options */
  const serviceOptions = services.map((service) => ({
    value: String(service.id),
    label: service.service_name,
  }));

  /* ✅ Handle Select Change */
  const handleServiceSelect = (value: string) => {
    setSelectedService(value);

    setForm((prev) => ({
      ...prev,
      service_id: Number(value), // ✅ store ID
    }));
  };

  /* ✅ Input Change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ✅ Textarea Change */
  const handleDescriptionChange = (val: string) => {
    setForm({ ...form, description: val });
  };

  /* ✅ Points Change */
  const handlePointsChange = (list: string[]) => {
    setForm({ ...form, points: list });
  };

  /* ✅ Image Change */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, image_file: e.target.files[0] });
    }
  };

  /* ✅ Submit */
  const handleSubmit = async () => {
    if (!form.service_id) {
      toast.error("Please select a service ");
      return;
    }

    if (!form.title.trim()) {
      toast.error("Title is required ");
      return;
    }

    setLoading(true);

    const res = await addSubService(form);

    if (res.success) {
      toast.success("Sub-Service Added Successfully ✅");
      navigate(-1);
      /* ✅ Reset Form */
      setForm({
        service_id: 0,
        title: "",
        description: "",
        points: [],
        image_file: null,
      });

      setSelectedService("");
    } else {
      toast.error(res.message || "Add Failed ");
    }

    setLoading(false);
  };

  return (
    <div>
      <ComponentCard title="Add Sub-Service">
        <div className="space-y-6">
          {/* ✅ Select Service */}
          <div>
            <Label>
              Select Service <span className="text-red-500">*</span>
            </Label>

            <Select
              options={serviceOptions}
              value={selectedService}
              onChange={handleServiceSelect}
              placeholder="Select Service"
            />
          </div>

          {/* ✅ Title */}
          <div>
            <Label>
              Sub-Service Title <span className="text-red-500">*</span>
            </Label>

            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter Sub-Service Title"
            />
          </div>

          {/* ✅ Description */}
          <div>
            <Label>Description</Label>

            <TextArea
              value={form.description}
              onChange={handleDescriptionChange}
              placeholder="Enter Description"
            />
          </div>

          {/* ✅ Points */}
          <div>
            <Label>Points List</Label>

            <DynamicInputFields
              initialValues={form.points}
              onChange={handlePointsChange}
            />
          </div>

          {/* ✅ Image */}
          <div>
            <Label>
              Upload Image <span className="text-red-500">*</span>
            </Label>

            <FileInput accept="image/*" onChange={handleImageChange} />
          </div>

          {/* ✅ Submit Button */}
          <div className="flex justify-end">
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? "Saving..." : "Add Sub-Service"}
            </Button>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
};

export default AddSubServices;
