// import React, { useState } from "react";
// import ComponentCard from "../../components/common/ComponentCard";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import TextArea from "../../components/form/input/TextArea";
// // import FileInput from "../../components/form/input/FileInput";
// import Select from "../../components/form/Select";
// import Button from "../../components/ui/button/Button";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { addTeam } from "../../utils/Handlerfunctions/formSubmitHandlers";

// interface TeamForm {
//   name: string;

//   education: string;
//   experience: string;
//   member_type: string;
//   description: string;
//   // image_file: File | null;
// }

// const AddTeamMember = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState<TeamForm>({
//     name: "",
   
//     education: "",
//     experience: "",
//     member_type: "",
//     description: "",
//     // image_file: null,
//   });


//   /* ✅ Member Type Options */
//   const memberTypeOptions = [
//     { value: "founder", label: "Founder" },
//     { value: "expert", label: "Expert" },
//   ];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleDescriptionChange = (val: string) => {
//     setForm({ ...form, description: val });
//   };



//   const handleMemberTypeSelect = (value: string) => {
//     setForm({ ...form, member_type: value });
//   };

//   // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files?.[0]) {
//   //     setForm({ ...form, image_file: e.target.files[0] });
//   //   }
//   // };

//   const handleSubmit = async () => {
//     if (!form.name.trim()) {
//       toast.error("Name is required");
//       return;
//     }

  

//     if (!form.member_type) {
//       toast.error("Please select member type");
//       return;
//     }

//     setLoading(true);

//     const res = await addTeam(form);

//     if (res.success) {
//       toast.success("Team Member Added Successfully ✅");
//       navigate(-1);
//     } else {
//       toast.error(res.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <ComponentCard title="Add Team Member">
//       <div className="space-y-6">

//         {/* Name */}
//         <div>
//           <Label>Name *</Label>
//           <Input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Enter Name"
//           />
//         </div>

  
//         {/* Member Type */}
//         <div>
//           <Label>Member Type *</Label>
//        <Select
//           options={memberTypeOptions}
//           value={form.member_type}   // ✅ CONTROLLED
//           onChange={(value) =>
//             setForm({ ...form, member_type: value })
//           }
//           placeholder="Select Member Type"
//         />

//         </div>

//         {/* Education */}
//         <div>
//           <Label>Education</Label>
//           <Input
//             name="education"
//             value={form.education}
//             onChange={handleChange}
//             placeholder="Enter Education"
//           />
//         </div>

//         {/* Experience */}
//         <div>
//           <Label>Experience</Label>
//           <Input
//             name="experience"
//             value={form.experience}
//             onChange={handleChange}
//             placeholder="Enter Experience"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <Label>Description</Label>
//           <TextArea
//             value={form.description}
//             onChange={handleDescriptionChange}
//             placeholder="Enter Description"
//           />
//         </div>

//         {/* Image */}
//         {/* <div>
//           <Label>Upload Image</Label>
//           <FileInput accept="image/*" onChange={handleImageChange} />
//         </div> */}

//         {/* Submit */}
//         <div className="flex justify-end">
//           <Button
//             disabled={loading}
//             onClick={handleSubmit}
//             className="bg-green-600 hover:bg-green-700"
//           >
//             {loading ? "Saving..." : "Add Team Member"}
//           </Button>
//         </div>
//       </div>
//     </ComponentCard>
//   );
// };

// export default AddTeamMember;


import React, { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTeam } from "../../utils/Handlerfunctions/formSubmitHandlers";

interface TeamForm {
  name: string;
  education: string;
  experience: string;
  member_type: string;
  description: string;
}

const AddTeamMember = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<TeamForm>({
    name: "",
    education: "",
    experience: "",
    member_type: "",
    description: "",
  });

  const memberTypeOptions = [
    { value: "founder", label: "Founder" },
    { value: "employee", label: "Expert" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!form.member_type) {
      toast.error("Please select member type");
      return;
    }

    try {
      setLoading(true);

      const res = await addTeam(form);

      if (res.success) {
        toast.success("Team Member Added Successfully ✅");

        // Reset form
        setForm({
          name: "",
          education: "",
          experience: "",
          member_type: "",
          description: "",
        });

        navigate(-1);
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title="Add Team Member">
      <div className="space-y-6">
        <div>
          <Label>Name *</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
        </div>

        <div>
          <Label>Member Type *</Label>
          <Select
            options={memberTypeOptions}
            value={form.member_type}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, member_type: value }))
            }
            placeholder="Select Member Type"
          />
        </div>

        <div>
          <Label>Education</Label>
          <Input
            name="education"
            value={form.education}
            onChange={handleChange}
            placeholder="Enter Education"
          />
        </div>

        <div>
          <Label>Experience</Label>
          <Input
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Enter Experience"
          />
        </div>

        <div>
          <Label>Description</Label>
          <TextArea
            value={form.description}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, description: val }))
            }
            placeholder="Enter Description"
          />
        </div>

        <div className="flex justify-end">
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? "Saving..." : "Add Team Member"}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddTeamMember;