// import React, { useEffect, useState } from "react";
// import ComponentCard from "../../components/common/ComponentCard";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import TextArea from "../../components/form/input/TextArea";
// import FileInput from "../../components/form/input/FileInput";
// import Button from "../../components/ui/button/Button";
// import { toast } from "react-toastify";

// import DynamicSpeciality from "../../components/form/form-elements/Dynamicgroup";

// import {
//   updateDataSecurity,
//   SecurePoint,
// } from "../../utils/Handlerfunctions/formEditHandlers";

// import { getDataSequrity } from "../../utils/Handlerfunctions/getdata";

// /* ✅ Errors */
// interface Errors {
//   section_tag?: string;
//   title?: string;
//   description?: string;
//   how_we_keep_secure?: string;
// }

// const Data_sequrity: React.FC = () => {
//   /* ✅ States */
//   const [sectionTag, setSectionTag] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   /* ✅ Dynamic Secure Points */
//   const [secureList, setSecureList] = useState<SecurePoint[]>([]);

//   /* ✅ Image */
//   const [mainImage, setMainImage] = useState<File | null>(null);
//   const [mainPreview, setMainPreview] = useState("");

//   /* ✅ Loading + Errors */
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<Errors>({});

//   /* ✅ Load Data on Mount */
//   useEffect(() => {
//     loadData();
//   }, []);

//   /* ✅ Fetch Data */
//   const loadData = async () => {
//     const res = await getDataSequrity();

//     if (res?.success && res.data) {
//       setSectionTag(res.data.section_tag || "");
//       setTitle(res.data.title || "");
//       setDescription(res.data.description || "");

//       setSecureList(res.data.how_we_keep_secure || []);

//       setMainPreview(res.data.main_image || "");
//     }
//   };

//   /* ✅ Image Change */
//   const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setMainImage(file);
//     setMainPreview(URL.createObjectURL(file));
//   };

//   /* ✅ Dynamic Secure List Change */
//   const handleSecureListChange = (list: SecurePoint[]) => {
//     setSecureList(list);
//     setErrors((prev) => ({ ...prev, how_we_keep_secure: "" }));
//   };

//   /* ✅ Validation */
//   const validate = () => {
//     let newErrors: Errors = {};

//     if (!sectionTag.trim()) {
//       newErrors.section_tag = "Section Tag is required";
//     }

//     if (!title.trim()) {
//       newErrors.title = "Title is required";
//     }

//     if (!description.trim()) {
//       newErrors.description = "Description is required";
//     }

//     if (
//       secureList.length === 0 ||
//       secureList.every((x) => !x.title.trim() || !x.description.trim())
//     ) {
//       newErrors.how_we_keep_secure = "Minimum 1 secure point required";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   /* ✅ Submit Update */
//   const handleSubmit = async () => {
//     if (!validate()) {
//       toast.error("Please fill all required fields ❌");
//       return;
//     }

//     setLoading(true);

//     const res = await updateDataSecurity(
//       sectionTag,
//       title,
//       description,
//       secureList,
//       mainImage,
//     );

//     if (res.success) {
//       toast.success("Updated Successfully ✅");
//       loadData();
//     } else {
//       toast.error(res.message || "Update Failed ❌");
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <ComponentCard title="Data Security Section">
//         <div className="space-y-6">
//           {/* ✅ Section Tag */}
//           <div>
//             <Label>Section Tag *</Label>
//             <Input
//               value={sectionTag}
//               onChange={(e) => setSectionTag(e.target.value)}
//             />
//             {errors.section_tag && (
//               <p className="text-red-500 text-sm">{errors.section_tag}</p>
//             )}
//           </div>

//           {/* ✅ Title */}
//           <div>
//             <Label>Title *</Label>
//             <Input value={title} onChange={(e) => setTitle(e.target.value)} />
//             {errors.title && (
//               <p className="text-red-500 text-sm">{errors.title}</p>
//             )}
//           </div>

//           {/* ✅ Description */}
//           <div>
//             <Label>Description *</Label>
//             <TextArea value={description} onChange={setDescription} />
//             {errors.description && (
//               <p className="text-red-500 text-sm">{errors.description}</p>
//             )}
//           </div>

//           {/* ✅ Main Image */}
//           <div>
//             <Label>Main Image *</Label>

//             {mainPreview && (
//               <img
//                 src={mainPreview}
//                 alt="Preview"
//                 className="w-44 h-28 object-cover rounded border mb-2"
//               />
//             )}

//             <FileInput accept="image/*" onChange={handleMainImage} />
//           </div>

