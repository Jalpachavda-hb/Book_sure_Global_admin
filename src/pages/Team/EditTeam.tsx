// import React, { useState, useEffect } from "react";
// import ComponentCard from "../../components/common/ComponentCard";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import TextArea from "../../components/form/input/TextArea";
// import Select from "../../components/form/Select";
// import Button from "../../components/ui/button/Button";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { EditTeam } from "../../utils/Handlerfunctions/formEditHandlers";
// import { GetTeamMemberById } from "../../utils/Handlerfunctions/getdata";

// interface TeamForm {
//   name: string;
//   education: string;
//   experience: string;
//   member_type: string;
//   description: string;
// }

// const EditTeammember = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // ✅ Get ID from URL

//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState<TeamForm>({
//     name: "",
//     education: "",
//     experience: "",
//     member_type: "",
//     description: "",
//   });

//   /* =========================
//      MEMBER TYPE OPTIONS
//   ========================== */
//   const memberTypeOptions = [
//     { value: "founder", label: "Founder" },
//     { value: "expert", label: "Expert" },
//   ];

//   /* =========================
//      FETCH DATA ON LOAD
//   ========================== */
//   useEffect(() => {
//     if (id) {
//       fetchMemberData();
//     }
//   }, [id]);

//   const fetchMemberData = async () => {
//     const res = await GetTeamMemberById(Number(id));

//     if (res?.success) {
//       setForm({
//         name: res.data.name || "",
//         education: res.data.education || "",
//         experience: res.data.experience || "",
//         member_type: res.data.member_type || "",
//         description: res.data.description || "",
//       });
//     } else {
//       toast.error("Failed to load member data");
//     }
//   };

//   /* =========================
//      HANDLE INPUT CHANGE
//   ========================== */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleDescriptionChange = (val: string) => {
//     setForm({ ...form, description: val });
//   };

//   const handleMemberTypeSelect = (value: string) => {
//     setForm({ ...form, member_type: value });
//   };

//   /* =========================
//      SUBMIT
//   ========================== */
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

//     const res = await EditTeam(Number(id), form); // ✅ FIXED

//     if (res.success) {
//       toast.success("Team Member Updated Successfully ✅");
//       navigate(-1);
//     } else {
//       toast.error(res.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <ComponentCard title="Edit Team Member">
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
//           <Select
//             options={memberTypeOptions}
//             value={form.member_type}  // ✅ IMPORTANT
//             onChange={handleMemberTypeSelect}
//             placeholder="Select Member Type"
//           />
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

//         {/* Submit */}
//         <div className="flex justify-end">
//           <Button
//             disabled={loading}
//             onClick={handleSubmit}
//             className="bg-green-600 hover:bg-green-700"
//           >
//             {loading ? "Updating..." : "Update Team Member"}
//           </Button>
//         </div>
//       </div>
//     </ComponentCard>
//   );
// };

// export default EditTeammember;


import  { useState, useEffect } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { EditTeam } from "../../utils/Handlerfunctions/formEditHandlers";
import { GetTeamMemberById } from "../../utils/Handlerfunctions/getdata";

interface TeamForm {
  name: string;
  education: string;
  experience: string;
  member_type: string;
  description: string;
}

const EditTeamMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await GetTeamMemberById(Number(id));

      if (res.success) {
        setForm({
          name: res.data.name || "",
          education: res.data.education || "",
          experience: res.data.experience || "",
          member_type: res.data.member_type || "",
          description: res.data.description || "",
        });
      } else {
        toast.error("Failed to load data");
      }
    } catch (error) {
      toast.error("Error loading data");
    }
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

      const res = await EditTeam(Number(id), form);

      if (res.success) {
        toast.success("Team Member Updated Successfully ✅");
        navigate(-1);
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title="Edit Team Member">
      <div className="space-y-6">
        <div>
          <Label>Name *</Label>
          <Input
            name="name"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
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
            onChange={(e) =>
              setForm((prev) => ({ ...prev, education: e.target.value }))
            }
          />
        </div>

        <div>
          <Label>Experience</Label>
          <Input
            name="experience"
            value={form.experience}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, experience: e.target.value }))
            }
          />
        </div>

        <div>
          <Label>Description</Label>
          <TextArea
            value={form.description}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, description: val }))
            }
          />
        </div>

        <div className="flex justify-end">
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? "Updating..." : "Update Team Member"}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default EditTeamMember;