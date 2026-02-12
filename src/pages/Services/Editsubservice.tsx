import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import Select from "../../components/form/Select";
import DynamicInputFields from "../../components/form/form-elements/DynamicInputFields ";

import { toast } from "react-toastify";

import {
  getActiveServices,
  getSubServiceById,
} from "../../utils/Handlerfunctions/getdata";
import { updatesubSerivec } from "../../utils/Handlerfunctions/formEditHandlers";

/* ✅ Interfaces */
interface ServiceItem {
  id: number;
  service_name: string;
}

interface SubServiceForm {
  service_id: number;
  title: string;
  description: string;
  points: string[];
  image_file: File | null;
  image: string;
}

const EditSubService = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Get ID from URL

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState("");

  const [form, setForm] = useState<SubServiceForm>({
    service_id: 0,
    title: "",
    description: "",
    points: [],
    image_file: null,
    image: "",
  });

  const [loading, setLoading] = useState(false);

  /* ✅ Load Data */
  useEffect(() => {
    loadServices();
    if (id) loadSubService();
  }, [id]);

  /* ✅ Load Services Dropdown */
  const loadServices = async () => {
    const res = await getActiveServices();
    setServices(res || []);
  };

  /* ✅ Load SubService Data by ID */
  const loadSubService = async () => {
    const res = await getSubServiceById(Number(id));

    if (!res) {
      toast.error("Sub-Service not found ❌");
      return;
    }

    setForm({
      service_id: res.service_id,
      title: res.title,
      description: res.description,
      points: res.points,
      image_file: null,
      image: res.image,
    });

    setSelectedService(String(res.service_id));
  };

  /* ✅ Dropdown Options */
  const serviceOptions = services.map((s) => ({
    value: String(s.id),
    label: s.service_name,
  }));

  /* ✅ Handle Select */
  const handleServiceSelect = (value: string) => {
    setSelectedService(value);
    setForm((prev) => ({
      ...prev,
      service_id: Number(value),
    }));
  };

  /* ✅ Input Change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ✅ Description Change */
  const handleDescriptionChange = (val: string) => {
    setForm({ ...form, description: val });
  };

  /* ✅ Points Change */
  const handlePointsChange = (list: string[]) => {
    setForm({ ...form, points: list });
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
  };

  /* ✅ Submit Update */
  const handleSubmit = async () => {
    if (!id) return;

    if (!form.title.trim()) {
      toast.error("Title required ❌");
      return;
    }

    setLoading(true);

    /* ✅ FormData Required for Image */
    const formData = new FormData();
    formData.append("service_id", String(form.service_id));
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("points", JSON.stringify(form.points));

    if (form.image_file) {
      formData.append("image", form.image_file);
    }

    const success = await updatesubSerivec(Number(id), formData);

    if (success) {
      toast.success("Sub-Service Updated ✅");
      navigate("/admin/services");
    }

    setLoading(false);
  };

  return (
    <div>
      <ComponentCard title="Update Sub-Service">
        <div className="space-y-6">
          {/* ✅ Select Service */}
          <div>
            <Label>Select Service *</Label>

            <Select
              options={serviceOptions}
              value={selectedService}
              onChange={handleServiceSelect}
              placeholder="Select Service"
            />
          </div>

          {/* ✅ Title */}
          <div>
            <Label>Sub-Service Title *</Label>

            <Input name="title" value={form.title} onChange={handleChange} />
          </div>

          {/* ✅ Description */}
          <div>
            <Label>Description</Label>

            <TextArea
              value={form.description}
              onChange={handleDescriptionChange}
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

          {/* ✅ Image Preview */}
          <div>
            <Label>Upload Image</Label>

            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="w-40 h-28 object-cover rounded border mb-3"
              />
            )}

            <FileInput accept="image/*" onChange={handleImageChange} />
          </div>

          {/* ✅ Button */}
          <div className="flex justify-end">
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? "Updating..." : "Update Sub-Service"}
            </Button>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
};

export default EditSubService;