//           {/* ✅ Dynamic Secure List */}
//           <DynamicSpeciality
//             initialValues={secureList}
//             onChange={handleSecureListChange}
//             labelText="How We Keep Secure"
//             titlePlaceholder="Enter Point Title"
//             descPlaceholder="Enter Point Description"
//           />

//           {errors.how_we_keep_secure && (
//             <p className="text-red-500 text-sm">{errors.how_we_keep_secure}</p>
//           )}
//         </div>
//       </ComponentCard>

//       {/* ✅ Update Button */}
//       <div className="flex justify-end mt-6">
//         <Button
//           disabled={loading}
//           onClick={handleSubmit}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           {loading ? "Updating..." : "Update Section"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Data_sequrity;



import React, { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";

import DynamicSpeciality from "../../components/form/form-elements/Dynamicgroup";
import ParagraphEditor from "../../components/form/form-elements/ParagraphEditor";

import {
  updateDataSecurity,
  SecurePoint,
} from "../../utils/Handlerfunctions/formEditHandlers";

import { getDataSequrity } from "../../utils/Handlerfunctions/getdata";

/* ✅ Errors */
interface Errors {
  section_tag?: string;
  title?: string;
  description?: string;
  how_we_keep_secure?: string;
}

const Data_sequrity: React.FC = () => {
  /* ================= STATES ================= */
  const [sectionTag, setSectionTag] = useState("");
  const [title, setTitle] = useState("");

  /* ✅ Paragraph logic */
  const [paragraphs, setParagraphs] = useState<string[]>([""]);

  /* ✅ Secure points */
  const [secureList, setSecureList] = useState<SecurePoint[]>([]);

  /* ✅ Image */
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getDataSequrity();
    if (res?.success && res.data) {
      setSectionTag(res.data.section_tag || "");
      setTitle(res.data.title || "");

      /* 🔥 split description into paragraphs */
      setParagraphs(
        res.data.description
          ? res.data.description.split(/\r?\n\r?\n/)
          : [""]
      );

      setSecureList(res.data.how_we_keep_secure || []);
      setMainPreview(res.data.main_image || "");
    }
  };

  /* ================= IMAGE ================= */
  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMainImage(file);
    setMainPreview(URL.createObjectURL(file));
  };

  /* ================= SECURE LIST ================= */
  const handleSecureListChange = (list: SecurePoint[]) => {
    setSecureList(list);
    setErrors((prev) => ({ ...prev, how_we_keep_secure: "" }));
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const err: Errors = {};

    if (!sectionTag.trim()) err.section_tag = "Section Tag is required";
    if (!title.trim()) err.title = "Title is required";

    if (paragraphs.every((p) => !p.trim()))
      err.description = "At least one paragraph is required";

    if (
      secureList.length === 0 ||
      secureList.every(
        (x) => !x.title.trim() || !x.description.trim()
      )
    )
      err.how_we_keep_secure = "Minimum 1 secure point required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    setLoading(true);

    const finalDescription = paragraphs
      .map((p) => p.trim())
      .filter(Boolean)
      .join("\r\n\r\n");

    const res = await updateDataSecurity(
      sectionTag,
      title,
      finalDescription,
      secureList,
      mainImage
    );

    if (res.success) {
      toast.success("Updated Successfully ✅");
      loadData();
    } else {
      toast.error(res.message || "Update Failed ❌");
    }

    setLoading(false);
  };

  /* ================= UI ================= */
  return (
    <div>
      <ComponentCard title="Data Security Section">
        <div className="space-y-6">

          <div>
            <Label>Section Tag *</Label>
            <Input value={sectionTag} onChange={(e) => setSectionTag(e.target.value)} />
            {errors.section_tag && <p className="text-red-500 text-sm">{errors.section_tag}</p>}
          </div>

          <div>
            <Label>Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <Label>Description *</Label>
            <ParagraphEditor  
              paragraphs={paragraphs}
              setParagraphs={setParagraphs}
              charLimit={600}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div>
            <Label>Main Image *</Label>
            {mainPreview && (
              <img
                src={mainPreview}
                alt="Preview"
                className="w-44 h-28 object-cover rounded border mb-2"
              />
            )}
            <FileInput accept="image/*" onChange={handleMainImage} />
          </div>

          <DynamicSpeciality
            initialValues={secureList}
            onChange={handleSecureListChange}
            labelText="How We Keep Secure"
            titlePlaceholder="Enter Point Title"
            descPlaceholder="Enter Point Description"
          />

          {errors.how_we_keep_secure && (
            <p className="text-red-500 text-sm">{errors.how_we_keep_secure}</p>
          )}
        </div>
      </ComponentCard>

      <div className="flex justify-end mt-6">
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update Section"}
        </Button>
      </div>
    </div>
  );
};

export default Data_sequrity;