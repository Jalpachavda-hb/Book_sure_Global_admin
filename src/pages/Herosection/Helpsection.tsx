// import React, { useEffect, useState } from "react";
// import ComponentCard from "../../components/common/ComponentCard";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import FileInput from "../../components/form/input/FileInput";
// import Button from "../../components/ui/button/Button";
// import TextArea from "../../components/form/input/TextArea";
// import { getHelp } from "../../utils/Handlerfunctions/getdata";
// import { updateHelp } from "../../utils/Handlerfunctions/formEditHandlers";
// import { toast } from "react-toastify";

// type Errors = {
//   maintitle?: string;
//   title?: string;
//   helpcontent?: string;
//   mainimage?: string;
// };

// const Help: React.FC = () => {
//   const [mainTitle, setMainTitle] = useState("");
//   const [title, setTitle] = useState("");
//   const [helpContent, setHelpContent] = useState("");

//   const [mainImage, setMainImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const [errors, setErrors] = useState<Errors>({});
//   const [loading, setLoading] = useState(false);

//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const res = await getHelp();
//     if (res?.success && res.data) {
//       setMainTitle(res.data.maintitle || "");
//       setTitle(res.data.title || "");
//       setHelpContent(res.data.helpcontent || "");
//       setImagePreview(res.data.mainimage || null);
//     }
//   };

//   /* ================= VALIDATION ================= */
//   const validate = () => {
//     const newErrors: Errors = {};

//     if (!mainTitle.trim()) newErrors.maintitle = "Main title is required";
//     if (!title.trim()) newErrors.title = "Title is required";
//     if (!helpContent.trim())
//       newErrors.helpcontent = "Description is required";

//     if (!imagePreview && !mainImage)
//       newErrors.mainimage = "Image is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= HANDLERS ================= */
//   const handleMainImageChange = (e: any) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setMainImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     try {
//       setLoading(true);
//       const res = await updateHelp(
//         mainTitle,
//         title,
//         helpContent,
//         mainImage
//       );

//       if (res?.success) {
//         toast.success("Help section updated successfully");
//         loadData();
//       }
//     } catch {
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div>
//       <ComponentCard title="Help Section">
//         <div className="space-y-6">

//           {/* IMAGE */}
//           <Label>
//             Help Image <span className="text-red-500">*</span>
//           </Label>
//           <div className="w-50 h-32 border rounded overflow-hidden">
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 className="w-full h-full object-cover"
//                 alt="Help"
//               />
//             )}
//           </div>
//           <FileInput accept="image/*" onChange={handleMainImageChange} />
//           {errors.mainimage && (
//             <p className="text-red-500 text-sm">{errors.mainimage}</p>
//           )}

//           {/* MAIN TITLE */}
//           <Label>
//             Main Title <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             value={mainTitle}
//             onChange={(e) => setMainTitle(e.target.value)}
//           />
//           {errors.maintitle && (
//             <p className="text-red-500 text-sm">{errors.maintitle}</p>
//           )}

//           {/* TITLE */}
//           <Label>
//             Title <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm">{errors.title}</p>
//           )}

//           {/* DESCRIPTION */}
//           <Label>
//             Help Description <span className="text-red-500">*</span>
//           </Label>
//           <TextArea
//             value={helpContent}
//             onChange={(val) => setHelpContent(val)}
//           />
//           {errors.helpcontent && (
//             <p className="text-red-500 text-sm">{errors.helpcontent}</p>
//           )}

//         </div>
//       </ComponentCard>

//       <div className="flex justify-end mt-4">
//         <Button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           {loading ? "Updating..." : "Update"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Help;

// import React, { useEffect, useState } from "react";
// import ComponentCard from "../../components/common/ComponentCard";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import FileInput from "../../components/form/input/FileInput";
// import Button from "../../components/ui/button/Button";
// import TextArea from "../../components/form/input/TextArea";
// import { getHelp } from "../../utils/Handlerfunctions/getdata";
// import { updateHelp } from "../../utils/Handlerfunctions/formEditHandlers";
// import { toast } from "react-toastify";

// type Errors = {
//   maintitle?: string;
//   title?: string;
//   helpcontent?: string;
//   mainimage?: string;
// };

// const Help: React.FC = () => {
//   /* ================= STATE ================= */
//   const [mainTitle, setMainTitle] = useState("");
//   const [title, setTitle] = useState("");
//   const [paragraphs, setParagraphs] = useState<string[]>([""]);

//   const [mainImage, setMainImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const [errors, setErrors] = useState<Errors>({});
//   const [loading, setLoading] = useState(false);

//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const res = await getHelp();
//     if (res?.success && res.data) {
//       setMainTitle(res.data.maintitle || "");
//       setTitle(res.data.title || "");

//       const paraArray = res.data.helpcontent
//         ? res.data.helpcontent.split(/\r?\n\r?\n/)
//         : [""];

//       setParagraphs(paraArray.length ? paraArray : [""]);
//       setImagePreview(res.data.mainimage || null);
//     }
//   };

//   /* ================= PARAGRAPH HANDLERS ================= */
//   const handleParagraphChange = (index: number, value: string) => {
//     const updated = [...paragraphs];
//     updated[index] = value;
//     setParagraphs(updated);
//   };

//   const addParagraph = () => {
//     setParagraphs([...paragraphs, ""]);
//   };

//   const removeParagraph = (index: number) => {
//     if (paragraphs.length === 1) return;
//     setParagraphs(paragraphs.filter((_, i) => i !== index));
//   };

//   /* ================= VALIDATION ================= */
//   const validate = () => {
//     const newErrors: Errors = {};

//     if (!mainTitle.trim()) newErrors.maintitle = "Main title is required";
//     if (!title.trim()) newErrors.title = "Title is required";

