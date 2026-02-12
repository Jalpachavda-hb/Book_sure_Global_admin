// import React, { useEffect, useState } from "react";
// import ComponentCard from "../../components/common/ComponentCard";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import FileInput from "../../components/form/input/FileInput";
// import Button from "../../components/ui/button/Button";
// import TextArea from "../../components/form/input/TextArea";
// import { getHomeAbout } from "../../utils/Handlerfunctions/getdata";
// import { updateHomeAbout } from "../../utils/Handlerfunctions/formEditHandlers";
// import { toast } from "react-toastify";

// type Errors = {
//   toptitle?: string;
//   title?: string;
//   aboutcontent?: string;
//   year_experience?: string;
//   mainimage?: string; 
//   secondimage?: string;
// };

// const Aboutus: React.FC = () => {
//   const [topTitle, setTopTitle] = useState("");
//   const [header, setHeader] = useState("");
//   const [description, setDescription] = useState("");
//   const [yearExperience, setYearExperience] = useState("");

//   const [mainImage, setMainImage] = useState<File | null>(null);
//   const [secondImage, setSecondImage] = useState<File | null>(null);

//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [secondImagePreview, setSecondImagePreview] = useState<string | null>(
//     null,
//   );

//   const [errors, setErrors] = useState<Errors>({});
//   const [loading, setLoading] = useState(false);

//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const res = await getHomeAbout();
//     if (res?.success && res.data) {
//       setTopTitle(res.data.toptitle || "");
//       setHeader(res.data.title || "");
//       setDescription(res.data.aboutcontent || "");
//       setYearExperience(String(res.data.year_experience || ""));
//       setImagePreview(res.data.mainimage || null);
//       setSecondImagePreview(res.data.secondimage || null);
//     }
//   };

//   /* ================= VALIDATION ================= */
//   const validate = () => {
//     const newErrors: Errors = {};

//     if (!topTitle.trim()) newErrors.toptitle = "Top title is required";
//     if (!header.trim()) newErrors.title = "Header is required";
//     if (!description.trim()) newErrors.aboutcontent = "Description is required";
//     if (!yearExperience.trim())
//       newErrors.year_experience = "Year of experience is required";

//     if (!imagePreview && !mainImage)
//       newErrors.mainimage = "Main image is required";

//     if (!secondImagePreview && !secondImage)
//       newErrors.secondimage = "Second image is required";

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

//   const handleSecondImageChange = (e: any) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSecondImage(file);
//       setSecondImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     try {
//       setLoading(true);
//       const res = await updateHomeAbout(
//         topTitle,
//         header,
//         description,
//         Number(yearExperience),
//         mainImage,
//         secondImage,
//       );

//       if (res?.success) {
//         toast.success("Our Associate updated successfully");
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
//       <ComponentCard title="Our Associate">
//         <div className="space-y-6">
//           {/* MAIN IMAGE */}
//           <Label>
//             Main Image <span className="text-red-500">*</span>
//           </Label>
//           <div className="w-50 h-32 border rounded overflow-hidden">
//             {imagePreview && (
//               <img src={imagePreview} className="w-full h-full object-cover" />
//             )}
//           </div>
//           <FileInput accept="image/*" onChange={handleMainImageChange} />
//           {errors.mainimage && (
//             <p className="text-red-500 text-sm">{errors.mainimage}</p>
//           )}

//           {/* SECOND IMAGE */}
//           <Label>
//             Second Image <span className="text-red-500">*</span>
//           </Label>
//           <div className="w-50 h-32 border rounded overflow-hidden">
//             {secondImagePreview && (
//               <img
//                 src={secondImagePreview}
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </div>
//           <FileInput accept="image/*" onChange={handleSecondImageChange} />
//           {errors.secondimage && (
//             <p className="text-red-500 text-sm">{errors.secondimage}</p>
//           )}

//           {/* TOP TITLE */}
//           <Label>
//             Top Title <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             value={topTitle}
//             onChange={(e) => setTopTitle(e.target.value)}
//           />
//           {errors.toptitle && (
//             <p className="text-red-500 text-sm">{errors.toptitle}</p>
//           )}

//           {/* HEADER */}
//           <Label>
//             Header <span className="text-red-500">*</span>
//           </Label>
//           <Input value={header} onChange={(e) => setHeader(e.target.value)} />
//           {errors.title && (
//             <p className="text-red-500 text-sm">{errors.title}</p>
//           )}

//           {/* YEAR */}
//           <Label>
//             Year of Experience <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             value={yearExperience}
//             onChange={(e) => setYearExperience(e.target.value)}
//           />
//           {errors.year_experience && (
//             <p className="text-red-500 text-sm">{errors.year_experience}</p>
//           )}

