import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";

import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import { addSoftware } from "../../utils/Handlerfunctions/formSubmitHandlers";

const AddSoftware = () => {
  const [image, setImage] = useState<File | null>(
    null,
  );

  const [_data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    image: "",
  });

  // Validate individual fields
  const validateField = (field: string, value: any) => {
    let errorMsg = "";
    switch (field) {
      case "image":
        if (!value) errorMsg = "Image is required";
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    return errorMsg === "";
  };

  const handleSoftwareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    validateField("image", file);
  };

  
  const handleSubmit = async () => {
    const isImageValid = validateField("image", image);

    if (!isImageValid) return;

    try {
      const newRecord = await addSoftware(image);
      if (newRecord) {
        setData((prev) => [newRecord, ...prev]);
        setImage(null);

        navigate("/admin/softwares");
      }
    } catch (err) {
      console.error("Failed to submit splash screen:", err);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-6">
          <ComponentCard title="Add New SoftWare">
            <div className="space-y-6">
              {image && (
                <div className="w-32 h-32 border rounded overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="splashscreen preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="fileUpload">
                  Upload Image<span className="text-red-500">*</span>
                </Label>
                <FileInput
                  id="fileUpload"
                  onChange={handleSoftwareChange}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-3 bg-green-600 hover:bg-green-700"
      >
        Add
      </Button>
      <Button className="canclebtn" onClick={() => navigate(-1)}>
        Cancel
      </Button>
    </div>
  );
};

export default AddSoftware;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import FileInput from "../../components/form/input/FileInput";
// import Button from "../../components/ui/button/Button";

// import { addSoftware } from "../../utils/Handlerfunctions/formSubmitHandlers";

// export default function AddSoftware() {
//   const [image, setImage] = useState<File | null>(null);
//   const navigate = useNavigate();

// const handleSubmit = async () => {
//   const success = await addSoftware(image);
//   if (success) navigate("/admin/softwares");
// };

//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-5">Add Software</h3>

//       {/* ✅ Preview */}
//       {image && (
//         <img
//           src={URL.createObjectURL(image)}
//           alt="preview"
//           className="w-32 h-32 object-cover rounded mb-3"
//         />
//       )}

//       {/* ✅ Upload */}
//       <FileInput onChange={(e) => setImage(e.target.files?.[0] || null)} />

//       {/* ✅ Buttons */}
//       <div className="flex gap-3 mt-5">
//         <Button onClick={handleSubmit} className="bg-green-600">
//           Add Software
//         </Button>

//         <Button onClick={() => navigate(-1)} className="bg-gray-500">
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// }