//     if (paragraphs.every(p => !p.trim())) {
//       newErrors.helpcontent = "At least one paragraph is required";
//     }

//     if (!imagePreview && !mainImage) {
//       newErrors.mainimage = "Image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= IMAGE HANDLER ================= */
  // const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setMainImage(file);
  //     setImagePreview(URL.createObjectURL(file));
  //   }
  // };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     if (!validate()) return;

//     const finalContent = paragraphs
//       .map(p => p.trim())
//       .filter(Boolean)
//       .join("\r\n\r\n");

//     try {
//       setLoading(true);
//       const res = await updateHelp(
//         mainTitle,
//         title,
//         finalContent,
//         mainImage
//       );

//       if (res?.success) {
//         toast.success("Help section updated successfully");
//         loadData();
//       }
//     } catch {
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div>
//       <ComponentCard title="Help Section">
//         <div className="space-y-6">

//           {/* IMAGE */}
// <Label>
//   Help Image <span className="text-red-500">*</span>
// </Label>
// <div className="w-52 h-32 border rounded overflow-hidden">
//   {imagePreview && (
//     <img
//       src={imagePreview}
//       className="w-full h-full object-cover"
//       alt="Help"
//     />
//   )}
// </div>
// <FileInput accept="image/*" onChange={handleMainImageChange} />
// {errors.mainimage && (
//   <p className="text-red-500 text-sm">{errors.mainimage}</p>
// )}

//           {/* MAIN TITLE */}
//           <Label>
//             Main Title <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             value={mainTitle}
//             onChange={(e) => setMainTitle(e.target.value)}
//           />
//           {errors.maintitle && (
//             <p className="text-red-500 text-sm">{errors.maintitle}</p>
//           )}

//           {/* TITLE */}
//           <Label>
//             Title <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm">{errors.title}</p>
//           )}

//           {/* DESCRIPTION */}
//           <Label>
//             Help Description <span className="text-red-500">*</span>
//           </Label>

//           <div className="space-y-4">
//             {paragraphs.map((paragraph, index) => (
//               <div key={index} className="relative border rounded-lg p-3">
//                 <TextArea
//                   value={paragraph}
//                   rows={4}
//                   placeholder={`Paragraph ${index + 1}`}
//                   onChange={(val) => handleParagraphChange(index, val)}
//                 />

//                 {paragraphs.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeParagraph(index)}
//                     className="absolute top-2 right-2 text-red-500 text-xs hover:text-red-700"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             ))}

//             <Button
//               type="button"
//               onClick={addParagraph}
//               className="bg-blue-500 hover:bg-blue-600 w-fit"
//             >
//               + Add Paragraph
//             </Button>
//           </div>

//           {errors.helpcontent && (
//             <p className="text-red-500 text-sm">{errors.helpcontent}</p>
//           )}

//         </div>
//       </ComponentCard>

//       <div className="flex justify-end mt-4">
//         <Button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           {loading ? "Updating..." : "Update"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Help;

import React, { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import { getHelp } from "../../utils/Handlerfunctions/getdata";
import { updateHelp } from "../../utils/Handlerfunctions/formEditHandlers";
import { toast } from "react-toastify";
import ParagraphEditor from "../../components/form/form-elements/ParagraphEditor";


type Errors = {
  maintitle?: string;
  title?: string;
  helpcontent?: string;
  mainimage?: string;
};

const Help: React.FC = () => {
  const [mainTitle, setMainTitle] = useState("");
  const [title, setTitle] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([""]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getHelp();
    if (res?.success && res.data) {
      setMainTitle(res.data.maintitle || "");
      setTitle(res.data.title || "");
      setParagraphs(
        res.data.helpcontent ? res.data.helpcontent.split(/\r?\n\r?\n/) : [""],
      );
      setImagePreview(res.data.mainimage || null);
    }
  };
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const validate = () => {
    const err: Errors = {};
    if (!mainTitle.trim()) err.maintitle = "Main title required";
    if (!title.trim()) err.title = "Title required";
    if (paragraphs.every((p) => !p.trim()))
      err.helpcontent = "At least one paragraph required";
    if (!imagePreview && !mainImage) err.mainimage = "Image required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const finalContent = paragraphs
      .map((p) => p.trim())
      .filter(Boolean)
      .join("\r\n\r\n");

    try {
      setLoading(true);
      const res = await updateHelp(mainTitle, title, finalContent, mainImage);

      if (res?.success) {
        toast.success("Updated successfully");
        loadData();
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ComponentCard title="Help Section">
        <div className="space-y-6">
          <Label>Main Title *</Label>
          <Input
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
          />
          {errors.maintitle && (
            <p className="text-red-500">{errors.maintitle}</p>
          )}

          <Label>Title *</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <p className="text-red-500">{errors.title}</p>}

          <Label>
            Help Description <span className="text-red-500">*</span>
          </Label>

          <ParagraphEditor
            paragraphs={paragraphs}
            setParagraphs={setParagraphs}
            charLimit={450}
          />

          {errors.helpcontent && (
            <p className="text-red-500 text-sm">{errors.helpcontent}</p>
          )}

        <Label>
            Help Image <span className="text-red-500">*</span>
          </Label>
          <div className="w-52 h-32 border rounded overflow-hidden">
            {imagePreview && (
              <img
                src={imagePreview}
                className="w-full h-full object-cover"
                alt="Help"
              />
            )}
          </div>
          <FileInput accept="image/*" onChange={handleMainImageChange} />
          {errors.mainimage && (
            <p className="text-red-500 text-sm">{errors.mainimage}</p>
          )}
        </div>
      </ComponentCard>

      <div className="flex justify-end mt-4">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default Help;