//           {/* DESCRIPTION */}
//           <Label>
//             Description <span className="text-red-500">*</span>
//           </Label>
//           <TextArea
//             value={description}
//             onChange={(val) => setDescription(val)}
//           />
//           {errors.aboutcontent && (
//             <p className="text-red-500 text-sm">{errors.aboutcontent}</p>
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

// export default Aboutus;



import React, { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import ParagraphEditor from "../../components/form/form-elements/ParagraphEditor";
import { getHomeAbout } from "../../utils/Handlerfunctions/getdata";
import { updateHomeAbout } from "../../utils/Handlerfunctions/formEditHandlers";
import { toast } from "react-toastify";

type Errors = {
  toptitle?: string;
  title?: string;
  aboutcontent?: string;
  year_experience?: string;
  mainimage?: string;
  secondimage?: string;
};

const Aboutus: React.FC = () => {
  const [topTitle, setTopTitle] = useState("");
  const [header, setHeader] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([""]);
  const [yearExperience, setYearExperience] = useState("");

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [secondImage, setSecondImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [secondImagePreview, setSecondImagePreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getHomeAbout();
    if (res?.success && res.data) {
      setTopTitle(res.data.toptitle || "");
      setHeader(res.data.title || "");
      setYearExperience(String(res.data.year_experience || ""));
      setParagraphs(
        res.data.aboutcontent
          ? res.data.aboutcontent.split(/\r?\n\r?\n/)
          : [""]
      );
      setImagePreview(res.data.mainimage || null);
      setSecondImagePreview(res.data.secondimage || null);
    }
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const err: Errors = {};

    if (!topTitle.trim()) err.toptitle = "Top title is required";
    if (!header.trim()) err.title = "Header is required";
    if (paragraphs.every(p => !p.trim()))
      err.aboutcontent = "At least one paragraph is required";
    if (!yearExperience.trim())
      err.year_experience = "Year of experience is required";
    if (!imagePreview && !mainImage)
      err.mainimage = "Main image is required";
    if (!secondImagePreview && !secondImage)
      err.secondimage = "Second image is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!validate()) return;

    const finalContent = paragraphs
      .map(p => p.trim())
      .filter(Boolean)
      .join("\r\n\r\n");

    try {
      setLoading(true);
      const res = await updateHomeAbout(
        topTitle,
        header,
        finalContent,
        Number(yearExperience),
        mainImage,
        secondImage
      );

      if (res?.success) {
        toast.success("About section updated successfully");
        loadData();
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div>
      <ComponentCard title="About Section">
        <div className="space-y-6">

          {/* MAIN IMAGE */}
          <Label>Main Image *</Label>
          <div className="w-52 h-32 border rounded overflow-hidden">
            {imagePreview && (
              <img src={imagePreview} className="w-full h-full object-cover" />
            )}
          </div>
          <FileInput accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setMainImage(file);
              setImagePreview(URL.createObjectURL(file));
            }
          }} />
          {errors.mainimage && <p className="text-red-500">{errors.mainimage}</p>}

          {/* SECOND IMAGE */}
          <Label>Second Image *</Label>
          <div className="w-52 h-32 border rounded overflow-hidden">
            {secondImagePreview && (
              <img src={secondImagePreview} className="w-full h-full object-cover" />
            )}
          </div>
          <FileInput accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSecondImage(file);
              setSecondImagePreview(URL.createObjectURL(file));
            }
          }} />
          {errors.secondimage && <p className="text-red-500">{errors.secondimage}</p>}

          {/* TOP TITLE */}
          <Label>Top Title *</Label>
          <Input value={topTitle} onChange={(e) => setTopTitle(e.target.value)} />
          {errors.toptitle && <p className="text-red-500">{errors.toptitle}</p>}

          {/* HEADER */}
          <Label>Header *</Label>
          <Input value={header} onChange={(e) => setHeader(e.target.value)} />
          {errors.title && <p className="text-red-500">{errors.title}</p>}

          {/* YEAR */}
          <Label>Years of Experience *</Label>
          <Input value={yearExperience} onChange={(e) => setYearExperience(e.target.value)} />
          {errors.year_experience && <p className="text-red-500">{errors.year_experience}</p>}

          {/* DESCRIPTION */}
          <Label>Description *</Label>
          <ParagraphEditor
            paragraphs={paragraphs}
            setParagraphs={setParagraphs}
            charLimit={500}
          />
          {errors.aboutcontent && <p className="text-red-500">{errors.aboutcontent}</p>}

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

export default Aboutus;